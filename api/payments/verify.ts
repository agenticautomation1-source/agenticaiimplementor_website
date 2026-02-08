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
    // ✅ INIT SUPABASE SAFELY
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error("Supabase env vars missing");
      return res.redirect(302, "/dashboard");
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      programSlug,
    } = req.query;

    // ✅ HARD GUARD — browser safe
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.redirect(302, "/dashboard");
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.redirect(302, "/dashboard");
    }

    const payment = await razorpay.payments.fetch(
      razorpay_payment_id as string
    );

    if (payment.status !== "captured") {
      return res.redirect(302, "/dashboard");
    }

    await supabase.from("payments").insert({
      user_id: userId,
      program_id: programSlug,
      razorpay_order_id,
      razorpay_payment_id,
      status: "paid",
      raw_payload: req.query,
    });

    await supabase.from("enrollments").upsert(
      {
        user_id: userId,
        program_id: programSlug,
        status: "active",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,program_id" }
    );

    return res.redirect(302, "/dashboard");
  } catch (err) {
    console.error("VERIFY FAILED HARD", err);
    return res.redirect(302, "/dashboard");
  }
}
