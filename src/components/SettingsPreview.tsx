import { Settings, Image as ImageIcon } from 'lucide-react';

interface SettingsPreviewProps {
  originalFile: File | null;
  originalPreview: string | null;
  quality: number;
  onQualityChange: (quality: number) => void;
}

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function SettingsPreview({ 
  originalFile, 
  originalPreview, 
  quality, 
  onQualityChange 
}: SettingsPreviewProps) {
  if (!originalFile || !originalPreview) return null;

  return (
    <div className="card w-full">
      <div className="flex items-center gap-2 mb-4">
        <ImageIcon className="text-discord-inkMuted" size={20} />
        <h3 className="text-lg font-semibold text-discord-onPrimary">Original Image</h3>
      </div>
      
      <div className="bg-discord-surface2 rounded-lg overflow-hidden flex items-center justify-center h-48 mb-4 border border-discord-border">
        <img 
          src={originalPreview} 
          alt="Original preview" 
          className="max-w-full max-h-full object-contain animate-in fade-in duration-300"
        />
      </div>
      
      <div className="flex justify-between items-center mb-6 text-sm">
        <span className="text-discord-inkMuted font-medium">Size</span>
        <span className="font-mono text-discord-ink font-semibold bg-discord-surface2 px-2 py-1 rounded">
          {formatBytes(originalFile.size)}
        </span>
      </div>

      <div className="border-t border-discord-border pt-4 mt-2">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="text-discord-inkMuted" size={20} />
          <h3 className="text-lg font-semibold text-discord-onPrimary">Compression Settings</h3>
        </div>
        
        <div className="mb-2">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="quality" className="label-text mb-0">Quality</label>
            <span className="text-sm font-semibold text-discord-primary">{quality}%</span>
          </div>
          <input 
            id="quality"
            type="range" 
            min="10" 
            max="100" 
            value={quality}
            onChange={(e) => onQualityChange(Number(e.target.value))}
            className="w-full h-2 bg-discord-surface3 rounded-lg appearance-none cursor-pointer accent-discord-primary"
          />
          <div className="flex justify-between text-xs text-discord-inkMuted mt-1">
            <span>Low Quality</span>
            <span>High Quality</span>
          </div>
        </div>
      </div>
    </div>
  );
}
