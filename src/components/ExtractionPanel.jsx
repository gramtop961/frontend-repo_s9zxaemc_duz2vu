import { useEffect, useState } from 'react';
import { TerminalSquare } from 'lucide-react';

function useTypingEffect(text, speed = 12) {
  const [output, setOutput] = useState('');
  useEffect(() => {
    if (!text) {
      setOutput('');
      return;
    }
    let i = 0;
    setOutput('');
    const id = setInterval(() => {
      i += 1;
      setOutput(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return output;
}

export default function ExtractionPanel({ extractedText, progress }) {
  const typed = useTypingEffect(extractedText, 8);

  return (
    <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-[#0B1120] to-[#0A0F1E] p-5">
      <div className="flex items-center gap-2 text-white/80">
        <TerminalSquare className="text-cyan-300" />
        <h2 className="font-semibold tracking-wide">Text Extraction Feed</h2>
        {progress < 100 && (
          <span className="ml-auto text-xs text-white/60">Awaiting input…</span>
        )}
        {progress === 100 && (
          <span className="ml-auto text-xs text-emerald-300">Text Extraction Complete</span>
        )}
      </div>

      <div className="mt-4 relative h-64 rounded-xl border border-white/10 bg-black/30 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_0,rgba(255,255,255,0.02)_2px,transparent_4px)] bg-[length:100%_24px]" />
        <pre className="h-full w-full overflow-auto text-sm leading-6 p-4 text-cyan-200/90">
{typed || (progress > 0 ? 'Initializing data uplink…' : 'Drop a PDF to begin extraction.')}
        </pre>
        {progress === 100 && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-400/20 shadow-[0_0_20px_rgba(16,185,129,0.25)]">
            Extraction Complete
          </div>
        )}
      </div>
    </div>
  );
}
