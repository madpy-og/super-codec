import React, { useCallback, useState } from 'react';
import { UploadCloud, FileAudio, FileVideo } from 'lucide-react';

export type UploaderVariant = 'image' | 'audio' | 'video' | 'media';

interface UploaderProps {
  onFileSelect: (file: File) => void;
  variant?: UploaderVariant;
  label?: string;
  description?: string;
  accept?: string;
}

export function Uploader({
  onFileSelect,
  variant = 'image',
  label,
  description,
  accept
}: UploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const defaultConfig = {
    image: {
      accept: 'image/*',
      icon: <UploadCloud size={32} />,
      title: 'Drag & drop your image here',
      description: 'Supports JPG, PNG, WebP. Maximum file size 10MB.',
      typeCheck: (type: string) => type.startsWith('image/'),
      errorMessage: 'Please upload an image file'
    },
    audio: {
      accept: 'audio/*',
      icon: <FileAudio size={32} />,
      title: 'Drag & drop your audio here',
      description: 'Supports MP3, WAV, AAC, etc.',
      typeCheck: (type: string) => type.startsWith('audio/'),
      errorMessage: 'Please upload an audio file'
    },
    video: {
      accept: 'video/*',
      icon: <FileVideo size={32} />,
      title: 'Drag & drop your video here',
      description: 'Supports MP4, WebM, etc.',
      typeCheck: (type: string) => type.startsWith('video/'),
      errorMessage: 'Please upload a video file'
    },
    media: {
      accept: 'audio/*,video/*',
      icon: <UploadCloud size={32} />,
      title: 'Drag & drop your audio/video here',
      description: 'Supports MP3, MP4, WAV, WebM. Maximum file size 50MB',
      typeCheck: (type: string) => type.startsWith('audio/') || type.startsWith('video/'),
      errorMessage: 'Please upload an audio or video file'
    }
  };

  const currentConfig = defaultConfig[variant];

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = (file: File) => {
    if (currentConfig.typeCheck(file.type)) {
      onFileSelect(file);
    } else {
      alert(currentConfig.errorMessage);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  }, [onFileSelect, currentConfig]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  }, [onFileSelect, currentConfig]);

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
        <div className="bg-discord-surface1 p-4 rounded-full mb-4 text-discord-primary shadow-sm border border-discord-border">
          {currentConfig.icon}
        </div>
        <h3 className="text-lg font-semibold text-discord-onPrimary mb-2 text-center">
          {label || currentConfig.title}
        </h3>
        <p className="text-discord-inkMuted text-sm mb-6 text-center max-w-sm">
          {description || currentConfig.description}
        </p>

        <input
          id="file-upload"
          type="file"
          accept={accept || currentConfig.accept}
          className="hidden"
          onChange={handleFileInput}
        />

        <button className="btn-primary px-6 pointer-events-none">
          Browse Files
        </button>
      </div>
    </div>
  );
}
