import { useState } from 'react';
import { compressVideo, compressAudio } from '../utils/compressMedia';
import { AudioVideoFileSchema } from '../schemas/codecSchemas';
import { z } from 'zod';

export function useAudioVideoCodec() {
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<'audio' | 'video' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultFile, setResultFile] = useState<File | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    try {
      AudioVideoFileSchema.parse(selectedFile);
      setFile(selectedFile);
      if (selectedFile.type.startsWith('video/')) {
        setFileType('video');
      } else if (selectedFile.type.startsWith('audio/')) {
        setFileType('audio');
      }
      setResultUrl(null);
      setResultFile(null);
      setProgress(0);
    } catch (error) {
      if (error instanceof z.ZodError) {
        alert(error.issues[0].message);
      }
    }
  };

  const handleCompress = async () => {
    if (!file || !fileType) return;
    
    setIsProcessing(true);
    setProgress(0);
    
    try {
      let result;
      if (fileType === 'video') {
        result = await compressVideo(file, setProgress);
      } else {
        result = await compressAudio(file, setProgress);
      }
      setResultFile(result.file);
      setResultUrl(result.previewUrl);
    } catch (error) {
      console.error('Compression failed:', error);
      alert('Failed to compress media.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResultUrl(null);
    setResultFile(null);
    setFileType(null);
  };

  return {
    file,
    fileType,
    isProcessing,
    progress,
    resultUrl,
    resultFile,
    handleFileSelect,
    handleCompress,
    handleReset,
  };
}
