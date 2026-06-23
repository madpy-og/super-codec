import { Uploader } from './Uploader';
import { useStegano } from '../hooks/useStegano';

export function SteganoPanel() {
  const {
    mode,
    setMode,
    file,
    preview,
    secretText,
    setSecretText,
    decodedText,
    isProcessing,
    resultImage,
    error,
    handleFileSelect,
    handleEncode,
    handleDecode,
    resetAll,
  } = useStegano();

  return (
    <div className="bg-discord-surface1 rounded-[16px] p-6 border border-discord-border shadow-level-2 max-w-4xl mx-auto mt-8">
      <div className="flex justify-center mb-8">
        <div className="bg-discord-surface1 p-1.5 rounded-xl flex flex-col md:flex-row shadow-level-1 border border-discord-border w-full md:w-auto gap-1 md:gap-0">
          <button
            className={`flex-1 whitespace-nowrap px-3 md:px-4 py-3 md:py-2.5 rounded-lg font-medium text-[13px] md:text-sm transition-all duration-200 ${mode === 'encode' ? 'bg-discord-surface2 text-discord-onPrimary shadow-md' : 'text-discord-inkMuted hover:text-discord-onPrimary hover:bg-discord-surface2'}`}
            onClick={() => { setMode('encode'); resetAll(); }}
          >
            Encode (Hide Message)
          </button>
          <button
            className={`flex-1 whitespace-nowrap px-3 md:px-4 py-3 md:py-2.5 rounded-lg font-medium text-[13px] md:text-sm transition-all duration-200 ${mode === 'decode' ? 'bg-discord-surface2 text-discord-onPrimary shadow-md' : 'text-discord-inkMuted hover:text-discord-onPrimary hover:bg-discord-surface2'}`}
            onClick={() => { setMode('decode'); resetAll(); }}
          >
            Decode (Extract Message)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {!file ? (
            <Uploader variant="image" onFileSelect={handleFileSelect} label={mode === 'encode' ? "Upload source image" : "Upload image to decode"} />
          ) : (
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden border border-discord-border bg-black/20 aspect-video md:aspect-square flex items-center justify-center">
                <img src={preview!} alt="Preview" className="max-w-full max-h-full object-contain" />
                <button
                  onClick={resetAll}
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-4">
          {mode === 'encode' ? (
            <>
              <div className="space-y-2">
                <label className="block text-discord-inkMuted text-sm font-medium">Secret Message</label>
                <textarea
                  value={secretText}
                  onChange={(e) => setSecretText(e.target.value)}
                  placeholder="Type your secret message here..."
                  className="w-full h-32 p-3 bg-discord-surface2 border border-discord-border rounded-lg text-discord-onPrimary placeholder-discord-inkMuted focus:border-discord-brand focus:outline-none resize-none transition-colors"
                />
              </div>
              <button
                onClick={handleEncode}
                disabled={!file || !secretText || isProcessing}
                className="btn-primary w-full h-11 text-base"
              >
                {isProcessing ? 'Encoding...' : 'Encode Message'}
              </button>

              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

              {resultImage && (
                <div className="mt-4 p-5 border border-discord-border bg-discord-brand/10 rounded-lg space-y-4 animate-in fade-in slide-in-from-bottom-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <p className="text-discord-onPrimary font-medium">Message hidden successfully!</p>
                  </div>
                  <a
                    href={resultImage}
                    download="stegano_secret.png"
                    className="btn-primary w-full h-11 text-base"
                  >
                    Download Image
                  </a>
                </div>
              )}
            </>
          ) : (
            <>
              <button
                onClick={handleDecode}
                disabled={!file || isProcessing}
                className="btn-primary w-full h-11 text-base mt-6"
              >
                {isProcessing ? 'Decoding...' : 'Extract Message'}
              </button>

              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

              {decodedText !== null && (
                <div className="mt-4 animate-in fade-in slide-in-from-bottom-4">
                  {decodedText === '' ? (
                    <div className="p-4 bg-discord-surface2 border border-discord-border rounded-lg text-discord-inkMuted">
                      No hidden message found.
                    </div>
                  ) : (
                    <div className="p-5 bg-discord-surface2 border-l-4 border-discord-brand rounded-r-lg shadow-inner">
                      <p className="text-discord-inkMuted text-xs font-semibold uppercase tracking-wider mb-2">Hidden Message</p>
                      <p className="text-discord-onPrimary font-mono break-words">{decodedText}</p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
