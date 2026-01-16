
import React, { useState, useRef, useEffect } from 'react';
import { getAIAdvisorResponse } from '../services/geminiService';
import { Message } from '../types';

const AIAdvisor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello! I'm your Elite AI Advisor. Ready to learn how to master autonomous systems? Ask me anything about our curriculum or agentic workflows." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getAIAdvisorResponse(input, messages);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "I hit a snag connection-wise. Make sure your API key is set!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="w-[90vw] md:w-[400px] h-[500px] glass-card rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 border-b border-white/10 bg-primary/10 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="size-8 bg-primary rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-sm">smart_toy</span>
              </div>
              <span className="text-white font-bold font-display">Elite AI Advisor</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                  m.role === 'user' 
                  ? 'bg-primary text-white' 
                  : 'bg-white/5 border border-white/10 text-slate-300'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl animate-pulse">
                  <div className="flex gap-1">
                    <div className="size-1.5 bg-slate-500 rounded-full animate-bounce"></div>
                    <div className="size-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="size-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-white/10 bg-black/40">
            <div className="relative">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about AI agents..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-cyan-400 transition-colors disabled:opacity-50"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="size-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl glow-accent hover:scale-110 transition-transform active:scale-95"
        >
          <span className="material-symbols-outlined text-3xl">smart_toy</span>
        </button>
      )}
    </div>
  );
};

export default AIAdvisor;
