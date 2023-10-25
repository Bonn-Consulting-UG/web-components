import copy from 'rollup-plugin-copy'
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';

import summary from 'rollup-plugin-summary';
import typescript from '@rollup/plugin-typescript';

export default {
  plugins: [
    json(),
    typescript(),

    babel({ babelHelpers: 'bundled' }),
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
  },

};
