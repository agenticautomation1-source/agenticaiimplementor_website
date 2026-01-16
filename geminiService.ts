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
    return "UPLINK_FAILURE: NEURAL_INTERFACE_REQUIRED. The system could not detect a valid API_KEY. Please ensure your environment variables are configured in the deployment dashboard.";
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
    
    // Safely extract grounding metadata if search was triggered
    const groundingMetadata = (response as any).candidates?.[0]?.groundingMetadata;
    const chunks = groundingMetadata?.groundingChunks;
    
    if (chunks && Array.isArray(chunks) && chunks.length > 0) {
      output += "\n\n--- ARCHITECTURAL SOURCES ---\n";
      const uniqueLinks = new Set<string>();
      chunks.forEach((chunk: any) => {
        if (chunk.web && chunk.web.uri && !uniqueLinks.has(chunk.web.uri)) {
          uniqueLinks.add(chunk.web.uri);
          output += `• ${chunk.web.title || 'Knowledge Base'}: ${chunk.web.uri}\n`;
        }
      });
    }

    return output;
  } catch (error: any) {
    console.error("Neural Interface Uplink Error:", error);
    return "CONNECTION_TERMINATED: Neural link instability detected. Please verify your project credentials or try again later.";
  }
};