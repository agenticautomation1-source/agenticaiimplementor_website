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
    // ------------------------------------------------------------------
    // 1. HARD ENV GUARD
    // ------------------------------------------------------------------
    if (
      !process.env.SUPABASE_URL ||
      !process.env.SUPABASE_SERVICE_ROLE_KEY ||
      !process.env.RAZORPAY_KEY_SECRET
    ) {
      console.error("Missing critical env vars");
      return res.redirect(302, "/dashboard");
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // ------------------------------------------------------------------
    // 2. EXTRACT QUERY PARAMS
    // ------------------------------------------------------------------
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      programSlug,
    } = req.query;

    // Browser-safe hard guard
    if (
      typeof razorpay_order_id !== "string" ||
      typeof razorpay_payment_id !== "string" ||
      typeof razorpay_signature !== "string" ||
      typeof userId !== "string" ||
      typeof programSlug !== "string"
    ) {
      return res.redirect(302, "/dashboard");
    }

    // ------------------------------------------------------------------
    // 3. VERIFY SIGNATURE
    // ------------------------------------------------------------------
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.error("Razorpay signature mismatch");
      return res.redirect(302, "/dashboard");
    }

    // ------------------------------------------------------------------
    // 4. VERIFY PAYMENT STATUS FROM RAZORPAY
    // ------------------------------------------------------------------
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    if (payment.status !== "captured") {
      console.error("Payment not captured:", payment.status);
      return res.redirect(302, "/dashboard");
    }

    // ------------------------------------------------------------------
    // 5. RECORD PAYMENT (IDEMPOTENT SAFE)
    // ------------------------------------------------------------------
    await supabase.from("payments").upsert(
      {
        user_id: userId,
        program_id: programSlug,
        razorpay_order_id,
        razorpay_payment_id,
        status: "paid",
        raw_payload: payment,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "razorpay_payment_id",
      }
    );

    // ------------------------------------------------------------------
    // 6. UPSERT ENROLLMENT (THIS WAS THE ROOT CAUSE)
    // ------------------------------------------------------------------
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
        {
          onConflict: "user_id,program_id",
        }
      );

    if (enrollmentError) {
      console.error("Enrollment upsert failed", enrollmentError);
      return res.redirect(302, "/dashboard");
    }

    // ------------------------------------------------------------------
    // 7. FINAL GUARANTEE CHECK (NO SILENT FAILURES)
    // ------------------------------------------------------------------
    const { data: enrollment } = await supabase
      .from("enrollments")
      .select("id")
      .eq("user_id", userId)
      .eq("program_id", programSlug)
      .eq("status", "active")
      .single();

    if (!enrollment) {
      console.error("Enrollment missing after successful payment");
      return res.redirect(302, "/dashboard");
    }

    // ------------------------------------------------------------------
    // 8. SUCCESS → DASHBOARD
    // ------------------------------------------------------------------
    return res.redirect(302, "/dashboard");
  } catch (err) {
    console.error("PAYMENT VERIFY FAILED HARD", err);
    return res.redirect(302, "/dashboard");
  }
}
