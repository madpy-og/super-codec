import { Uploader } from './Uploader';
import { useAudioVideoCodec } from '../hooks/useAudioVideoCodec';

export function AudioVideoPanel() {
  const {
    file,
    fileType,
    isProcessing,
    progress,
    resultUrl,
    resultFile,
    handleFileSelect,
    handleCompress,
    handleReset,
  } = useAudioVideoCodec();

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <>
      {!file ? (
        <div className="bg-discord-surface1 rounded-[16px] p-6 md:p-8 border border-discord-border max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 shadow-level-2 mt-8">
          <div className="hidden md:block flex-1 pr-4">
            <h2 className="text-2xl font-bold text-discord-onPrimary mb-3">
              Compress Audio & Video
            </h2>
            <p className="text-discord-inkMuted text-[15px] leading-relaxed">
              Drop your large media files here. Our FFmpeg-powered engine runs locally inside your browser to reduce file sizes securely, without uploading your private files to any server.
            </p>
          </div>

          <div className="w-full md:w-1/2 lg:w-[28rem] flex-shrink-0">
            <Uploader variant="media" onFileSelect={handleFileSelect} label="Upload Audio or Video" />
          </div>
        </div>
      ) : (
        <div className="bg-discord-surface1 rounded-[16px] p-6 border border-discord-border shadow-level-2 max-w-4xl mx-auto mt-8">
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center bg-discord-surface2 p-4 rounded-xl border border-discord-border">
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-discord-onPrimary truncate mr-4">
                  {file.name}
                </span>
                <span className="text-sm text-discord-inkMuted mt-1">
                  {formatSize(file.size)} • {fileType === 'video' ? 'Video' : 'Audio'}
                </span>
              </div>
              <button
                onClick={handleReset}
                className="text-sm px-4 py-2 bg-discord-surface3 hover:bg-discord-surface3Hover text-discord-onPrimary rounded-lg transition-colors"
              >
                Upload Different File
              </button>
            </div>

            {!resultUrl && !isProcessing && (
              <button
                onClick={handleCompress}
                className="btn-primary w-full h-12 text-base font-bold"
              >
                Start Compression
              </button>
            )}

            {isProcessing && (
              <div className="space-y-3 p-6 bg-discord-surface2 rounded-xl border border-discord-border text-center">
                <p className="text-discord-onPrimary font-medium">Compressing... {progress}%</p>
                <p className="text-discord-inkMuted text-sm">Please do not close the browser tab. This is processed entirely on your device.</p>
              </div>
            )}

            {resultUrl && resultFile && (
              <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-xl space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h3 className="text-green-400 font-bold text-lg">Compression Complete!</h3>
                    <p className="text-discord-onPrimary/80">
                      Size reduced from {formatSize(file.size)} to {formatSize(resultFile.size)} 
                      ({Math.round((1 - resultFile.size / file.size) * 100)}% smaller)
                    </p>
                  </div>
                </div>
                
                <div className="bg-black/40 rounded-lg overflow-hidden flex justify-center p-4">
                  {fileType === 'video' ? (
                    <video src={resultUrl} controls className="max-h-[300px] rounded" />
                  ) : (
                    <audio src={resultUrl} controls className="w-full" />
                  )}
                </div>
                
                <a 
                  href={resultUrl} 
                  download={resultFile.name}
                  className="btn-primary w-full h-12 text-base font-bold"
                >
                  Download Compressed File
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
