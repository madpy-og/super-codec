import { useState } from 'react';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { ImageCodecPanel } from './components/ImageCodecPanel';
import { AudioVideoPanel } from './components/AudioVideoPanel';
import { SteganoPanel } from './components/SteganoPanel';

type Tab = 'image' | 'audiovideo' | 'stegano';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('image');

  return (
    <div className="min-h-screen bg-discord-canvas flex flex-col font-sans" id="home">
      <Navbar />
      <Hero />

      {/* Main Content Area */}
      <div className="flex-grow pb-24 px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="max-w-5xl mx-auto scroll-mt-24" id="tools">

          {/* Tabs Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-discord-surface1 p-1.5 rounded-xl flex flex-col md:flex-row shadow-level-1 border border-discord-border w-full md:w-auto gap-1 md:gap-0">
              <button
                onClick={() => setActiveTab('image')}
                className={`flex-1 whitespace-nowrap px-3 md:px-4 py-3 md:py-2.5 rounded-lg font-medium text-[13px] md:text-sm transition-all duration-200 ${activeTab === 'image'
                    ? 'bg-discord-surface2 text-discord-onPrimary shadow-md'
                    : 'text-discord-inkMuted hover:text-discord-onPrimary hover:bg-discord-surface2'
                  }`}
              >
                Image Codec
              </button>
              <button
                onClick={() => setActiveTab('audiovideo')}
                className={`flex-1 whitespace-nowrap px-3 md:px-4 py-3 md:py-2.5 rounded-lg font-medium text-[13px] md:text-sm transition-all duration-200 ${activeTab === 'audiovideo'
                    ? 'bg-discord-surface2 text-discord-onPrimary shadow-md'
                    : 'text-discord-inkMuted hover:text-discord-onPrimary hover:bg-discord-surface2'
                  }`}
              >
                Audio / Video Codec
              </button>
              <button
                onClick={() => setActiveTab('stegano')}
                className={`flex-1 whitespace-nowrap px-3 md:px-4 py-3 md:py-2.5 rounded-lg font-medium text-[13px] md:text-sm transition-all duration-200 ${activeTab === 'stegano'
                    ? 'bg-discord-surface2 text-discord-onPrimary shadow-md'
                    : 'text-discord-inkMuted hover:text-discord-onPrimary hover:bg-discord-surface2'
                  }`}
              >
                Steganography
              </button>
            </div>
          </div>

          {activeTab === 'image' && <ImageCodecPanel />}
          {activeTab === 'audiovideo' && <AudioVideoPanel />}
          {activeTab === 'stegano' && <SteganoPanel />}

        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-discord-border text-center text-discord-inkMuted text-sm">
        <p>Copyright © 2026 Super Codec. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
