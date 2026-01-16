import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export const getAIAdvisorResponse = async (userPrompt: string, history: {role: 'user'|'model', text: string}[]) => {
  /**
   * Statically replaced by Vite during build. 
   * Reference: vite.config.ts define block.
   */
  const apiKey = process.env.API_KEY;
  
  const isKeyValid = apiKey && apiKey !== "null" && apiKey !== "undefined" && apiKey.length > 10;

  if (!isKeyValid) {
    console.warn("AI_UPLINK_STATUS: Waiting for valid API_KEY initialization...");
    return "UPLINK_FAILURE: NEURAL_INTERFACE_REQUIRED. Please ensure the API_KEY environment variable is configured in the deployment dashboard.";
  }

  try {
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
        FOCUS: Helping engineers bridge the gap between individual agents and cohesive swarms.`,
        temperature: 0.7,
        tools: [{ googleSearch: {} }]
      }
    });

    let output = response.text || "SYSTEM_SILENCE: Re-calibrating neural buffer...";
    
    // Type-safe access to grounding metadata if available
    const groundingMetadata = (response as any).candidates?.[0]?.groundingMetadata;
    const chunks = groundingMetadata?.groundingChunks;
    
    if (chunks && Array.isArray(chunks) && chunks.length > 0) {
      output += "\n\n--- INTEGRATION SOURCES ---\n";
      const uniqueLinks = new Set<string>();
      chunks.forEach((chunk: any) => {
        if (chunk.web && chunk.web.uri && !uniqueLinks.has(chunk.web.uri)) {
          uniqueLinks.add(chunk.web.uri);
          output += `• ${chunk.web.title || 'Source'}: ${chunk.web.uri}\n`;
        }
      });
    }

    return output;
  } catch (error: any) {
    console.error("Neural Interface Connection Error:", error);
    return "CONNECTION_TERMINATED: Neural link instability detected. Please try again later or verify project credentials.";
  }
};