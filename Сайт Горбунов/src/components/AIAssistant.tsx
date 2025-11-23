import React, { useState } from 'react'; import { sendChatMessage } from '../services/geminiService'; import { MessageCircle, X, Send } from 'lucide-react';
export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); const [input, setInput] = useState(''); const [messages, setMessages] = useState([{role:'model', text:'Здравствуйте!'}]);
  const handleSend = async () => { if(!input) return; const msg = input; setInput(''); setMessages(p => [...p, {role:'user', text:msg}]); try { const res = await sendChatMessage([], msg); setMessages(p => [...p, {role:'model', text:res}]); } catch { setMessages(p => [...p, {role:'model', text:'Ошибка'}]); } };
  return (
    <>
      <button onClick={() => setIsOpen(true)} className={`fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#bfa17a] text-white rounded-full shadow-xl flex items-center justify-center ${isOpen?'hidden':''}`}><MessageCircle /></button>
      {isOpen && <div className="fixed bottom-8 right-8 z-50 w-80 h-96 bg-white shadow-2xl rounded-lg flex flex-col border border-gray-200">
         <div className="p-4 bg-[#f8f8f7] border-b flex justify-between"><span>AI Assistant</span><button onClick={() => setIsOpen(false)}><X size={16}/></button></div>
         <div className="flex-1 overflow-y-auto p-4 space-y-4">{messages.map((m,i) => <div key={i} className={`p-2 text-sm rounded ${m.role==='user'?'bg-[#bfa17a] text-white ml-auto':'bg-gray-100'}`}>{m.text}</div>)}</div>
         <div className="p-2 border-t flex gap-2"><input value={input} onChange={e=>setInput(e.target.value)} className="flex-1 border p-1" /><button onClick={handleSend}><Send size={16}/></button></div>
      </div>}
    </>
  );
};