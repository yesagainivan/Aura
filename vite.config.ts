import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        react()
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'Aura',
            // Default file names: aura.js, aura.umd.cjs
            fileName: 'index'
        },
        rollupOptions: {
            // Externalize deps that shouldn't be bundled
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM'
                }
            }
        }
    },
    test: {
        environment: 'happy-dom'
    }
});
