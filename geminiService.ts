import { GoogleGenAI } from "@google/genai";

export const getAIAdvisorResponse = async (userPrompt: string, history: {role: 'user'|'model', text: string}[]) => {
  const apiKey = process.env.API_KEY;
  
  // Robust check for missing or placeholder keys
  if (!apiKey || apiKey === "undefined" || apiKey.length < 10) {
    return "UPLINK_FAILURE: NEURAL_INTERFACE_REQUIRED. The system could not detect a valid API_KEY. Please ensure your Vercel environment variables are configured correctly.";
  }

  try {
    // Initializing inside the function prevents the SDK from throwing on app load
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
        return "CRITICAL_ERROR: INVALID_API_KEY. Please check your neural uplink credentials in Vercel settings.";
    }
    return "CONNECTION_TERMINATED: Neural link instability detected. Please try your query again later.";
  }
};