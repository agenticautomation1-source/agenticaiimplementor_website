
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIAdvisorResponse = async (userPrompt: string, history: {role: 'user'|'model', text: string}[]) => {
  const model = "gemini-3-flash-preview";
  
  const chat = ai.chats.create({
    model,
    config: {
      systemInstruction: "You are the 'Elite Agentic AI Advisor'. You help senior software engineers understand how to master autonomous AI agents. Be professional, technical, and encouraging. Focus on agentic workflows, multi-agent orchestration, and advanced reasoning. Mention specific courses from Elite Agentic AI like 'Autonomous Agent Architectures' or 'Cognitive Reasoning Systems' if relevant.",
    },
  });

  // We manually reconstruct the chat history for simpler usage
  const result = await ai.models.generateContent({
    model,
    contents: [
        ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
        { role: 'user', parts: [{ text: userPrompt }] }
    ],
    config: {
        systemInstruction: "You are the 'Elite Agentic AI Advisor'. Help software engineers master AI agents.",
    }
  });

  return result.text || "I'm sorry, I couldn't process that request.";
};
