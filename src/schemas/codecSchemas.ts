import { z } from 'zod';

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_MEDIA_SIZE = 50 * 1024 * 1024; // 50MB (to prevent browser crashes)

export const ImageFileSchema = z.instanceof(File, { message: "Input must be a valid file" })
  .refine(file => file.type.startsWith('image/'), "File must be an image type (JPG, PNG, WebP, etc).")
  .refine(file => file.size <= MAX_IMAGE_SIZE, "Image size must be less than 10MB.");

export const AudioVideoFileSchema = z.instanceof(File, { message: "Input must be a valid file" })
  .refine(
    file => file.type.startsWith('audio/') || file.type.startsWith('video/'), 
    "File must be an audio or video type."
  )
  .refine(file => file.size <= MAX_MEDIA_SIZE, "Media size must be less than 50MB to process safely in browser.");

export const SteganoMessageSchema = z.string()
  .min(1, "Secret message cannot be empty")
  .max(5000, "Secret message is too long (max 5000 chars)");
