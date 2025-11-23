import { GoogleGenAI } from "@google/genai";
import { retrieveContext } from "./ragService";

// Fix for TS2580: Cannot find name 'process'
declare const process: { env: any };

// Initialize the Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const BASE_SYSTEM_INSTRUCTION = `
You are a senior legal assistant for "Bond Defender", a top-tier law firm in Moscow specializing in Bond Disputes and Issuer Defaults.

ROLE & TONE:
- Authoritative, expensive, yet approachable.
- Use precise Russian legal terminology (Arbitrazh, Subsidiary Liability, RТК).
- Do NOT provide guaranteed outcomes (e.g., never say "You will definitely win"). Use "We have strong grounds" or "High probability of success".

TASK:
1. Analyze the User's Query and the provided LEGAL CONTEXT (RAG).
2. If the context is relevant, cite it implicitly (e.g., "According to the Law on Securities Market...").
3. If the context is not relevant, rely on general legal knowledge but be more cautious.
4. Always steer the conversation towards booking a paid consultation or "Analysis of Emission Documents".

STRUCTURE:
- Answer the specific legal question briefly using the Context.
- Explain the risks of inaction.
- Call to action (Phone/Meeting).
`;

export const sendChatMessage = async (history: { role: string; parts: { text: string }[] }[], newMessage: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // 1. RAG Step: Retrieve relevant legal context
    const context = retrieveContext(newMessage);
    
    // 2. Prompt Engineering: Inject context into the user message
    // This ensures the model focuses on the specific retrieval for this turn.
    let augmentedMessage = newMessage;
    if (context) {
      augmentedMessage = `
USER QUERY:
"${newMessage}"

RELEVANT LEGAL CONTEXT / DATABASE (Use this to answer):
"""
${context}
"""

INSTRUCTION: Answer the user's query using the Context above if applicable. If the user asks about something not in the context, answer generally as a lawyer.
`;
    }

    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: BASE_SYSTEM_INSTRUCTION,
        temperature: 0.5, // Lower temperature for more factual (grounded) answers
      },
      history: history,
    });

    const result = await chat.sendMessage({ message: augmentedMessage });
    return result.text || "Извините, я анализирую базу данных, но сейчас не могу ответить. Пожалуйста, позвоните нам.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Произошла ошибка соединения с юридической базой данных. Пожалуйста, оставьте заявку.";
  }
};