import { useState, useEffect } from 'react';
import { compressImage } from './utils/compressImage';
import { Uploader } from './components/Uploader';
import { SettingsPreview } from './components/SettingsPreview';
import { Result } from './components/Result';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { ComparisonSlider } from './components/ComparisonSlider';

function App() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);

  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [compressedPreview, setCompressedPreview] = useState<string | null>(null);

  const [quality, setQuality] = useState<number>(80);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);

  const handleFileSelect = (file: File) => {
    setOriginalFile(file);
    const previewUrl = URL.createObjectURL(file);
    setOriginalPreview(previewUrl);
    setCompressedFile(null);
    setCompressedPreview(null);
    setQuality(80);
  };

  const handleCompress = async (file: File, q: number) => {
    setIsCompressing(true);
    try {
      const result = await compressImage(file, q);
      setCompressedFile(result.file);
      setCompressedPreview(result.previewUrl);
    } catch (error) {
      console.error('Failed to compress image:', error);
      alert('Failed to compress image. Please try again.');
    } finally {
      setIsCompressing(false);
    }
  };

  useEffect(() => {
    if (originalFile) {
      const timer = setTimeout(() => {
        handleCompress(originalFile, quality);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [originalFile, quality]);

  const handleReset = () => {
    setOriginalFile(null);
    setOriginalPreview(null);
    setCompressedFile(null);
    setCompressedPreview(null);
    setQuality(80);
  };

  return (
    <div className="min-h-screen bg-discord-canvas flex flex-col font-sans" id="home">
      <Navbar />
      <Hero />

      {/* Main Content Area */}
      <div className="flex-grow pb-24 px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="max-w-5xl mx-auto">
          {!originalFile ? (
            <>
              <div id="uploader" className="bg-discord-surface1 rounded-[16px] p-6 md:p-8 border border-discord-border max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 scroll-mt-24 shadow-level-2">
                {/* CTA Text - Hidden on mobile, visible on desktop to fill space */}
                <div className="hidden md:block flex-1 pr-4">
                  <h2 className="text-2xl font-bold text-discord-onPrimary mb-3">
                    Start optimizing now
                  </h2>
                  <p className="text-discord-inkMuted text-[15px] leading-relaxed">
                    Drop your high-resolution images here. Our advanced engine will instantly reduce file sizes without sacrificing quality—all safely inside your browser.
                  </p>
                </div>

                {/* Uploader Component */}
                <div className="w-full md:w-1/2 lg:w-[28rem] flex-shrink-0">
                  <Uploader onFileSelect={handleFileSelect} />
                </div>
              </div>

              <div id="compare" className="scroll-mt-24">
                <ComparisonSlider />
              </div>
            </>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center bg-discord-surface1 p-6 rounded-xl border border-discord-border shadow-level-2 gap-4">
                <div className="flex flex-col min-w-0">
                  <span className="font-semibold text-[16px] text-discord-onPrimary truncate mr-4">
                    {originalFile.name}
                  </span>
                  <span className="text-[13px] text-discord-inkMuted mt-0.5">
                    Ready for compression
                  </span>
                </div>
                <button
                  onClick={handleReset}
                  className="btn-secondary whitespace-nowrap"
                >
                  Upload New Image
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <SettingsPreview
                  originalFile={originalFile}
                  originalPreview={originalPreview}
                  quality={quality}
                  onQualityChange={setQuality}
                />

                <Result
                  originalFile={originalFile}
                  compressedFile={compressedFile}
                  compressedPreview={compressedPreview}
                  isCompressing={isCompressing}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-discord-border text-center text-discord-inkMuted text-sm">
        <p>Copyright © 2026 Super Compressor. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
