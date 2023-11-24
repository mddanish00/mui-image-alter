/// <reference types="vitest" />
/// <reference types="vite/client" />

import { resolve } from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

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
			external: ['react', /@mui\/.*/, 'use-resize-observer', 'react/jsx-runtime'],
			output: {
				interop: 'auto',
				inlineDynamicImports: true,
				banner: '"use client";'
			},
		},
	},
	plugins: [
		react(),
		dts({
			rollupTypes: true,
			insertTypesEntry: false,
			afterBuild: () => {
				fs.copyFileSync('dist/index.d.cts.d.ts', 'dist/index.d.cts');
				fs.copyFileSync('dist/index.d.cts.d.ts', 'dist/index.d.ts');
				fs.rmSync('dist/index.d.cts.d.ts');
			},
		}),
	],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: 'jest-setup.ts',
	},
});
