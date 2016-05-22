# gulp-html2pug

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coverage Status][coveralls-badge]][coveralls]
[![Dependency Status][dependency-status-badge]][dependency-status]
[![devDependency Status][dev-dependency-status-badge]][dev-dependency-status]

> Convert html files to pug

## Install

```
$ npm install --save-dev gulp-html2pug
```


## Usage
Convert `index.html` to `pug/index.pug`:

```js
const gulp = require('gulp');
const html2pug = require('gulp-html2pug');

gulp.task('pug', function() {
  // Backend locales
  return gulp.src('index.html')
  .pipe(html2pug())
  .pipe(gulp.dest('pug'));
});
```

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).

[build-badge]: https://img.shields.io/travis/perrin4869/gulp-html2pug/master.svg?style=flat-square
[build]: https://travis-ci.org/perrin4869/gulp-html2pug

[npm-badge]: https://img.shields.io/npm/v/gulp-html2pug.svg?style=flat-square
[npm]: https://www.npmjs.org/package/gulp-html2pug

[coveralls-badge]: https://img.shields.io/coveralls/perrin4869/gulp-html2pug/master.svg?style=flat-square
[coveralls]: https://coveralls.io/r/perrin4869/gulp-html2pug

[dependency-status-badge]: https://david-dm.org/perrin4869/gulp-html2pug.svg?style=flat-square
[dependency-status]: https://david-dm.org/perrin4869/gulp-html2pug

[dev-dependency-status-badge]: https://david-dm.org/perrin4869/gulp-html2pug/dev-status.svg?style=flat-square
[dev-dependency-status]: https://david-dm.org/perrin4869/gulp-html2pug#info=devDependencies
