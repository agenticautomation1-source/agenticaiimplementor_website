
export const config = {
  runtime: "nodejs",
};

import crypto from "crypto";
import Razorpay from "razorpay";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  console.log("VERIFY FUNCTION HIT", req.method);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // ================= ENV =================
const {
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  RAZORPAY_KEY_SECRET,
  RAZORPAY_KEY_ID,
} = process.env;

    if (
  !SUPABASE_URL ||
  !SUPABASE_SERVICE_ROLE_KEY ||
  !RAZORPAY_KEY_SECRET ||
  !RAZORPAY_KEY_ID
) {
  console.error("❌ Missing env vars");
  return res.status(500).json({ error: "Server misconfigured" });
}

    const supabase = createClient(
      SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY
    );
	
	const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});



    // ================= BODY =================
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      user_id,
      program_id,
    } = req.body || {};



  if (
  !razorpay_order_id ||
  !razorpay_payment_id ||
  !razorpay_signature ||
  !user_id ||
  !program_id
) {
	
  
  console.error("❌ Invalid payload", req.body);
  return res.status(400).json({ error: "Invalid payload" });
}


// ✅ NORMALIZE PROGRAM ID (slug → DB id)
const normalizedProgramId = program_id.includes("-")
  ? program_id.replaceAll("-", "_")
  : program_id;
  
  
  console.log("PROGRAM ID NORMALIZED", {
  received: program_id,
  normalized: normalizedProgramId,
});

    // ================= VERIFY SIGNATURE =================
    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.error("❌ Signature mismatch");
      return res.status(400).json({ error: "Signature mismatch" });
    }

// ✅ program_id must match DB id (underscores allowed)






    // ================= FETCH PROGRAM FROM DB =================
const { data: program, error: programError } = await supabase
  .from("programs")
  .select("id, name, price_paise")
  .eq("id", normalizedProgramId)
  .eq("is_active", true)
  .single();

if (programError || !program) {
  console.error("❌ Invalid or inactive program", {
  received: program_id,
  normalized: normalizedProgramId,
  error: programError,
});
  return res.status(400).json({ error: "Invalid program" });
}

const amount = program.price_paise; // paise (INTEGER)

// ================= VERIFY ORDER AMOUNT (SAFE) =================
// Do NOT trust client payload. Verify using Razorpay order.
const order = await razorpay.orders.fetch(razorpay_order_id);

if (!order || order.amount !== amount) {
  console.error("❌ Razorpay order amount mismatch", {
    expected: amount,
    razorpay: order?.amount,
  });
  return res.status(400).json({ error: "Amount mismatch" });
}

const { data: existingPayment, error: existingPaymentError } =
  await supabase
    .from("payments")
    .select("id")
    .eq("razorpay_payment_id", razorpay_payment_id)
    .maybeSingle();

if (existingPayment) {
  console.log("ℹ️ Payment already processed");
  return res.status(200).json({ success: true });
}

    // ================= UPSERT PAYMENT =================
    const { error: paymentError } = await supabase
      .from("payments")
      .upsert(
        {
          user_id,
          program_id: normalizedProgramId,
          razorpay_order_id,
          razorpay_payment_id,
          amount,
          currency: "INR",
          status: "paid",
          raw_payload: req.body,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "razorpay_payment_id" }
      );

    if (paymentError) {
      console.error("❌ PAYMENTS UPSERT FAILED", paymentError);
      return res.status(500).json({ error: "Payment DB write failed" });
    }

    // ================= UPSERT ENROLLMENT =================
    const { error: enrollmentError } = await supabase
      .from("enrollments")
      .upsert(
        {
          user_id,
          program_id: normalizedProgramId,
          status: "active",
          razorpay_order_id,
          razorpay_payment_id,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,program_id" }
      );

    if (enrollmentError) {
      console.error("❌ ENROLLMENT UPSERT FAILED", enrollmentError);
      return res.status(500).json({ error: "Enrollment DB write failed" });
    }

    // ================= SUCCESS =================
    console.log("✅ PAYMENT VERIFIED & ENROLLED");
    return res.status(200).json({ success: true });

  } catch (err) {
    console.error("🔥 VERIFY FAILED HARD", err);
    return res.status(500).json({ error: "Verification failed" });
  }
}
