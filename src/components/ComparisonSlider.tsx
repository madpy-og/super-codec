import { useState } from 'react';
import { ChevronsLeftRight } from 'lucide-react';
import originalImage from '../assets/pine-watt.jpg';
import compressedImage from '../assets/compressed-pine-watt.jpg';

export function ComparisonSlider() {
  const [sliderValue, setSliderValue] = useState(50);

  return (
    <div className="mt-24 max-w-5xl mx-auto w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-discord-onPrimary mb-4">Visually Lossless Compression</h2>
        <p className="text-discord-inkMuted text-[16px] max-w-2xl mx-auto">
          See the difference for yourself. Our advanced algorithm significantly reduces file size while preserving stunning visual quality.
        </p>
      </div>

      <div className="relative w-full aspect-square sm:aspect-[4/3] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-level-2 border border-discord-border bg-discord-surface1 select-none">

        {/* Base Image (Original - Left Side of Slider) */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={originalImage}
            alt="Original high resolution"
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-white text-sm font-medium z-10">
            Original (6.47 MB)
          </div>
        </div>

        {/* Overlay Image (Compressed - Right Side of Slider) */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{ clipPath: `inset(0 0 0 ${sliderValue}%)` }}
        >
          <img
            src={compressedImage}
            alt="Compressed version"
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute top-4 right-4 bg-discord-primary/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-white text-sm font-medium z-10">
            Compressed (611 KB)
          </div>
        </div>

        {/* The Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none flex items-center justify-center"
          style={{ left: `calc(${sliderValue}% - 2px)` }}
        >
          {/* Handle */}
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-discord-canvas">
            <ChevronsLeftRight size={20} />
          </div>
        </div>

        {/* Invisible Range Input for Interaction */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
          aria-label="Image comparison slider"
        />

      </div>
    </div>
  );
}
