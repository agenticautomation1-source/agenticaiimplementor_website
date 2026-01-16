import { GoogleGenAI } from "@google/genai";

export const getAIAdvisorResponse = async (userPrompt: string, history: {role: 'user'|'model', text: string}[]) => {
  const apiKey = process.env.API_KEY;
  
  // Validation for missing or invalid keys
  const isValid = apiKey && apiKey !== "undefined" && apiKey !== "null" && apiKey.length > 10;

  if (!isValid) {
    console.error("AI_UPLINK_ERROR: Missing valid API_KEY in process.env.");
    return "UPLINK_FAILURE: NEURAL_INTERFACE_REQUIRED. Please ensure the API_KEY environment variable is set in Vercel and that you have triggered a new deployment.";
  }

  try {
    // Initialize client inside the call to ensure the key is present
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
    
    // Extract grounding URLs if available
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks && chunks.length > 0) {
      output += "\n\n--- SOURCES ---\n";
      const uniqueLinks = new Set();
      chunks.forEach((chunk: any) => {
        if (chunk.web && chunk.web.uri && !uniqueLinks.has(chunk.web.uri)) {
          uniqueLinks.add(chunk.web.uri);
          output += `• ${chunk.web.title || 'Architectural Link'}: ${chunk.web.uri}\n`;
        }
      });
    }

    return output;
  } catch (error: any) {
    console.error("Neural Interface Error:", error);
    if (error.message?.includes('API key')) {
      return "CRITICAL_ERROR: INVALID_API_KEY. The uplink rejected credentials. Check Vercel settings.";
    }
    return "CONNECTION_TERMINATED: Neural link instability. Please try again.";
  }
};