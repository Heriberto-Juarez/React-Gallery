import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import image from '@rollup/plugin-image';
import commonjs from '@rollup/plugin-commonjs'
import classNames from 'classnames'
export default [
   {
       input: './src/index.js',
       output: [
           {
               file: './dist/index.js',
               format: 'cjs' // Common js
           },
           {
               file: 'dist/index.es.js',
               format: 'es',
               exports: 'named'
           }
       ],
       plugins: [
            commonjs({
                include: /node_modules/,
                namedExports: {
                    'classNames': Object.keys(classNames),
                }
            }),
            postcss({
               plugins: [],
               minimize: true,
            }),
            babel({
                exclude: 'node_modules/**',
                presets: [
                    "@babel/preset-env",
                    ["@babel/preset-react", {"runtime": "automatic"}],
                ]
            }),
           external(),
           resolve(),
           terser(),
           image(),
       ]
   }
]
