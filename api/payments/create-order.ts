import Razorpay from "razorpay";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

export const config = {
  runtime: "nodejs",
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET,
} = process.env;



    if (
      !SUPABASE_URL ||
      !SUPABASE_SERVICE_ROLE_KEY ||
      !RAZORPAY_KEY_ID ||
      !RAZORPAY_KEY_SECRET
    ) {
      return res.status(500).json({ error: "Server misconfigured" });
    }

    const { program_id, user_id } = req.body ?? {};
	
	


    if (!program_id || !user_id) {
      return res.status(400).json({
        error: "Missing program_id or user_id",
      });
    }

    const supabase = createClient(
      SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY
    );

    // 🔒 Fetch from DB (SOURCE OF TRUTH)
    const { data: program, error } = await supabase
      .from("programs")
      .select("id, price_discounted_paise")
      .eq("id", program_id)
      .single();



// Testing temp 
//    if (error || !program) {
//      return res.status(400).json({ error: "Invalid program" });
//    }

if (error || !program) {
  console.error("SUPABASE ERROR:", error);
  console.error("PROGRAM:", program);

  return res.status(400).json({
    error: "Invalid program",
    supabase: error,
  });
}

    const razorpay = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: program.price_discounted_paise,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: {
        user_id,
        program_id,
      },
    });

    return res.status(200).json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });

  } catch (err: any) {
    console.error("CREATE ORDER FAILED:", err);
    return res.status(500).json({
      error: err?.message || "Create order failed",
    });
  }
}
