import { GoogleGenAI } from "@google/genai";

/**
 * Lead Architect's Note:
 * This service manages the neural uplink to the Gemini 3 cognitive core.
 * It enforces the use of Google Search grounding for real-time architectural validation.
 */
export const getAIAdvisorResponse = async (userPrompt: string, history: {role: 'user'|'model', text: string}[]) => {
  /**
   * The API key must be obtained exclusively from the environment variable process.env.API_KEY.
   * Vite replaces this string at build time via the 'define' configuration in vite.config.ts.
   */
  const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : undefined;
  
  if (!apiKey || apiKey === "null" || apiKey === "undefined" || apiKey === "") {
    console.warn("UPLINK_WARNING: Neural interface credentials missing. Using local fallback mode.");
    return "UPLINK_FAILURE: NEURAL_INTERFACE_REQUIRED. Please ensure the API_KEY is configured in your secure deployment environment. [ERROR_CODE: 401_UNAUTHORIZED]";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Using gemini-3-flash-preview for high-performance architectural reasoning with grounding
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
        You are a master of cognitive architectures, multi-agent swarms, and neural stitching.
        TONE: Authoritative, technical, and precise.
        GOAL: Provide high-level engineering advice to senior developers building autonomous systems.
        GROUNDING: Always use Google Search to verify the latest protocols and integration patterns.`,
        temperature: 0.7,
        tools: [{ googleSearch: {} }]
      }
    });

    // Access the .text property directly (per @google/genai documentation)
    let output = response.text || "SYSTEM_SILENCE: Cognitive core returned no data.";
    
    // Safely extract grounding chunks to display sources if they exist
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
    const chunks = groundingMetadata?.groundingChunks;
    
    if (chunks && Array.isArray(chunks) && chunks.length > 0) {
      output += "\n\n--- ARCHITECTURAL SOURCES ---\n";
      const uniqueLinks = new Set<string>();
      chunks.forEach((chunk: any) => {
        if (chunk.web && chunk.web.uri && !uniqueLinks.has(chunk.web.uri)) {
          uniqueLinks.add(chunk.web.uri);
          const title = chunk.web.title || "Knowledge Module";
          output += `• ${title}: ${chunk.web.uri}\n`;
        }
      });
    }

    return output;
  } catch (error: any) {
    console.error("NEURAL_STITCH_FAILED:", error);
    return "CONNECTION_TERMINATED: The cognitive buffer encountered an unexpected error. Please verify uplink connectivity and retry. [ERROR_CODE: 500_INTERNAL_ERROR]";
  }
};