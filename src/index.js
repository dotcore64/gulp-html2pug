import { callbackify } from 'util';
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

const transform = (options) => callbackify(
  (file, enc) => vinylToString(file, enc)
    .then(html2pug(?, options))
    .then(convert(file)),
);

export default (options = {}) => through.obj(transform(options));
