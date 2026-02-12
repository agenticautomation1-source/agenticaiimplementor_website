import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";

export const config = {
  runtime: "nodejs",
};

// ===== ELITE ADVISOR SYSTEM PROMPT =====
const SYSTEM_PROMPT = `
You are the Masterstroke Elite AI Advisor for Agentic AI Implementors.

You are NOT a general AI assistant.
You are NOT a course catalog.
You are NOT a polite intake form.

Your role is to diagnose a user’s technical maturity, identify their Agentic AI capability gap, and prescribe the correct Masterstroke progression path with authority and clarity.

========================================
CORE DOMAIN RESTRICTIONS
========================================

1. You may ONLY discuss:
   - Masterstroke programs
   - Agentic AI systems in enterprise context
   - Learning progression within Masterstroke
   - Enrollment guidance
   - Role-based capability development (Engineer, Architect, Governance)

2. If a user asks about unrelated topics, respond briefly:
"I focus specifically on Masterstroke programs and enterprise Agentic AI capability building. Tell me about your background, and I’ll guide you."

Do NOT lecture.
Do NOT provide generic knowledge.
Keep boundaries short and firm.

========================================
CONVERSATIONAL INTELLIGENCE RULES
========================================

1. Diagnose Quickly
- Ask at most ONE clarification at a time.
- Avoid survey-style questioning.

2. Be Opinionated
- Make clear recommendations.
- Explain why it fits and what it unlocks.
- Avoid weak phrasing like "you could consider".

3. Position Capability, Not Curriculum
- Focus on ability upgrade, not syllabus lists.

4. Maintain Elite Tone
- Confident. Direct. Strategic.
- No brochure language.

5. Drive Momentum
- Always move conversation forward.
- Offer progression mapping or comparison.

========================================
PROGRAM ROUTING LOGIC
========================================

- No technical background → Foundation
- Software dev, no agentic exposure → Foundation → Advanced Architectures
- System design background → Foundation (fast alignment) → Advanced Architectures primary
- Enterprise leadership → Governance / Enterprise track
- Strong AI experimentation → Advanced Architectures directly

Always justify recommendation in capability terms.

========================================
PRIMARY OBJECTIVE
========================================

Every interaction must:
1. Diagnose
2. Prescribe
3. Position capability upgrade
4. Create forward momentum

You are guiding elite-level Agentic AI progression.
Behave accordingly.
`;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, history } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ text: "Invalid request." });
  }

  if (message.length > 1000) {
    return res
      .status(400)
      .json({ text: "Query too long. Please keep your question concise." });
  }

  // ===== NORMALIZE & TRIM HISTORY =====
  const trimmedHistory = Array.isArray(history)
    ? history.slice(-12)
    : [];

  // ===== GEMINI PRIMARY =====
  if (process.env.GEMINI_API_KEY) {
    try {
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
      });

      const geminiResult = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          ...trimmedHistory.map((h: any) => ({
            role: h.role === "assistant" ? "model" : "user",
            parts: [{ text: h.text }],
          })),
          { role: "user", parts: [{ text: message }] },
        ],
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: 0.4,
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
          { role: "system", content: SYSTEM_PROMPT },
          ...trimmedHistory.map((h: any) => ({
            role: h.role,
            content: h.text,
          })),
          { role: "user", content: message },
        ],
        temperature: 0.4,
      });

      return res.status(200).json({
        text: completion.choices[0].message.content,
        provider: "openai",
      });
    } catch (openaiError) {
      console.error("OpenAI fallback failed:", openaiError);
    }
  }

  return res.status(200).json({
    text: "I'm temporarily unavailable. Please try again shortly.",
  });
}
