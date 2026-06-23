import { useState } from 'react';
import { encodeMessage, decodeMessage } from '../utils/steganography';
import { ImageFileSchema, SteganoMessageSchema } from '../schemas/codecSchemas';
import { z } from 'zod';

export function useStegano() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [secretText, setSecretText] = useState('');
  const [decodedText, setDecodedText] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    try {
      ImageFileSchema.parse(selectedFile);
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResultImage(null);
      setDecodedText(null);
      setError(null);
    } catch (error) {
      if (error instanceof z.ZodError) {
        alert(error.issues[0].message);
      }
    }
  };

  const handleEncode = async () => {
    if (!file) return;
    try {
      SteganoMessageSchema.parse(secretText);
    } catch (e) {
      if (e instanceof z.ZodError) {
        setError(e.issues[0].message);
        return;
      }
    }
    setIsProcessing(true);
    setError(null);
    try {
      const result = await encodeMessage(file, secretText);
      setResultImage(result);
    } catch (err: any) {
      setError(err.toString());
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDecode = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);
    try {
      const text = await decodeMessage(file);
      setDecodedText(text);
    } catch (err: any) {
      setError(err.toString());
    } finally {
      setIsProcessing(false);
    }
  };

  const resetAll = () => {
    setFile(null);
    setPreview(null);
    setResultImage(null);
    setDecodedText(null);
    setError(null);
    setSecretText('');
  };

  return {
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
  };
}
