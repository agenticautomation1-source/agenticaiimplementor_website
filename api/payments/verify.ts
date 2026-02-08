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
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ error: "Invalid request body" });
  }

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      programSlug,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !userId ||
      !programSlug
    ) {
      return res.status(400).json({ error: "Missing payment details" });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid signature" });
    }

    // Verify order with Razorpay
    const order = await razorpay.orders.fetch(razorpay_order_id);

    if (order.status !== "created" && order.status !== "paid") {
      return res.status(400).json({ error: "Invalid order status" });
    }

    await supabase.from("payments").insert({
      user_id: userId,
      program_id: programSlug,
      razorpay_order_id,
      razorpay_payment_id,
      status: "paid",
      raw_payload: req.body,
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

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Verify failed:", err);
    return res.status(500).json({ error: "Verification failed" });
  }
}
