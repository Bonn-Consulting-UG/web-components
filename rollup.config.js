import { copy } from '@web/rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import summary from 'rollup-plugin-summary';
import typescript from '@rollup/plugin-typescript';
import injectProcessEnv from 'rollup-plugin-inject-process-env';


import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.API_BASE_URL)

export default {
  plugins: [
    typescript(),
    resolve(),  
    injectProcessEnv({...process.env}),
    minifyHTML(),
    terser({
      ecma: 2020,
      module: true,
      warnings: true
    }),
    summary(),
    copy({
      patterns: ['.storybook/global.css'],
      output: { dir: './src' }
    })
  ],
  input: ['src/components/index.ts', 'src/compositions/index.ts'],
  output: {
    dir: 'dist'
  }
};
