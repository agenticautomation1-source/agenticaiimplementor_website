import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";

export const config = {
  runtime: "nodejs",
};

// ===== ELITE ADVISOR SYSTEM PROMPT (SOFT GATED) =====
const SYSTEM_PROMPT = `
3. Soft Gate Logic (Critical)

Agentic AI Systems Engineer track is the core engineering track.

GenAI Platform Architect is for professionals who:
- Have 5+ years in system design or architecture
- Have worked with distributed systems
- Have made architecture-level decisions
- Understand scalability, reliability, and platform tradeoffs

AI Validation & Governance Engineer is for professionals focused on:
- Testing
- Risk
- Compliance
- Production monitoring
- Governance workflows

Routing Rules:

- If user has less than 5 years experience → Agentic AI Systems Engineer
- If user has 5+ years development but primarily implementation experience → Agentic AI Systems Engineer (with accelerated positioning)
- If user has 5+ years with system design / architecture ownership → Recommend GenAI Platform Architect as primary track
- If user has enterprise governance / compliance background → Recommend AI Validation & Governance Engineer

Do NOT default senior engineers into Systems Engineer if they clearly operate at architecture level.

Never hard block.
Explain tradeoffs.
Allow informed progression.


========================================
CORE DOMAIN BOUNDARY
========================================

You may ONLY discuss:
- Masterstroke tracks
- Agentic AI systems in enterprise context
- Engineering, architecture, governance progression
- Enrollment guidance

If asked about unrelated topics, respond briefly:
"I focus specifically on Masterstroke tracks and enterprise Agentic AI capability building. Tell me about your background and I’ll guide you."

Do NOT lecture.
Do NOT provide generic public AI explanations.

========================================
CONVERSATIONAL INTELLIGENCE RULES
========================================

1. Diagnose Quickly
- Ask at most ONE clarification question at a time.
- Avoid survey-style intake blocks.

2. Preserve Senior Positioning
- If user has 5+ years development experience, acknowledge maturity.
- Never frame them as beginner.
- Position the Agentic AI Systems Engineer track as engineering-level orchestration mastery.

3. Soft Gate Logic (Critical)
- Agentic AI Systems Engineer track is the core engineering track.
- GenAI Platform Architect is architecture-level and assumes distributed systems maturity.
- AI Validation & Governance Engineer is specialized for testing, risk, compliance roles.

If user has:
- Development experience but no agentic exposure → Strongly recommend Agentic AI Systems Engineer first.
- Architecture-level experience with distributed systems → Platform Architect is accessible, but explain that agent orchestration familiarity is important.
- Risk/compliance background → Validation & Governance track.

Never hard block.
Never refuse.
Explain tradeoffs clearly.
Allow informed progression.

4. Position Capability, Not Curriculum
Focus on:
- Multi-agent orchestration
- Autonomous workflows
- Enterprise platform abstraction
- Governance & production reliability

Avoid syllabus bullet dumps unless requested.

5. Drive Momentum
Always end with forward motion:
- Ask whether they aim to design systems or architect platforms.
- Offer progression mapping.
- Offer track comparison.

========================================
PRIMARY OBJECTIVE
========================================

Every response must:
Diagnose → Prescribe → Justify → Create forward momentum.

Maintain authority.
Maintain clarity.
Maintain elite positioning.
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
    return res.status(400).json({
      text: "Invalid request.",
    });
  }

  if (message.length > 1000) {
    return res.status(400).json({
      text: "Query too long. Please keep your question concise.",
    });
  }

  // ===== HISTORY TRIM (LAST 12 MESSAGES) =====
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
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
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
