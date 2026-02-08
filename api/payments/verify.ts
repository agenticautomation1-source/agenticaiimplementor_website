export const config = {
  runtime: "nodejs",
};

import crypto from "crypto";
import Razorpay from "razorpay";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    /**
     * Razorpay REDIRECT flow:
     * - Method can be POST
     * - Data ALWAYS comes in query params
     * - Body is useless → ignore it completely
     */
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      programSlug,
    } = req.query;

    // 🔒 Validate required params
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !userId ||
      !programSlug
    ) {
      console.error("Missing Razorpay params", req.query);
      return res.status(400).send("Missing payment details");
    }

    // 🔐 Verify signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.error("Signature mismatch", {
        expectedSignature,
        razorpay_signature,
      });
      return res.status(400).send("Invalid signature");
    }

    // 💳 Fetch payment from Razorpay
    const payment = await razorpay.payments.fetch(
      razorpay_payment_id as string
    );

    if (payment.status !== "captured") {
      console.error("Payment not captured", payment.status);
      return res.status(400).send("Payment not captured");
    }

    // 🧾 Store payment
    await supabase.from("payments").insert({
      user_id: userId,
      program_id: programSlug,
      razorpay_order_id,
      razorpay_payment_id,
      status: "paid",
      raw_payload: req.query,
    });

    // 🎓 Activate enrollment
    await supabase.from("enrollments").upsert(
      {
        user_id: userId,
        program_id: programSlug,
        status: "active",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,program_id" }
    );

    // ✅ Final redirect after Razorpay success screen
    return res.redirect(302, "/dashboard");
  } catch (err) {
    console.error("VERIFY FUNCTION CRASHED", err);
    return res.status(500).send("Verification failed");
  }
}
