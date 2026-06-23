import imageCompression from 'browser-image-compression';

export interface CompressOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  useWebWorker?: boolean;
  initialQuality?: number;
}

/**
 * Compresses an image file using browser-image-compression
 * @param file The original image file
 * @param quality Quality from 0 to 100
 * @param customOptions Additional options for compression
 * @returns A promise that resolves to the compressed File
 */
export async function compressImage(
  file: File, 
  quality: number, 
  customOptions?: CompressOptions
): Promise<{ file: File; previewUrl: string }> {
  try {
    const options = {
      maxSizeMB: 10,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      initialQuality: quality / 100,
      ...customOptions,
    };
    
    const compressedBlob = await imageCompression(file, options);
    const compressedFile = new File([compressedBlob], file.name, {
      type: compressedBlob.type,
    });
    
    const previewUrl = URL.createObjectURL(compressedBlob);
    
    return { file: compressedFile, previewUrl };
  } catch (error) {
    console.error('Error in compressImage utils:', error);
    throw error;
  }
}
