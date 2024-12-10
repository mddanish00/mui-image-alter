/// <reference types="vitest/config" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
	publicDir: false,
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'mui-image-alter',
			fileName: 'index',
			formats: ['es', 'cjs'],
		},
		rollupOptions: {
			external: ['react', /@mui\/.*/, 'use-resize-observer', 'react/jsx-runtime', 'clsx'],
			output: {
				interop: 'auto',
				inlineDynamicImports: true,
				banner: '"use client";',
			},
		},
	},
	plugins: [
		react(),
		dts({
			rollupTypes: true,
			afterBuild: () => {
				fs.copyFileSync('dist/index.d.cts', 'dist/index.d.ts');
			},
		}),
	],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: 'jest-setup.ts',
		coverage: {
			provider: 'v8',
			all: false,
		},
	},
});
