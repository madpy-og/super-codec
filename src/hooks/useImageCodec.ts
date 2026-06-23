import { useState, useEffect } from 'react';
import { compressImage } from '../utils/compressImage';
import { ImageFileSchema } from '../schemas/codecSchemas';
import { z } from 'zod';

export function useImageCodec() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);

  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [compressedPreview, setCompressedPreview] = useState<string | null>(null);

  const [quality, setQuality] = useState<number>(80);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);

  const handleFileSelect = (file: File) => {
    try {
      ImageFileSchema.parse(file);
      setOriginalFile(file);
      const previewUrl = URL.createObjectURL(file);
      setOriginalPreview(previewUrl);
      setCompressedFile(null);
      setCompressedPreview(null);
      setQuality(80);
    } catch (error) {
      if (error instanceof z.ZodError) {
        alert(error.issues[0].message);
      }
    }
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

  return {
    originalFile,
    originalPreview,
    compressedFile,
    compressedPreview,
    quality,
    setQuality,
    isCompressing,
    handleFileSelect,
    handleReset,
  };
}
