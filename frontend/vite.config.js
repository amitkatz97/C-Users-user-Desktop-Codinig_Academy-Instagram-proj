import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TRUE } from 'sass'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    outDir:"../backend/public",
    emptyOutDir: TRUE
  }
})
