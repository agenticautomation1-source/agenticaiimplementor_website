import { createClient } from "@supabase/supabase-js";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";

export const config = {
  runtime: "nodejs",
};

// ===== STRICT SYSTEM PROMPT =====
const SYSTEM_PROMPT = `
You are the Masterstroke Elite AI Advisor.

You MUST answer strictly using information related to:
- Masterstroke programs
- Agentic AI Integrators curriculum
- Multi-agent systems training
- Our published modules and tracks
- Enrollment and program structure

If a question is unrelated to our programs, politely respond:

"I specialize in Masterstroke training programs. Please ask about our curriculum, tracks, or enrollment."

Do NOT provide generic AI explanations unrelated to our programs.
Be precise, professional, and focused only on our offerings.
`;

// ===== ALLOWED KEYWORDS FILTER =====
const allowedKeywords = [
  "masterstroke",
  "program",
  "agentic",
  "multi-agent",
  "curriculum",
  "enroll",
  "learning path",
  "systems engineer",
  "platform architect",
  "validation",
  "governance",
  "course",
  "track",
  "training",
];

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, history, visitorId } = req.body;

  // ===== BASIC VALIDATION =====
  if (!message || typeof message !== "string") {
    return res.status(400).json({
      text: "Invalid request.",
    });
  }

  // ===== MESSAGE LENGTH LIMIT =====
  if (message.length > 1000) {
    return res.status(400).json({
      text: "Query too long. Please keep your question concise.",
    });
  }

  // ===== KEYWORD FILTER =====
  const lowerMessage = message.toLowerCase();

  const isRelevant = allowedKeywords.some((keyword) =>
    lowerMessage.includes(keyword)
  );

  if (!isRelevant) {
    return res.status(200).json({
      text: "I specialize in Masterstroke programs. Please ask about our curriculum or training tracks.",
    });
  }

  // ===== GEMINI FIRST =====
  if (process.env.GEMINI_API_KEY) {
    try {
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
      });

      const geminiResult = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          ...(Array.isArray(history)
            ? history.map((h: any) => ({
                role: h.role,
                parts: [{ text: h.text }],
              }))
            : []),
          { role: "user", parts: [{ text: message }] },
        ],
        config: {
          systemInstruction: SYSTEM_PROMPT,
        },
      });

      if (geminiResult?.text) {
        return res.status(200).json({
          text: geminiResult.text,
          provider: "gemini",
        });
      }
    } catch (geminiError) {
      console.error("Gemini failed, attempting OpenAI fallback:", geminiError);
    }
  }

  // ===== OPENAI FALLBACK =====
  if (process.env.OPENAI_API_KEY) {
    try {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          ...(Array.isArray(history)
            ? history.map((h: any) => ({
                role: h.role,
                content: h.text,
              }))
            : []),
          { role: "user", content: message },
        ],
        temperature: 0.5,
      });

      return res.status(200).json({
        text: completion.choices[0].message.content,
        provider: "openai",
      });
    } catch (openaiError) {
      console.error("OpenAI fallback failed:", openaiError);
    }
  }

  // ===== TOTAL FAILURE =====
  return res.status(200).json({
    text: "I'm temporarily unavailable. Please try again in a moment.",
  });
}
