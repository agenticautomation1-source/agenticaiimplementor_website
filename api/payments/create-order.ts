export const config = {
  runtime: "nodejs",
};

import Razorpay from "razorpay";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  console.log("CREATE-ORDER FUNCTION HIT");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error("Missing Razorpay env vars");
      return res.status(500).json({
        error: "Razorpay credentials not configured",
      });
    }

    const { programSlug, userId } = req.body ?? {};

    console.log("REQUEST BODY:", { programSlug, userId });

    if (!programSlug || !userId) {
      return res.status(400).json({
        error: "Missing programSlug or userId",
      });
    }

    const amountMap: Record<string, number> = {
      "agentic-ai-systems-engineer": 499900,
      "genai-platform-architect": 499900,
      "ai-validation-governance-engineer": 399900,
    };

    const amount = amountMap[programSlug];

    if (!amount) {
      return res.status(400).json({
        error: "Invalid programSlug",
      });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });

    console.log("ORDER CREATED:", order.id);

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (err: any) {
    console.error("CREATE ORDER FAILED:", err);

    return res.status(500).json({
      success: false,
      error: err?.message || "Create order failed",
    });
  }
}
