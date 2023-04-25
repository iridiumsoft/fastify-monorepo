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
        platform: 'node',
        format: 'esm',
        splitting: true,
        treeShaking: true,
        sourcemap: false,
    })
})()
