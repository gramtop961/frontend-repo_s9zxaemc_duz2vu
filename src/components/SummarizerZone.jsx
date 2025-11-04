import { useState } from 'react';
import { Bot, Loader2 } from 'lucide-react';

export default function SummarizerZone({ disabled, summary, onSummarize }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (disabled || loading) return;
    setLoading(true);
    await onSummarize();
    setLoading(false);
  };

  return (
    <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-[#0B1120] to-[#0A0F1E] p-5">
      <div className="flex items-center gap-2 text-white/80">
        <Bot className="text-fuchsia-300" />
        <h2 className="font-semibold tracking-wide">AI Summarizer</h2>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={handleClick}
          disabled={disabled || loading}
          className={`group inline-flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition transform active:scale-[0.98] ${
            disabled ? 'bg-white/10 text-white/40 cursor-not-allowed' : 'bg-gradient-to-r from-fuchsia-600 to-cyan-500 text-white shadow-[0_0_30px_rgba(217,70,239,0.25)] hover:shadow-[0_0_40px_rgba(34,211,238,0.35)]'
          }`}
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <span className="hidden sm:inline">Activate Summarizer</span>
              <span className="sm:hidden">Summarize</span>
            </>
          )}
        </button>
        <p className="text-xs text-white/60">
          {disabled ? 'Upload a PDF to enable.' : loading ? 'Deploying AI drone…' : 'Generate a high-level briefing.'}
        </p>
      </div>

      <div className="mt-4 relative h-64 rounded-xl border border-white/10 bg-black/30 overflow-hidden p-4">
        {!summary && !loading && (
          <p className="text-white/50 text-sm">Summary will appear here as holographic intel.</p>
        )}
        {loading && (
          <div className="h-full w-full grid place-items-center">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-2 border-fuchsia-400/40 border-t-cyan-400 animate-spin" />
              <div className="absolute inset-2 rounded-full border-2 border-cyan-400/30 border-t-fuchsia-400 animate-[spin_3s_linear_infinite]" />
            </div>
          </div>
        )}
        {summary && (
          <div className="h-full w-full overflow-auto">
            <div className="grid gap-3">
              <div className="rounded-lg border border-fuchsia-400/20 bg-fuchsia-500/5 p-3 text-fuchsia-200">
                {summary}
              </div>
              <div className="rounded-lg border border-cyan-400/20 bg-cyan-500/5 p-3 text-cyan-200">
                Tip: Ask follow-up questions in the Q&A Arena to drill deeper into specific topics.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
