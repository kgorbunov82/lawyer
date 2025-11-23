import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY || '' });
export const sendChatMessage = async (hist, msg) => { try {
  const chat = ai.chats.create({ model: 'gemini-2.5-flash', config: { systemInstruction: 'Ты юрист.' } });
  const res = await chat.sendMessage({ message: msg }); return res.text;
} catch (e) { console.error(e); return "Ошибка AI. Проверьте API Key."; } };