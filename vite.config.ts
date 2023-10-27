/// <reference types="vitest" />
/// <reference types="vite/client" />

import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { buildPlugin } from 'vite-plugin-build';

// https://vitejs.dev/config/
export default defineConfig({
	publicDir: false,
	plugins: [
		react(),
		buildPlugin({
			fileBuild: {
				emitDeclaration: true,
				rollupOptionsOutput: { interop: 'auto' },
			},
			libBuild: {
				buildOptions: {
					rollupOptions: {
						external: ['react', /@mui\/.*/, 'use-resize-observer'],
						output: {
							globals: {
								react: 'React',
								'@mui/material/CircularProgress': 'MaterialUI.CircularProgress',
								'@mui/material/SvgIcon': 'MaterialUI.SvgIcon',
								'@mui/material/styles/styled': 'MaterialUI.styled',
								'use-resize-observer': 'UseResizeObserver',
							},
						},
					},
					outDir: 'umd',
					sourcemap: 'hidden',
					lib: {
						entry: resolve(__dirname, 'src/index.ts'),
						name: 'MuiImage',
						formats: ['umd'],
						fileName: () => `mui-image.js`,
					},
				},
			},
		}),
	],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: 'jest-setup.ts',
	},
});
