import Razorpay from "razorpay";
import type { IncomingMessage, ServerResponse } from "http";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export default async function handler(
  req: IncomingMessage & { method?: string },
  res: ServerResponse & {
    status: (code: number) => any;
    json: (data: any) => void;
  }
) {
res.setHeader("Content-Type", "application/json");
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    let rawBody = "";
    for await (const chunk of req) rawBody += chunk;
    const body = rawBody ? JSON.parse(rawBody) : {};

    const { programSlug, userId } = body;

    const amountMap: Record<string, number> = {
      "agentic-ai-systems-engineer": 499900,
      "genai-platform-architect": 499900,
      "ai-validation-governance-engineer": 399900,
    };

    const amount = amountMap[programSlug];

    if (!amount || !userId) {
      return res.status(400).json({ error: "Invalid request" });
    }

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });

    return res.status(200).json(order);
  } catch (err) {
    console.error("Create order failed:", err);
    return res.status(500).json({ error: "Order creation failed" });
  }
}
