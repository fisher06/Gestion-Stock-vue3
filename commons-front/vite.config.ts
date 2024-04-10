import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VueDevTools(), dts()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'FrontCommons',
      // the proper extensions will be added
      fileName: 'front-commons'
    },
    rollupOptions: {
      external: ['vue', '@fortawesome/vue-fontawesome', '@fortawesome/free-solid-svg-icons'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
