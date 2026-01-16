import { GoogleGenAI } from "@google/genai";

export const getAIAdvisorResponse = async (userPrompt: string, history: {role: 'user'|'model', text: string}[]) => {
  const apiKey = process.env.API_KEY;
  
  // Robust check for missing, undefined string, or placeholder keys
  if (!apiKey || apiKey === "undefined" || apiKey.length < 5) {
    console.error("AI_UPLINK_ERROR: No valid API_KEY found in process.env.");
    return "UPLINK_FAILURE: NEURAL_INTERFACE_REQUIRED. I cannot process this request because the system's API_KEY is missing or invalid. Please configure your environment variables in Vercel.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
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
    if (error.message?.includes('API key')) {
      return "CRITICAL_ERROR: INVALID_API_KEY. The neural uplink rejected the provided credentials. Please update your Vercel settings.";
    }
    return "CONNECTION_TERMINATED: Neural link instability detected. Please try your query again.";
  }
};