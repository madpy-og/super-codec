import React, { useCallback, useState } from 'react';
import { UploadCloud } from 'lucide-react';

interface UploaderProps {
  onFileSelect: (file: File) => void;
}

export function Uploader({ onFileSelect }: UploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onFileSelect(file);
      } else {
        alert('Please upload an image file');
      }
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        onFileSelect(file);
      } else {
        alert('Please upload an image file');
      }
    }
  }, [onFileSelect]);

  return (
    <div className="w-full h-full">
      <div
        className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center transition-all duration-200 cursor-pointer ${isDragging
          ? 'border-discord-primary bg-discord-primary/10 scale-[1.02]'
          : 'border-discord-border hover:border-discord-primary/50 bg-discord-surface1'
          }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        <div className="bg-discord-surface1 p-4 rounded-full mb-4 text-discord-primary">
          <UploadCloud size={32} />
        </div>
        <h3 className="text-lg font-semibold text-discord-onPrimary mb-2">
          Drag & drop your image here
        </h3>
        <p className="text-discord-inkMuted text-sm mb-6 text-center max-w-sm">
          Supports JPG, PNG, WebP. Maximum file size 10MB.
        </p>

        <input
          id="file-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileInput}
        />

        <button className="btn-primary px-6">
          Browse Files
        </button>
      </div>
    </div>
  );
}
