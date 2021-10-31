const through = require('through2');
const html2pug = require('html2pug');
const vinylToString = require('vinyl-contents-tostring');
const PluginError = require('plugin-error');
const { nodeify } = require('promise-toolbox');

const PLUGIN_NAME = 'gulp-html2pug';

const convert = (file) => (pug) => Object.assign(file, {
  contents: file.isBuffer()
    ? Buffer.from(pug)
    : file.isStream()
      ? through().end(pug)
      : throw new PluginError(PLUGIN_NAME, 'Invalid file'),
  extname: '.pug',
});

const transform = (options) => nodeify(
  (file, enc) => vinylToString(file, enc)
    .then(html2pug(?, options))
    .then(convert(file)),
);

module.exports = (options = {}) => through.obj(transform(options));
