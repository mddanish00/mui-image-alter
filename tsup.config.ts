import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts', 'src/ts.ts'],
	format: ['esm', 'cjs'],
	dts: true,
	minify: true,
	banner: () => {
		return { js: '"use client";' };
	},
	cjsInterop: true,
});
