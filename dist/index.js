"use strict";

var _path = _interopRequireDefault(require("path"));

var _through = _interopRequireDefault(require("through2"));

var _html2pug = _interopRequireDefault(require("html2pug"));

var _vinylContentsTostring = _interopRequireDefault(require("vinyl-contents-tostring"));

var _pluginError = _interopRequireDefault(require("plugin-error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// consts
const PLUGIN_NAME = 'gulp-html2pug'; // plugin level function (dealing with files)

function gulpHtml2pug(options = {}) {
  // creating a stream through which each file will pass
  return _through.default.obj(function (file, enc, cb) {
    const newFile = file.clone();
    (0, _vinylContentsTostring.default)(file, enc).then(html => (0, _html2pug.default)(html, options)).then(pug => {
      if (file.isBuffer()) {
        newFile.contents = Buffer.from(pug);
      } else if (file.isStream()) {
        // start the transformation
        newFile.contents = (0, _through.default)();
        newFile.contents.end(pug);
      } else {
        throw new _pluginError.default(PLUGIN_NAME, 'Invalid file');
      }

      const dirname = _path.default.dirname(file.path);

      const basename = _path.default.basename(file.path, _path.default.extname(file.path));

      newFile.path = _path.default.join(dirname, `${basename}.pug`); // make sure the file goes through the next gulp plugin

      this.push(newFile);
      cb();
    });
  });
} // exporting the plugin main function


module.exports = gulpHtml2pug;