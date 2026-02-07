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
  console.log("CREATE-ORDER v3 START");

  try {
    // 1. Method check
    if (req.method !== "POST") {
      console.log("INVALID METHOD:", req.method);
      return res.status(405).json({ error: "Method not allowed" });
    }

    // 2. Env check
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error("ENV MISSING", {
        hasKey: !!process.env.RAZORPAY_KEY_ID,
        hasSecret: !!process.env.RAZORPAY_KEY_SECRET,
      });

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

    console.log("RAW BODY:", rawBody);

    const body = rawBody ? JSON.parse(rawBody) : {};
    const { programSlug, userId } = body;

    // 5. Validate input
    if (!programSlug || !userId) {
      console.log("INVALID INPUT", body);
      return res.status(400).json({
        error: "Missing programSlug or userId",
      });
    }

    // 6. Pricing
    const amountMap: Record<string, number> = {
      "agentic-ai-systems-engineer": 499900,
      "genai-platform-architect": 499900,
      "ai-validation-governance-engineer": 399900,
    };

    const amount = amountMap[programSlug];

    if (!amount) {
      console.log("INVALID PROGRAM:", programSlug);
      return res.status(400).json({
        error: "Invalid programSlug",
      });
    }

    // 7. Create order
    console.log("CREATING ORDER", { programSlug, amount });

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });

    console.log("ORDER CREATED:", order.id);

    // 8. Success JSON
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
    console.error("CREATE ORDER CRASH:", err);

    return res.status(500).json({
      success: false,
      error: "Create order failed",
      message: err instanceof Error ? err.message : String(err),
    });
  }
}
