import { useRef } from 'react';
import Spline from '@splinetool/react-spline';
import { UploadCloud } from 'lucide-react';

export default function HeroSection({ onUpload, progress, fileName }) {
  const inputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === 'application/pdf') {
      onUpload(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      onUpload(file);
    }
  };

  return (
    <section className="relative mt-6 rounded-2xl overflow-hidden border border-white/10 bg-[#0B1120]">
      {/* 3D Spline Scene */}
      <div className="relative h-[420px] w-full">
        <Spline
          scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />

        {/* Gradient overlay for depth */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent" />

        {/* Hologram HUD */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="text-cyan-300/80 text-sm tracking-widest uppercase">Welcome, Commander</p>
          <h1 className="mt-1 text-3xl md:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-400">
            Upload Your PDF Mission
          </h1>
          <p className="mt-2 max-w-2xl text-white/70">
            Slot a PDF into the power core. Our AI drone will extract intel, deploy a summary, and answer your questions.
          </p>

          {/* Upload console */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="mt-6 group relative w-full max-w-xl rounded-xl border border-cyan-400/30 bg-white/5 backdrop-blur hover:border-fuchsia-400/40 transition-colors"
          >
            <button
              onClick={() => inputRef.current?.click()}
              className="w-full px-5 py-6 flex items-center justify-center gap-3 text-cyan-200 hover:text-fuchsia-200 transition-colors"
            >
              <UploadCloud className="text-cyan-300 group-hover:text-fuchsia-300 transition-colors" />
              <span className="font-medium">Drop PDF here or click to browse</span>
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            {/* Glowing edge */}
            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10">
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-md bg-gradient-to-r from-fuchsia-500/20 via-purple-500/20 to-cyan-400/20" />
            </div>
          </div>

          {/* Progress meter as energy charge */}
          {progress > 0 && (
            <div className="mt-4 w-full max-w-xl">
              <div className="text-xs text-white/70 mb-2 flex justify-between">
                <span>Charging Core</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="relative h-3 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400"
                  style={{ width: `${progress}%` }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_50%,rgba(255,255,255,0.2),transparent_40%)] mix-blend-screen" />
              </div>
              <p className="mt-2 text-xs text-cyan-300/80 truncate">
                {fileName ? `Loading: ${fileName}` : 'Preparing link...' }
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
