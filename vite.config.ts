import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        // lib configuration could go here in future
    },
    test: {
        environment: 'happy-dom'
    }
});
