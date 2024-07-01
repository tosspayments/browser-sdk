import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { dts } from 'rollup-plugin-dts';

import pkg from './package.json';

export default [
  {
    input: 'src/index.ts',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      typescript(),
      commonjs(),
      babel({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env', '@babel/preset-typescript'],
      }),
    ],
  },
  {
    input: 'src/index.ts',
    output: { dir: 'types' },
    plugins: [
      dts({
        respectExternal: true,
        compilerOptions: {
          removeComments: true
        }
      }),
    ]
  }
];
