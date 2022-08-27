import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { buildPlugin } from 'vite-plugin-build';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		buildPlugin({
			fileBuild: {
				emitDeclaration: true,
			},
			libBuild: {
				buildOptions: {
					rollupOptions: {
						external: [
							'react',
							'@mui/material',
							'@emotion/react',
							'@emotion/styled',
						],
						output: {
							globals: {
								react: 'React',
								'@mui/material': 'MaterialUI',
								'@emotion/react': 'emotionReact',
								'@emotion/styled': 'emotionStyled',
							},
						},
					},
					lib: {
						entry: resolve(__dirname, 'src/index.ts'),
						name: 'MuiImage',
						fileName: (format) => `mui-image.${format}.js`,
					},
				},
			},
		}),
	],
});
