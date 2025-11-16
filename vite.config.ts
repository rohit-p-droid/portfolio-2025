import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React
          vendor: ['react', 'react-dom'],
          // Router
          router: ['react-router-dom'],
          // Animation (separate to allow lazy loading)
          motion: ['framer-motion'],
          // Icons (large bundle)
          icons: ['react-icons/fa', 'react-icons/bi', 'react-icons/cg'],
          // Data fetching
          query: ['@tanstack/react-query'],
          // Markdown rendering
          markdown: ['react-markdown', 'remark-gfm', 'rehype-raw'],
          // Utilities
          utils: ['react-simple-typewriter']
        }
      }
    },
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2020',
    // Aggressive compression
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      'framer-motion',
      '@tanstack/react-query',
      'react-markdown',
      'react-simple-typewriter'
    ]
  },
  server: {
    hmr: {
      overlay: false
    }
  }
})
