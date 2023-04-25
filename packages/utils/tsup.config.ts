import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
	entry: {
		encryption: 'src/encryption/index.ts',
	},
	sourcemap: false,
	clean: true,
	dts: false,
	watch: options.watch || false,
	treeshake: true,
	format: ['cjs', 'esm'],
	onSuccess: 'tsc --emitDeclarationOnly --declaration',
	minify: true
}));
