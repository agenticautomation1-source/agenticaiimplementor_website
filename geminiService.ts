import { GoogleGenAI } from "@google/genai";

export const getAIAdvisorResponse = async (userPrompt: string, history: {role: 'user'|'model', text: string}[]) => {
  // Accessing API_KEY via process.env which is defined in vite.config.ts
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === "undefined") {
    return "UPLINK_FAILURE: NEURAL_INTERFACE_REQUIRED. Please ensure your Vercel API_KEY environment variable is configured in Project Settings.";
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ 
          role: h.role === 'user' ? 'user' : 'model', 
          parts: [{ text: h.text }] 
        })),
        { role: 'user', parts: [{ text: userPrompt }] }
      ],
      config: {
        systemInstruction: `You are the Lead Systems Architect for 'Elite Agentic AI'. 
        You are an elite engineer specializing in cognitive architectures, multi-agent orchestration, and persistent autonomous loops.
        TONE: Authority, technical, and forward-leaning.
        GOAL: Provide architectural patterns (e.g., ReAct loops or Hierarchical Task Decomposition).`,
        temperature: 0.7,
        tools: [{ googleSearch: {} }]
      }
    });

    let output = response.text || "SYSTEM_SILENCE: Re-calibrating neural buffer...";
    
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks && chunks.length > 0) {
      output += "\n\n--- ARCHITECTURAL SOURCES ---\n";
      const uniqueLinks = new Set();
      chunks.forEach((chunk: any) => {
        if (chunk.web && chunk.web.uri && !uniqueLinks.has(chunk.web.uri)) {
          uniqueLinks.add(chunk.web.uri);
          output += `• ${chunk.web.title || 'Source'}: ${chunk.web.uri}\n`;
        }
      });
    }

    return output;
  } catch (error: any) {
    console.error("Neural Interface Error:", error);
    return "CONNECTION_TERMINATED: Neural link instability detected. Please ensure your API_KEY is valid and try again.";
  }
};