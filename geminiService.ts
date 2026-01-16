import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export const getAIAdvisorResponse = async (userPrompt: string, history: {role: 'user'|'model', text: string}[]) => {
  /**
   * The API key must be obtained exclusively from the environment variable process.env.API_KEY.
   * Vite replaces this string at build time via the 'define' configuration.
   */
  const apiKey = process.env.API_KEY;
  
  // Validate presence of key without exposing UI
  if (!apiKey || apiKey === "null" || apiKey === "undefined") {
    console.error("AI_UPLINK_FAILURE: API_KEY is not configured in the environment.");
    return "UPLINK_FAILURE: The system could not detect a valid neural interface (API_KEY). Please ensure your environment variables are correctly configured.";
  }

  try {
    // Initialize exactly as per SDK guidelines
    const ai = new GoogleGenAI({ apiKey });
    
    const response: GenerateContentResponse = await ai.models.generateContent({
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
        CONTEXT: You are advising elite engineers. Use technical jargon where appropriate but remain clear.`,
        temperature: 0.7,
        tools: [{ googleSearch: {} }]
      }
    });

    // Access the text property directly as per SDK requirements (not as a method)
    let output = response.text || "SYSTEM_SILENCE: No response generated from cognitive core.";
    
    // Extract grounding sources for transparency and trust
    const groundingMetadata = (response as any).candidates?.[0]?.groundingMetadata;
    const chunks = groundingMetadata?.groundingChunks;
    
    if (chunks && Array.isArray(chunks) && chunks.length > 0) {
      output += "\n\n--- ARCHITECTURAL SOURCES ---\n";
      const uniqueLinks = new Set<string>();
      chunks.forEach((chunk: any) => {
        if (chunk.web && chunk.web.uri && !uniqueLinks.has(chunk.web.uri)) {
          uniqueLinks.add(chunk.web.uri);
          output += `• ${chunk.web.title || 'Knowledge Module'}: ${chunk.web.uri}\n`;
        }
      });
    }

    return output;
  } catch (error: any) {
    console.error("Neural Interface Error:", error);
    return "CONNECTION_TERMINATED: The neural link encountered an unrecoverable error. Check uplink status and credentials.";
  }
};