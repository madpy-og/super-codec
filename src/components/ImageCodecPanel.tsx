import { Uploader } from './Uploader';
import { SettingsPreview } from './SettingsPreview';
import { Result } from './Result';
import { ComparisonSlider } from './ComparisonSlider';
import { useImageCodec } from '../hooks/useImageCodec';

export function ImageCodecPanel() {
  const {
    originalFile,
    originalPreview,
    compressedFile,
    compressedPreview,
    quality,
    setQuality,
    isCompressing,
    handleFileSelect,
    handleReset,
  } = useImageCodec();

  return (
    <>
      {!originalFile ? (
        <>
          <div className="bg-discord-surface1 rounded-[16px] p-6 md:p-8 border border-discord-border max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 shadow-level-2 mt-8">
            <div className="hidden md:block flex-1 pr-4">
              <h2 className="text-2xl font-bold text-discord-onPrimary mb-3">
                Start optimizing now
              </h2>
              <p className="text-discord-inkMuted text-[15px] leading-relaxed">
                Drop your high-resolution images here. Our advanced engine will instantly reduce file sizes without sacrificing quality—all safely inside your browser.
              </p>
            </div>

            <div className="w-full md:w-1/2 lg:w-[28rem] flex-shrink-0">
              <Uploader onFileSelect={handleFileSelect} />
            </div>
          </div>

          <div id="compare" className="scroll-mt-24">
            <ComparisonSlider />
          </div>
        </>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 mt-8">
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
    </>
  );
}
