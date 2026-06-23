import { Zap } from 'lucide-react';

export function Hero() {
  return (
    <div className="bg-discord-canvas relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-discord-primary/10 text-discord-ink text-sm font-medium mb-8 border border-discord-primary/20">
          <Zap size={16} className="text-discord-primary" />
          <span>100% Client-Side Compression</span>
        </div>

        <h1 className="text-discord-onPrimary font-bold tracking-[-0.03em] text-[40px] leading-[48px] md:text-[60px] md:leading-[68px] mb-6">
          Compress Images with <br />
          <span className="text-discord-primary">
            Zero Server Processing
          </span>
        </h1>

        <p className="text-discord-inkMuted text-[17px] leading-[28px] max-w-2xl mx-auto mb-10 font-normal tracking-[0.01em]">
          Super Compressor is a premium, engineering-grade image compression tool. Your files never leave your device. We use advanced Web Workers to compress your images securely right inside your browser.
        </p>
      </div>
    </div>
  );
}
