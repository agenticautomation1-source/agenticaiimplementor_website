export const config = {
  runtime: "nodejs",
};

import Razorpay from "razorpay";
import type { IncomingMessage, ServerResponse } from "http";

export default async function handler(
  req: IncomingMessage & { method?: string },
  res: ServerResponse & {
    status: (code: number) => any;
    json: (data: any) => void;
  }
) {
  console.log("CREATE-ORDER v3 LOADED");

  try {
    // 1. Allow only POST
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // 2. Validate env vars
    if (
      !process.env.RAZORPAY_KEY_ID ||
      !process.env.RAZORPAY_KEY_SECRET
    ) {
      console.error("Missing Razorpay env vars");
      return res.status(500).json({
        error: "Razorpay credentials not configured",
      });
    }

    // 3. Init Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // 4. Read raw body
    let rawBody = "";
    for await (const chunk of req) {
      rawBody += chunk;
    }

    const body = rawBody ? JSON.parse(rawBody) : {};
    const { programSlug, userId } = body;

    if (!programSlug || !userId) {
      return res.status(400).json({
        error: "Missing programSlug or userId",
      });
    }

    // 5. Pricing
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

    // 6. Create order
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });

    // 7. Return JSON
    return res.status(200).json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        status: order.status,
        created_at: order.created_at,
      },
    });
  } catch (err) {
    console.error("Create order failed:", err);

    return res.status(500).json({
      success: false,
      error: "Create order failed",
      message: err instanceof Error ? err.message : "Unknown error",
    });
  }
}
