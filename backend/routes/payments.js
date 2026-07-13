import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const router = express.Router();

console.log("KEY ID =", process.env.RAZORPAY_KEY_ID);
console.log("KEY SECRET EXISTS =", !!process.env.RAZORPAY_KEY_SECRET);
console.log("SUPABASE URL =", process.env.SUPABASE_URL);
console.log("SERVICE KEY EXISTS =", !!process.env.SUPABASE_SERVICE_ROLE_KEY);
/**
 * Razorpay instance
 */
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * Supabase admin client
 */
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

/**
 * =========================
 * CREATE ORDER
 * =========================
 */
router.post("/create-order", async (req, res) => {
  try {
    const programSlug = req.body.programSlug ?? req.body.program_id;
const userId = req.body.userId ?? req.body.user_id;

console.log("REQUEST BODY:");
console.log(req.body);

console.log("programSlug =", programSlug);
console.log("userId =", userId);


 

// Fetch program from Supabase using UUID
const { data: program, error } = await supabase
  .from("programs")
  .select("id, price_discounted_paise")
  .eq("id", programSlug)
  .single();

if (error || !program) {
  console.error("PROGRAM LOOKUP FAILED:", error);

  return res.status(400).json({
    error: "Invalid program",
  });
}

const amount = program.price_discounted_paise;

if (!userId) {
  return res.status(400).json({
    error: "Missing user",
  });
}





    // Razorpay receipt must be <= 40 chars
    const shortReceipt = `rcpt_${Date.now().toString().slice(-8)}`;

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: shortReceipt,
    });

    console.log("ORDER CREATED", order.id);
    return res.json(order);
  } catch (err) {
    console.error("Create order error:", err);
    return res.status(500).json({ error: "Order creation failed" });
  }
});

/**
 * =========================
 * VERIFY PAYMENT
 * =========================
 */
router.post("/verify", async (req, res) => {

console.log("============== VERIFY HIT ==============");

  try {
  


    const razorpay_order_id = req.body.razorpay_order_id;
const razorpay_payment_id = req.body.razorpay_payment_id;
const razorpay_signature = req.body.razorpay_signature;

const userId = req.body.userId ?? req.body.user_id;
const programSlug = req.body.programSlug ?? req.body.program_id;


const studentName = req.body.student_name;
const studentEmail = req.body.student_email;

    /**
     * STEP 1: Basic validation
     */
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !userId ||
      !programSlug
    ) {
      return res.status(400).json({ error: "Missing payment details" });
    }

    /**
     * STEP 2: Idempotency check (payments table)
     */
    const { data: existingPayment, error: paymentFetchError } =
      await supabase
        .from("payments")
        .select("id")
        .eq("razorpay_payment_id", razorpay_payment_id)
        .maybeSingle();

    if (paymentFetchError) {
      console.error("Payment lookup failed", paymentFetchError);
      return res.status(500).json({ error: "Payment lookup failed" });
    }

    if (existingPayment) {
      console.log("Duplicate payment callback ignored");
      return res.json({ success: true, duplicate: true });
    }

    /**
     * STEP 3: Signature verification
     */
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");
      

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid signature" });
    }


// Fetch payment details from Razorpay
const payment = await razorpay.payments.fetch(razorpay_payment_id);    

    /**
     * STEP 4: Record payment (SOURCE OF TRUTH)
     */

console.log("VERIFY BODY");
console.log(req.body);

    const { error: paymentInsertError } = await supabase
  .from("payments")
  .insert({
    user_id: userId,
    program_id: programSlug,

    razorpay_order_id,
    razorpay_payment_id,

    amount: null,
    currency: "INR",
    status: "paid",

    student_name:
      req.body.student_name ??
      req.body.studentName ??
      null,

    student_email:
      req.body.student_email ??
      req.body.studentEmail ??
      null,

    raw_payload: req.body,
  });

    if (paymentInsertError) {
      console.error("Payment insert failed", paymentInsertError);
      return res.status(500).json({ error: "Payment record failed" });
    }

    /**
     * STEP 5: Upsert enrollment (idempotent)
     */
    const { data: enrollment, error: enrollmentError } =
      await supabase
        .from("enrollments")
        .upsert(
          {
  user_id: userId,
  program_id: programSlug,
  razorpay_order_id,
  razorpay_payment_id,

  student_name: studentName,
  student_email: studentEmail,

  status: "active",
  updated_at: new Date().toISOString(),
},
          {
            onConflict: "user_id,program_id",
          }
        )
        .select("*");

    if (enrollmentError) {
      console.error("Enrollment upsert failed", enrollmentError);
      return res.status(500).json({ error: "Enrollment upsert failed" });
    }

    console.log("Enrollment activated", enrollment);
    return res.json({ success: true });
  } catch (err) {
    console.error("VERIFY CRASHED:", err);
    return res.status(500).json({ error: "Verification failed" });
  }
});

export default router;
