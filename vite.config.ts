import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
//import dts from 'vite-plugin-dts';
import { buildPlugin } from 'vite-plugin-build';

// https://vitejs.dev/config/
export default defineConfig({
	// build: {
	// 	lib: {
	// 		entry: resolve(__dirname, 'src/index.ts'),
	// 		name: 'MuiImage',
	// 		formats: ['es', 'umd', 'cjs'],
	// 		fileName: (format) => `mui-image.${format}.js`,
	// 	},
	// 	rollupOptions: {
	// 		// make sure to externalize deps that shouldn't be bundled
	// 		// into your library
	// 		external: ['react', '@mui/material', '@emotion/react', '@emotion/styled'],
	// 		output: {
	// 			// Provide global variables to use in the UMD build
	// 			// for externalized deps
	// 			globals: {
	// 				react: 'React',
	// 				'@mui/material': 'MaterialUI',
	// 				'@emotion/react': 'emotionReact',
	// 				'@emotion/styled': 'emotionStyled',
	// 			},
	// 		},
	// 	},
	// },
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
