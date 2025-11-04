import { useState } from 'react';
import HeroSection from './components/HeroSection.jsx';
import ExtractionPanel from './components/ExtractionPanel.jsx';
import SummarizerZone from './components/SummarizerZone.jsx';
import QAArena from './components/QAArena.jsx';
import { Sparkles, Trophy, Zap } from 'lucide-react';

export default function App() {
  const [fileName, setFileName] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [extractedText, setExtractedText] = useState('');
  const [summary, setSummary] = useState('');
  const [xp, setXp] = useState(0);

  // Simulated extraction for demo purposes
  const handleUpload = (file) => {
    if (!file) return;
    setFileName(file.name);
    setUploadProgress(0);
    setSummary('');
    setExtractedText('');

    // Animate progress
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 20;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        // Fake extracted content
        const fake = `Mission Log: ${file.name}\n\n— Initializing data uplink...\n— Parsing document structure...\n— Signal locked. Extracting text frames...\n\nThis is a simulated extraction for the cyber console demo. Use the Summarizer to condense insights and the Q&A Arena to interrogate the data.\n\nKey Terms: AI, cyberpunk, hologram, neon, console, mission.`;
        setExtractedText(fake);
        setXp((v) => v + 25);
      }
      setUploadProgress(p);
    }, 250);
  };

  const handleSummarize = async () => {
    if (!extractedText) return;
    // Simulate thinking delay
    await new Promise((r) => setTimeout(r, 1500));
    const s = 'Summary: A high-level briefing highlighting an immersive, neon-powered AI console that can extract text from PDFs, generate concise summaries, and support interactive Q&A. Core motifs: cyberpunk aesthetics, animated holograms, and gamified progression.';
    setSummary(s);
    setXp((v) => v + 35);
  };

  const handleAnswered = () => {
    setXp((v) => v + 15);
  };

  return (
    <div className="min-h-screen w-full bg-[#0A0F1E] text-white overflow-x-hidden">
      {/* Glowing radial background accents */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-600/20 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-[36rem] rounded-full bg-indigo-600/10 blur-3xl" />
      </div>

      {/* XP / Badges HUD */}
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-[#0A0F1E]/70 bg-[#0A0F1E]/60 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap className="text-cyan-400" />
            <span className="font-semibold tracking-wide text-cyan-300">Neon Nexus</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-fuchsia-300">
              <Sparkles size={18} />
              <span className="text-sm">XP</span>
              <div className="relative h-2 w-32 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400"
                  style={{ width: `${Math.min((xp % 100), 100)}%` }}
                />
              </div>
              <span className="text-xs text-fuchsia-200">{xp}</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-cyan-300">
              <Trophy size={18} />
              <span className="text-xs">Badges: {xp >= 75 ? 'AI Whisperer' : xp >= 35 ? 'Data Extractor' : 'Rookie Pilot'}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4">
        <HeroSection onUpload={handleUpload} progress={uploadProgress} fileName={fileName} />

        <section className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ExtractionPanel extractedText={extractedText} progress={uploadProgress} />
          <SummarizerZone disabled={!extractedText} summary={summary} onSummarize={handleSummarize} />
        </section>

        <section className="mt-12">
          <QAArena contextText={summary || extractedText} onAnswered={handleAnswered} />
        </section>

        <footer className="mt-16 mb-10 text-center text-white/60 text-sm">
          Built for commanders who like their AI with neon and attitude.
        </footer>
      </main>
    </div>
  );
}
