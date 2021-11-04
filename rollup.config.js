import babel from '@rollup/plugin-babel';
import pkg from './package.json';

const input = 'src/index.js';
const external = Object.keys(pkg.dependencies);
const plugins = [babel({ babelHelpers: 'bundled' })];

export default [{
  input,
  external,
  // sourcemaps help generate coverage reports for the actual sources using istanbul
  output: {
    file: 'dist/index.cjs',
    format: 'cjs',
    sourcemap: true,
    exports: 'default',
  },
  plugins,
}, {
  input,
  external,
  output: {
    file: 'dist/index.js',
    format: 'esm',
    sourcemap: true,
  },
  plugins,
}];
