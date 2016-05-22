const Promise = require('bluebird');

const fs = require('fs');
const path = require('path');
const gutil = require('gulp-util');
const through = require('through2');
const html2pug = require('html2pug');

const PluginError = gutil.PluginError;

// consts
const PLUGIN_NAME = 'gulp-html2pug';

fs.readFileAsync = Promise.promisify(fs.readFile);


// plugin level function (dealing with files)
function gulpHtml2pug({ encoding = 'utf8' } = {}) {
  // creating a stream through which each file will pass
  return through.obj(function (file, enc, cb) {
    const newFile = file.clone();

    fs.readFileAsync(file.path, encoding)
    .then(html => {
      const pug = html2pug(html);

      if (file.isBuffer()) {
        newFile.contents = new Buffer(pug);
      } else if (file.isStream()) {
        // start the transformation
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
    })
    .asCallback(cb);
  });
}

// exporting the plugin main function
module.exports = gulpHtml2pug;
