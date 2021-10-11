const esbuild = require('esbuild');
const sassPlugin = require('esbuild-plugin-sass')

esbuild.build({
  entryPoints: ['src/typescript/main.ts'],
  bundle: true,
  outfile: 'bundle.js',
  minify: true,
  plugins: [sassPlugin()],
}).catch((e) => console.error(e.message))