export const config = {
  runtime: "nodejs",
};

import crypto from "crypto";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  console.log("VERIFY FUNCTION HIT", req.method, req.body);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // ================= ENV CHECK =================
    const {
      SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY,
      RAZORPAY_KEY_SECRET,
    } = process.env;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !RAZORPAY_KEY_SECRET) {
      console.error("Missing env vars");
      return res.status(500).json({ error: "Server misconfigured" });
    }

    const supabase = createClient(
      SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY
    );

    // ================= READ BODY =================
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
      console.error("Invalid payload", req.body);
      return res.status(400).json({ error: "Invalid payload" });
    }

    // ================= VERIFY SIGNATURE =================
    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.error("Signature mismatch");
      return res.status(400).json({ error: "Signature mismatch" });
    }

    // ================= UPSERT PAYMENT =================
// 5. UPSERT PAYMENT  ✅ FIXED
const amount = req.body.amount;      // paise
const currency = req.body.currency;  // INR

const { error: paymentError } = await supabase
  .from("payments")
  .upsert(
    {
      user_id,
      program_id,
      razorpay_order_id,
      razorpay_payment_id,
      amount,
      currency,
      status: "paid",
      raw_payload: req.body,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "razorpay_payment_id" }
  );


    if (paymentError) {
      console.error("PAYMENTS UPSERT FAILED", paymentError);
      return res.status(500).json({ error: "Payment DB write failed" });
    }

    // ================= UPSERT ENROLLMENT =================
    const { error: enrollmentError } = await supabase
      .from("enrollments")
      .upsert(
        {
          user_id,
          program_id,
          status: "active",
          razorpay_order_id,
          razorpay_payment_id,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,program_id" }
      );

    if (enrollmentError) {
      console.error("ENROLLMENT UPSERT FAILED", enrollmentError);
      return res.status(500).json({ error: "Enrollment DB write failed" });
    }

    // ================= SUCCESS =================
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("VERIFY FAILED HARD", err);
    return res.status(500).json({ error: "Verification failed" });
  }
}
