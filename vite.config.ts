/// <reference types="vitest/config" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'unplugin-dts/vite';
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
		rolldownOptions: {
			external: ['react', /@mui\/.*/, 'use-resize-observer', 'react/jsx-runtime', 'clsx'],
			output: {
				codeSplitting: false,
				banner: '"use client";',
			},
			checks: {
				pluginTimings: false,
			},
		},
	},
	plugins: [
		react(),
		dts({
			bundleTypes: true,
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
		},
		dir: 'src',
	},
});
