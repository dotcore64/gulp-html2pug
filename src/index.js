import path from 'path';
import through from 'through2';
import html2pug from 'html2pug';
import vinylToString from 'vinyl-contents-tostring';
import { PluginError } from 'gulp-util';

// consts
const PLUGIN_NAME = 'gulp-html2pug';

// plugin level function (dealing with files)
function gulpHtml2pug() {
  // creating a stream through which each file will pass
  return through.obj(function (file, enc, cb) {
    const newFile = file.clone();

    vinylToString(file, enc)
    .then(html => html2pug(html))
    .then(pug => {
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
