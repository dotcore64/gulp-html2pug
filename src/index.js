import Promise from 'bluebird';

import path from 'path';
import through from 'through2';
import html2pug from 'html2pug';
import streamToString from 'stream-to-string';
import { PluginError } from 'gulp-util';

// consts
const PLUGIN_NAME = 'gulp-html2pug';

function getHtml(file, enc) {
  if (file.isBuffer()) {
    return Promise.resolve(file.contents.toString(enc));
  } else if (file.isStream()) {
    return streamToString(file.contents);
  }

  throw new PluginError(PLUGIN_NAME, 'Invalid file');
}

// plugin level function (dealing with files)
function gulpHtml2pug() {
  // creating a stream through which each file will pass
  return through.obj(function (file, enc, cb) {
    const newFile = file.clone();

    getHtml(file, enc)
    .then(html => {
      const pug = html2pug(html);

      if (file.isBuffer()) {
        newFile.contents = new Buffer(pug);
      } else if (file.isStream()) {
        // start the transformation
        newFile.contents = through();
        newFile.contents.write(pug);
        newFile.contents.end();
      } else {
        throw new PluginError(PLUGIN_NAME, 'Invalid file');
      }

      const dirname = path.dirname(file.path);
      const basename = path.basename(file.path, path.extname(file.path));
      newFile.path = path.join(dirname, `${basename}.pug`);
      // make sure the file goes through the next gulp plugin
      this.push(newFile);
      cb();
    });
  });
}

// exporting the plugin main function
module.exports = gulpHtml2pug;
