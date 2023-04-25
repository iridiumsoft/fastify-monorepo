import {buildSync}  from 'esbuild/lib/main'
import glob from 'tiny-glob'

(async function () {
  // Get all ts files
    const entryPoints = await glob('src/**/*.ts')
    buildSync({
        entryPoints,
        logLevel: 'info',
        outdir: 'build',
        bundle: true,
        minify: true,
        external: ['pg-native', 'fs'],
        platform: 'node',
        format: 'esm',
        splitting: true,
        treeShaking: true,
        sourcemap: false,
        banner:{
          js: `
          import path from 'path';
          import { fileURLToPath } from 'url';
          import { createRequire as topLevelCreateRequire } from 'module';
          const require = topLevelCreateRequire(import.meta.url);
          const __filename = fileURLToPath(import.meta.url);
          const __dirname = path.dirname(__filename);
          `
      },
    })
})()
