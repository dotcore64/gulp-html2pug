# gulp-html2pug

[![Build Status][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coverage Status][coveralls-badge]][coveralls]

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
  .pipe(html2pug(/* options for html2pug such as { fragment: true } */))
  .pipe(gulp.dest('pug'));
});
```

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).

[build-badge]: https://img.shields.io/github/workflow/status/dotcore64/gulp-html2pug/test/master?style=flat-square
[build]: https://github.com/dotcore64/gulp-html2pug/actions

[npm-badge]: https://img.shields.io/npm/v/gulp-html2pug.svg?style=flat-square
[npm]: https://www.npmjs.org/package/gulp-html2pug

[coveralls-badge]: https://img.shields.io/coveralls/dotcore64/gulp-html2pug/master.svg?style=flat-square
[coveralls]: https://coveralls.io/r/dotcore64/gulp-html2pug
