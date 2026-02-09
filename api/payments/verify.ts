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
  // 🔥 DEBUG — DO NOT REMOVE
  console.log("VERIFY FUNCTION HIT", req.method, req.body);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 1. ENV CHECK
    if (
      !process.env.SUPABASE_URL ||
      !process.env.SUPABASE_SERVICE_ROLE_KEY ||
      !process.env.RAZORPAY_KEY_SECRET ||
      !process.env.RAZORPAY_KEY_ID
    ) {
      console.error("Missing env vars");
      return res.status(500).json({ error: "Server misconfigured" });
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // 2. READ BODY (POST)
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body || {};

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      console.error("Missing verification body", req.body);
      return res.status(400).json({ error: "Invalid payload" });
    }

    // 3. VERIFY SIGNATURE
	
	console.log("SIGNATURE INPUTS", {
  razorpay_order_id,
  razorpay_payment_id,
  receivedSignature: razorpay_signature,
});

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.error("Signature mismatch");
      return res.status(400).json({ error: "Signature mismatch" });
    }

    // 4. FETCH PAYMENT + ORDER
    const payment = await razorpay.payments.fetch(razorpay_payment_id);
    const order = await razorpay.orders.fetch(razorpay_order_id);

    if (payment.status !== "captured") {
      console.error("Payment not captured", payment.status);
      return res.status(400).json({ error: "Payment not captured" });
    }

    const userId = order.notes?.userId;
    const programSlug = order.notes?.programSlug;

    if (!userId || !programSlug) {
      console.error("Missing order notes", order.notes);
      return res.status(400).json({ error: "Missing order notes" });
    }

    // 5. UPSERT PAYMENT
 const { error: paymentError } = await supabase
  .from("payments")
  .upsert(
    {
      user_id: userId,
      program_id: programSlug,
      razorpay_order_id,
      razorpay_payment_id,
      status: "paid",
      raw_payload: payment,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "razorpay_payment_id" }
  );

console.log("PAYMENTS UPSERT RESULT", paymentError);

if (paymentError) {
  console.error("PAYMENTS UPSERT FAILED", paymentError);
  return res.status(500).json({ error: "Payment DB write failed" });
}

    // 6. UPSERT ENROLLMENT
const { error: enrollmentError } = await supabase
  .from("enrollments")
  .upsert(
    {
      user_id: userId,
      program_id: programSlug,
      status: "active",
      razorpay_order_id,
      razorpay_payment_id,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,program_id" }
  );

console.log("ENROLLMENTS UPSERT RESULT", enrollmentError);

if (enrollmentError) {
  console.error("ENROLLMENT UPSERT FAILED", enrollmentError);
  return res.status(500).json({ error: "Enrollment DB write failed" });
}

    // 7. DONE
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("VERIFY FAILED HARD", err);
    return res.status(500).json({ error: "Verification failed" });
  }
}
