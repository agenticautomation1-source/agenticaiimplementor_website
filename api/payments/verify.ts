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
    // 1. ENV GUARD
    if (
      !process.env.SUPABASE_URL ||
      !process.env.SUPABASE_SERVICE_ROLE_KEY ||
      !process.env.RAZORPAY_KEY_SECRET
    ) {
      console.error("Missing env vars");
      return res.redirect(302, "/dashboard");
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // 2. QUERY PARAMS
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.query;

    if (
      typeof razorpay_order_id !== "string" ||
      typeof razorpay_payment_id !== "string" ||
      typeof razorpay_signature !== "string"
    ) {
      return res.redirect(302, "/dashboard");
    }

    // 3. SIGNATURE VERIFY
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.error("Signature mismatch");
      return res.redirect(302, "/dashboard");
    }

    // 4. FETCH PAYMENT + ORDER
    const payment = await razorpay.payments.fetch(razorpay_payment_id);
    const order = await razorpay.orders.fetch(razorpay_order_id);

    // 🔥 CRITICAL CONSISTENCY CHECK (THIS WAS MISSING)
    if (payment.order_id !== razorpay_order_id) {
      console.error("Payment does not belong to order");
      return res.redirect(302, "/dashboard");
    }

    if (payment.status !== "captured") {
      console.error("Payment not captured:", payment.status);
      return res.redirect(302, "/dashboard");
    }

    const userId =
      typeof order.notes?.userId === "string" ? order.notes.userId : null;
    const programSlug =
      typeof order.notes?.programSlug === "string"
        ? order.notes.programSlug
        : null;

    if (!userId || !programSlug) {
      console.error("Missing order notes", order.notes);
      return res.redirect(302, "/dashboard");
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
      return res.redirect(302, "/dashboard");
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
      return res.redirect(302, "/dashboard");
    }

    // 7. SUCCESS RESPONSE
    res.setHeader("Cache-Control", "no-store");
    return res.redirect(302, "/dashboard");

  } catch (err) {
    console.error("VERIFY FAILED HARD", err);
    return res.redirect(302, "/dashboard");
  }
}