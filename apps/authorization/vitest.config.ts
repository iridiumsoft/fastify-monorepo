import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	mode: 'development',
	test: {
		globals: true,
		environment: 'node',
		testTimeout: 250000,
		hookTimeout: 200000,
		clearMocks: true
	},
	resolve: {
		alias: {
			'~': path.resolve(__dirname, './src')
		}
	}
});
