import { GoogleGenAI } from "@google/genai";

export const getAIAdvisorResponse = async (userPrompt: string, history: {role: 'user'|'model', text: string}[]) => {
  const apiKey = process.env.API_KEY;
  
  // Robust validation of credentials
  const isKeyValid = apiKey && apiKey !== "null" && apiKey !== "undefined" && apiKey.length > 10;

  if (!isKeyValid) {
    console.error("AI_UPLINK_FAILURE: No valid API_KEY detected.");
    return "UPLINK_FAILURE: NEURAL_INTERFACE_REQUIRED. The system could not find a valid API key. Please check your Vercel Environment Variables (Settings -> Environment Variables) and ensure 'API_KEY' is added, then redeploy the project.";
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
        You are an elite engineer specializing in cognitive architectures.
        TONE: Authority, technical, and forward-leaning.`,
        temperature: 0.7,
        tools: [{ googleSearch: {} }]
      }
    });

    let output = response.text || "SYSTEM_SILENCE: Re-calibrating neural buffer...";
    
    // Process search grounding chunks
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
      return "CRITICAL_ERROR: INVALID_API_KEY. The credentials provided were rejected by the neural link. Check your Vercel settings.";
    }
    return "CONNECTION_TERMINATED: Neural link instability detected. Please try again later.";
  }
};