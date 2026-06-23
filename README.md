# 🗜️ Super Compressor - Premium Client-Side Image Compression

[![Vite](https://img.shields.io/badge/Frontend-Vite%20%2B%20React%2019-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS%20v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Image Compression](https://img.shields.io/badge/Core-browser--image--compression-brightgreen)](https://www.npmjs.com/package/browser-image-compression)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?logo=vercel&logoColor=white)](https://super-compressor-blond.vercel.app/)

🚀 **Live Demo:** [super-compressor-blond.vercel.app](https://super-compressor-blond.vercel.app/)

**Super Compressor** is a modern, premium Single Page Application (SPA) designed to reduce image file sizes without sacrificing visual quality. Built entirely on the client-side, the platform ensures 100% privacy because your images never leave your browser—all processing is handled securely by your device's CPU.

Leveraging the power of **browser-image-compression** and wrapped in a stunning, Discord-inspired dark mode UI, Super Compressor delivers a seamless, lightning-fast, and highly intuitive media optimization experience.

---

## ✨ Key Features

- **🔒 Zero Server Processing (100% Privacy)**
  All image compression is performed entirely in your browser. No images are uploaded to external servers, guaranteeing complete privacy and security for your sensitive media.
- **🎚️ Interactive Quality Control**
  Adjust the compression quality via a real-time slider to find the perfect balance between file size and visual fidelity.
- **🔍 1:1 Pixel-Perfect Comparison**
  Features a built-in interactive comparison slider (Before vs After) that displays images at their true resolution (`object-none`), allowing you to accurately judge compression artifacts.
- **⚡ Blazing Fast Performance**
  Powered by Vite and React 19, the UI reacts instantly to your drag-and-drop actions and parameter adjustments.
- **📱 Fully Responsive Design**
  A premium, mobile-friendly interface tailored with Tailwind CSS v4 to look stunning on both desktop monitors and vertical smartphone screens.

---

## 🛠️ Tech Stack & Architecture

Super Compressor adopts a modern, lightweight, client-side only architecture:

### 💻 Frontend (Client)
| Technology | Description |
| :--- | :--- |
| **React 19 & TypeScript** | Declarative UI library with strict static typing for robust, error-free development. |
| **Vite 8** | Ultra-fast build tool and development server. |
| **Tailwind CSS v4** | Utility-first CSS framework used to build the custom "Discord-inspired" dark mode design system. |
| **browser-image-compression** | Core library handling the complex algorithms to shrink image files natively via Web Workers. |
| **Lucide React** | Clean, modern, and lightweight SVG icon library. |

---

## 🚀 Getting Started

Follow these steps to run Super Compressor locally on your machine:

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
