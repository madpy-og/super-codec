import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

let ffmpeg: FFmpeg | null = null;
let globalOnProgress: ((progress: number) => void) | null = null;

export async function initFFmpeg() {
  if (ffmpeg) return ffmpeg;

  ffmpeg = new FFmpeg();

  ffmpeg.on('progress', ({ progress }) => {
    if (globalOnProgress) {
      let p = progress;
      if (typeof p !== 'number' || isNaN(p)) return;
      if (p < 0) p = 0;
      if (p > 1) p = 1;
      globalOnProgress(Math.round(p * 100));
    }
  });

  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';

  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  });

  return ffmpeg;
}

export async function compressVideo(
  file: File,
  onProgress: (progress: number) => void
): Promise<{ file: File; previewUrl: string }> {
  const ffmpegInstance = await initFFmpeg();
  globalOnProgress = onProgress;

  const inputName = file.name;
  const outputName = `compressed_${file.name}`;

  await ffmpegInstance.writeFile(inputName, await fetchFile(file));

  // Compress video: CRF 28, fast preset, scale to 720p width
  await ffmpegInstance.exec([
    '-i', inputName,
    '-vcodec', 'libx264',
    '-crf', '28',
    '-preset', 'fast',
    '-vf', 'scale=1280:-2',
    outputName
  ]);

  const data = await ffmpegInstance.readFile(outputName);
  const blob = new Blob([new Uint8Array(data as any)], { type: 'video/mp4' });
  const compressedFile = new File([blob], outputName, { type: 'video/mp4' });

  return {
    file: compressedFile,
    previewUrl: URL.createObjectURL(blob)
  };
}

export async function compressAudio(
  file: File,
  onProgress: (progress: number) => void
): Promise<{ file: File; previewUrl: string }> {
  const ffmpegInstance = await initFFmpeg();
  globalOnProgress = onProgress;

  const inputName = file.name;
  const outputName = `compressed_${file.name.replace(/\.[^/.]+$/, "")}.mp3`;

  await ffmpegInstance.writeFile(inputName, await fetchFile(file));

  // Compress audio: lower bitrate
  await ffmpegInstance.exec([
    '-i', inputName,
    '-b:a', '64k',
    outputName
  ]);

  const data = await ffmpegInstance.readFile(outputName);
  const blob = new Blob([new Uint8Array(data as any)], { type: 'audio/mp3' });
  const compressedFile = new File([blob], outputName, { type: 'audio/mp3' });

  return {
    file: compressedFile,
    previewUrl: URL.createObjectURL(blob)
  };
}
