import through from 'through2';
import html2pug from 'html2pug';
import vinylToString from 'vinyl-contents-tostring';
import PluginError from 'plugin-error';

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
  vinylToString(file, enc)
    .then((html) => html2pug(html, options))
    .then(convert(file.clone()))
    .then((pugFile) => {
      this.push(pugFile);
      cb();
    });
});
