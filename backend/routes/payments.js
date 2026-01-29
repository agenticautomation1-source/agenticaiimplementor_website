import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const router = express.Router();

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
  console.log("CREATE ORDER HIT", req.body);

  try {
    const { programSlug, userId } = req.body;

    const amountMap = {
      "agentic-ai-systems-engineer": 499900,
      "genai-platform-architect": 499900,
      "ai-validation-governance-engineer": 399900,
    };

    const amount = amountMap[programSlug];

    if (!amount || !userId) {
      return res.status(400).json({ error: "Invalid request" });
    }

    // Razorpay receipt must be <= 40 chars
    const shortReceipt = `rcpt_${Date.now().toString().slice(-8)}`;

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: shortReceipt,
    });

    console.log("ORDER CREATED", order.id);

    res.json(order);
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ error: "Order creation failed" });
  }
});

//**
/**
 * =========================
 * VERIFY PAYMENT
 * =========================
 */

router.post("/verify", async (req, res) => {
  console.log("===== VERIFY START =====");
  console.log("VERIFY BODY:", req.body);

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      programSlug,
    } = req.body;

    // ---- STEP 1: Basic validation ----
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !userId ||
      !programSlug
    ) {
      console.error("STEP 1 FAILED: Missing fields");
      return res.status(400).json({ error: "Missing payment details" });
    }

    console.log("STEP 1 OK: Validation passed");

    // ---- STEP 2: Idempotency check ----
    const { data: existing, error: fetchError } = await supabase
      .from("enrollments")
      .select("id")
      .eq("razorpay_payment_id", razorpay_payment_id)
      .maybeSingle();

    if (fetchError) {
      console.error("STEP 2 FAILED: Supabase fetch error", fetchError);
      return res.status(500).json({ error: "Enrollment lookup failed" });
    }

    if (existing) {
      console.log("STEP 2 OK: Payment already verified");
      return res.json({ success: true });
    }

    console.log("STEP 2 OK: No existing enrollment");

    // ---- STEP 3: Signature verification ----
const body = `${razorpay_order_id}|${razorpay_payment_id}`;

const expectedSignature = crypto
  .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
  .update(body)
  .digest("hex");

if (expectedSignature !== razorpay_signature) {
  console.error("STEP 3 FAILED: Signature mismatch");
  return res.status(400).json({ error: "Invalid signature" });
}

console.log("STEP 3 OK: Signature verified");

// ---- INSERT PAYLOAD CHECK (DEBUG — DO NOT REMOVE YET) ----
console.log("INSERT PAYLOAD CHECK", {
  user_id: userId,
  program_id: programSlug,
  razorpay_order_id: razorpay_order_id,
  razorpay_payment_id: razorpay_payment_id,
  status: "active",
});

// ---- STEP 4: Insert enrollment ----
console.log("ABOUT TO INSERT ENROLLMENT", {
  user_id: userId,
  program_id: programSlug,
  razorpay_payment_id,
  status: "active",
});

// 🔴 IMPORTANT: force Supabase to return inserted rows
const { data, error } = await supabase
  .from("enrollments")
  .insert(
    {
      user_id: userId,
      program_id: programSlug,
      razorpay_order_id: razorpay_order_id, // ✅ REQUIRED (NOT NULL)
      razorpay_payment_id: razorpay_payment_id,
      status: "active",
    },
    { returning: "representation" } // ✅ CRITICAL FOR CONFIRMATION
  )
  .select("*");

if (error) {
  console.error("STEP 4 FAILED: SUPABASE INSERT ERROR", {
    message: error.message,
    details: error.details,
    hint: error.hint,
    code: error.code,
  });

  return res.status(500).json({ error: "Enrollment insert failed" });
}

console.log("STEP 4 OK: ENROLLMENT INSERTED", data);
console.log("===== VERIFY END: SUCCESS =====");

return res.json({ success: true });
} catch (err) {
  console.error("VERIFY CRASHED:", err);
  return res.status(500).json({ error: "Verification failed" });
}
});


export default router;