import { useState } from 'react';
import { Send, MessageSquare, Cpu, Volume2 } from 'lucide-react';

function synthVoice(text) {
  try {
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1.05;
    utter.pitch = 1.1;
    utter.volume = 0.8;
    window.speechSynthesis.speak(utter);
  } catch (_) {
    // ignore
  }
}

export default function QAArena({ contextText, onAnswered }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Online. Upload a PDF, then interrogate me with your questions.' },
  ]);

  const ask = async () => {
    const q = input.trim();
    if (!q) return;
    setInput('');
    setMessages((m) => [...m, { role: 'user', content: q }]);

    // Simulate thinking and answer using context
    await new Promise((r) => setTimeout(r, 800));
    const base = contextText || 'No document context loaded yet. My answer is speculative.';
    const answer = `Intel: ${q} → Based on current data, here is a focused response:\n\n${base.slice(0, 280)}${base.length > 280 ? '…' : ''}`;

    setMessages((m) => [...m, { role: 'ai', content: answer }]);
    onAnswered?.();
  };

  return (
    <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-[#0B1120] to-[#0A0F1E] p-5">
      <div className="flex items-center gap-2 text-white/80">
        <MessageSquare className="text-cyan-300" />
        <h2 className="font-semibold tracking-wide">Q&A Arena</h2>
        <div className="ml-auto flex items-center gap-2 text-xs text-white/60">
          <Cpu className="text-fuchsia-300" />
          <span>Hologram link stable</span>
        </div>
      </div>

      <div className="mt-4 h-72 rounded-xl border border-white/10 bg-black/30 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-auto p-4 space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[85%] rounded-lg px-3 py-2 text-sm shadow ${
                m.role === 'ai'
                  ? 'bg-gradient-to-r from-fuchsia-500/10 to-cyan-500/10 border border-fuchsia-400/20 text-white/90'
                  : 'ml-auto bg-white/10 border border-white/15 text-white'
              }`}
            >
              {m.content}
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 p-2 flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && ask()}
            placeholder="Type your question to the AI console…"
            className="flex-1 bg-transparent outline-none px-3 py-2 rounded-lg text-sm placeholder:text-white/40 border border-white/10 focus:border-fuchsia-400/40"
          />
          <button
            onClick={ask}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 bg-gradient-to-r from-cyan-600 to-fuchsia-600 hover:from-cyan-500 hover:to-fuchsia-500 transition text-white"
          >
            <Send size={16} />
            Send
          </button>
          <button
            onClick={() => {
              const last = messages.filter((m) => m.role === 'ai').slice(-1)[0];
              if (last) synthVoice(last.content);
            }}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 bg-white/10 hover:bg-white/15 transition text-white"
            title="Voice-over"
          >
            <Volume2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
