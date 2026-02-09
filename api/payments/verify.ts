export const config = {
  runtime: "nodejs",
};

import crypto from "crypto";
import Razorpay from "razorpay";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
	  if (req.method !== "POST") {
  return res.status(405).json({ error: "Method not allowed" });
}
    // 1. ENV GUARD
 if (
  !process.env.SUPABASE_URL ||
  !process.env.SUPABASE_SERVICE_ROLE_KEY ||
  !process.env.RAZORPAY_KEY_SECRET
) {
  console.error("Missing env vars");
  return res.status(500).json({ error: "Server misconfigured" });
}

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // 2. QUERY PARAMS
// 2. BODY PARAMS (POST)
const {
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
} = req.body;

if (
  !razorpay_order_id ||
  !razorpay_payment_id ||
  !razorpay_signature
) {
  console.error("Missing payment verification body", req.body);
  return res.status(400).json({ error: "Invalid payment payload" });
}

    // 3. SIGNATURE VERIFY
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
  console.error("Signature mismatch");
  return res.status(400).json({ error: "Signature mismatch" });
}

    // 4. FETCH PAYMENT + ORDER
    const payment = await razorpay.payments.fetch(razorpay_payment_id);
    const order = await razorpay.orders.fetch(razorpay_order_id);

    // 🔥 CRITICAL CONSISTENCY CHECK (THIS WAS MISSING)
    if (payment.order_id !== razorpay_order_id) {
  console.error("Payment does not belong to order");
  return res.status(400).json({ error: "Order mismatch" });
}

if (payment.status !== "captured") {
  console.error("Payment not captured:", payment.status);
  return res.status(400).json({ error: "Payment not captured" });
}

    const userId =
      typeof order.notes?.userId === "string" ? order.notes.userId : null;
    const programSlug =
      typeof order.notes?.programSlug === "string"
        ? order.notes.programSlug
        : null;

    if (!userId || !programSlug) {
  console.error("Missing order notes", order.notes);
  return res.status(400).json({ error: "Missing order notes" });
}

    // 5. PAYMENT UPSERT
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

    if (paymentError) {
  console.error("Payment upsert failed", paymentError);
  return res.status(500).json({ error: "Payment upsert failed" });
}

    // 6. ENROLLMENT UPSERT
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

 if (enrollmentError) {
  console.error("Enrollment upsert failed", enrollmentError);
  return res.status(500).json({ error: "Enrollment upsert failed" });
}

    // 7. SUCCESS RESPONSE
    res.setHeader("Cache-Control", "no-store");
return res.status(200).json({ success: true });

  } catch (err) {
  console.error("VERIFY FAILED HARD", err);
  return res.status(500).json({ error: "Verification failed" });
}
}