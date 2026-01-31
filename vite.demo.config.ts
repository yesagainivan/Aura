import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'dist-demo', // Output to a separate folder
        emptyOutDir: true
    },
    base: '/Aura/' // Critical for GitHub Pages (repo name)
});
