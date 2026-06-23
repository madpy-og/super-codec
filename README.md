# 🗜️ Super Codec - Premium Client-Side Media Toolkit

[![Vite](https://img.shields.io/badge/Frontend-Vite%20%2B%20React%2019-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS%20v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![FFmpeg WASM](https://img.shields.io/badge/Core-FFmpeg%20WASM-blue)](https://ffmpegwasm.netlify.app/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?logo=vercel&logoColor=white)](https://super-codec.vercel.app/)

🚀 **Live Demo:** [super-codec.vercel.app](https://super-codec.vercel.app/)

**Super Codec** is a modern, premium Single Page Application (SPA) designed as an all-in-one media toolkit. It allows you to reduce image, audio, and video file sizes without sacrificing quality, and includes a secure Steganography feature to hide secret messages inside images. 

Built entirely on the client-side, the platform ensures **100% privacy** because your media files never leave your browser—all processing is handled securely by your device's CPU and WebAssembly.

Leveraging the power of **browser-image-compression**, **FFmpeg (WASM)**, and strict schema validation with **Zod**, all wrapped in a stunning, Discord-inspired dark mode UI, Super Codec delivers a seamless, lightning-fast, and highly intuitive media optimization experience.

---

## ✨ Key Features

- **🔒 Zero Server Processing (100% Privacy)**
  All media processing (image/audio/video compression and steganography) is performed entirely in your browser. No files are ever uploaded to external servers, guaranteeing complete privacy and security for your sensitive media.
- **📸 Advanced Image Codec**
  Adjust the compression quality via a real-time slider to find the perfect balance between file size and visual fidelity. Includes a 1:1 pixel-perfect comparison slider (Before vs After) to accurately judge compression artifacts.
- **🎥 Audio & Video Codec**
  Powered by FFmpeg WASM, compress heavy MP4, WebM, MP3, and WAV files directly inside your browser. Features lightning-fast encoding presets optimized for the web.
- **🕵️ Steganography**
  Hide and extract secret text messages seamlessly inside image files. Securely share encrypted-like payloads visually without anyone noticing.
- **⚡ Blazing Fast Performance & Safety**
  Powered by Vite and React 19, the UI reacts instantly to your drag-and-drop actions. Zod schema validation ensures only safe, supported files and sizes are processed.
- **📱 Fully Responsive Design**
  A premium, mobile-friendly interface tailored with Tailwind CSS v4 to look stunning on both desktop monitors and vertical smartphone screens.

---

## 🛠️ Tech Stack & Architecture

Super Codec adopts a modern, lightweight, client-side only architecture:

### 💻 Frontend (Client)
| Technology | Description |
| :--- | :--- |
| **React 19 & TypeScript** | Declarative UI library with strict static typing for robust, error-free development. Component logic is separated into custom hooks. |
| **Vite 8** | Ultra-fast build tool and development server. |
| **Tailwind CSS v4** | Utility-first CSS framework used to build the custom "Discord-inspired" dark mode design system. |
| **browser-image-compression** | Core library handling the complex algorithms to shrink image files natively via Web Workers. |
| **@ffmpeg/ffmpeg** | WebAssembly implementation of FFmpeg used to compress audio and video files directly in the browser. |
| **Zod** | TypeScript-first schema validation to strictly enforce file types and maximum upload limits. |
| **Lucide React** | Clean, modern, and lightweight SVG icon library. |

---

## 🚀 Getting Started

Follow these steps to run Super Codec locally on your machine:

### 1. Prerequisites
Ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (or yarn/pnpm)

### 2. Installation

Clone the repository and install the dependencies:

```bash
# Install dependencies
npm install
```

### 3. Running the Development Server

Start the local Vite development server:

```bash
npm run dev
```
Navigate to `http://localhost:5173` in your browser.

### 4. Building for Production

To create an optimized production build:

```bash
npm run build
```
The compiled files will be generated in the `dist` directory. You can then serve them using any static hosting provider.
