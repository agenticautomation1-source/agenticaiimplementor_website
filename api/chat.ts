export const config = {
  runtime: "nodejs",
};

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "GEMINI_API_KEY not configured" });
  }

  try {
    const { userPrompt, history } = req.body;

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const model = "gemini-2.5-flash";

    const result = await ai.models.generateContent({
      model,
      contents: [
        ...history.map((h: any) => ({
          role: h.role,
          parts: [{ text: h.text }],
        })),
        { role: "user", parts: [{ text: userPrompt }] },
      ],
      config: {
        systemInstruction:
          "You are the Elite Agentic AI Advisor. Help senior engineers master autonomous AI systems.",
      },
    });

    return res.status(200).json({
      text: result.text || "No response generated.",
    });
  } catch (err) {
    console.error("CHAT ERROR:", err);
    return res.status(500).json({ error: "Chat failed" });
  }
}
