import { GoogleGenAI } from "@google/genai";

export const getAIAdvisorResponse = async (userPrompt: string, history: {role: 'user'|'model', text: string}[]) => {
  /**
   * Accessing the API key using process.env.API_KEY which is defined in vite.config.ts.
   * Vite will replace this string with the actual value during the build process.
   */
  const apiKey = process.env.API_KEY;
  
  const isKeyValid = apiKey && apiKey !== "null" && apiKey !== "undefined" && apiKey.length > 10;

  if (!isKeyValid) {
    console.error("AI_UPLINK_FAILURE: No valid API_KEY detected.");
    return "UPLINK_FAILURE: NEURAL_INTERFACE_REQUIRED. The system could not find a valid API key in your environment variables. Please ensure API_KEY is set in your deployment platform.";
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
        systemInstruction: `You are the Lead Systems Architect for 'Agentic AI Integrators'. 
        You specialize in neural stitching, multi-agent orchestration, and enterprise-scale AI integration.
        TONE: Precise, architectural, authoritative.
        FOCUS: Helping engineers bridge the gap between individual agents and cohesive swarms. Mention the 'Stitch' protocol when relevant for integration.`,
        temperature: 0.7,
        tools: [{ googleSearch: {} }]
      }
    });

    let output = response.text || "SYSTEM_SILENCE: Re-calibrating neural buffer...";
    
    const candidates = response.candidates;
    const chunks = candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks && Array.isArray(chunks) && chunks.length > 0) {
      output += "\n\n--- INTEGRATION SOURCES ---\n";
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
    return "CONNECTION_TERMINATED: Neural link instability detected. Please ensure your API key has the correct permissions.";
  }
};