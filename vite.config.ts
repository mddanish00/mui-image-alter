/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { buildPlugin } from 'vite-plugin-build';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    buildPlugin({
      libBuild: {
        buildOptions: {
          rollupOptions: {
            external: ['react', /@mui\/.*/],
            output: {
              globals: {
                react: 'React',
                '@mui/material/CircularProgress': 'MaterialUI.CircularProgress',
                '@mui/material/SvgIcon': 'MaterialUI.SvgIcon',
                '@mui/material/styles/styled': 'MaterialUI.styled',
              },
            },
          },
          outDir: 'umd',
          sourcemap: 'hidden',
          lib: {
            entry: resolve(__dirname, 'src/index.js'),
            name: 'MuiImage',
            formats: ['umd'],
            fileName: () => `mui-image.js`,
          },
        },
      },
    }),
  ],
});
