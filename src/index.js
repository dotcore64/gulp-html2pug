const through = require('through2');
const html2pug = require('html2pug');
const vinylToString = require('vinyl-contents-tostring');
const asCallback = require('standard-as-callback').default;
const PluginError = require('plugin-error');

const PLUGIN_NAME = 'gulp-html2pug';

const convert = (file) => (pug) => Object.assign(file, {
  contents: file.isBuffer()
    ? Buffer.from(pug)
    : file.isStream()
      ? through().end(pug)
      : throw new PluginError(PLUGIN_NAME, 'Invalid file'),
  extname: '.pug',
});

// plugin level function (dealing with files)
module.exports = (options = {}) => through.obj(function (file, enc, cb) {
  asCallback(vinylToString(file, enc)
    .then((html) => html2pug(html, options))
    .then(convert(file.clone()))
    .then(this.push.bind(this)), cb);
});
