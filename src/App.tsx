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
          <div className="flex justify-center mb-8 overflow-x-auto pb-4 hide-scrollbar">
            <div className="bg-discord-surface1 p-1.5 rounded-xl flex shadow-level-1 border border-discord-border whitespace-nowrap min-w-max">
              <button
                onClick={() => setActiveTab('image')}
                className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                  activeTab === 'image' 
                    ? 'bg-discord-surface2 text-discord-onPrimary shadow-md' 
                    : 'text-discord-inkMuted hover:text-discord-onPrimary hover:bg-discord-surface2'
                }`}
              >
                Image Codec
              </button>
              <button
                onClick={() => setActiveTab('audiovideo')}
                className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                  activeTab === 'audiovideo' 
                    ? 'bg-discord-surface2 text-discord-onPrimary shadow-md' 
                    : 'text-discord-inkMuted hover:text-discord-onPrimary hover:bg-discord-surface2'
                }`}
              >
                Audio / Video Codec
              </button>
              <button
                onClick={() => setActiveTab('stegano')}
                className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                  activeTab === 'stegano' 
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
