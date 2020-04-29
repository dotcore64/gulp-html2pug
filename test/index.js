import File from 'vinyl';
import { PassThrough } from 'stream';

import { basename } from 'path';
import es from 'event-stream';
import { readFileSync } from 'fs';
import { expect } from 'chai';

import html2pug from '../src';

const convertedPug = `doctype html
html(lang='en')
  head
    meta(charset='UTF-8')
    title gulp-html2pug test
  body gulp html2pug test`;

describe('gulp-html2pug', () => {
  describe('in streaming mode', () => {
    it('should convert given html file', (done) => {
      // create the fake file
      const pugFile = new File({
        path: 'test/index.html',
        contents: new PassThrough(),
      });
      pugFile.contents.write(readFileSync('test/index.html'));
      pugFile.contents.end();

      // Create a prefixer plugin stream
      const converter = html2pug({ preserveLineBreaks: false });
      converter.write(pugFile);

      // wait for the file to come back out
      converter.once('data', (file) => {
        // make sure it came out the same way it went in
        expect(file.isStream()).to.equal(true);
        expect(basename(file.path)).to.equal('index.pug');

        // buffer the contents to make sure it got prepended to
        file.contents.pipe(es.wait((err, data) => {
          // check the contents
          expect(data.toString()).to.equal(convertedPug);
          done();
        }));
      });
    });
  });

  describe('in buffering mode', () => {
    it('should convert given html file', (done) => {
      // create the fake file
      const pugFile = new File({
        path: 'test/index.html',
        contents: Buffer.from(readFileSync('test/index.html')),
      });

      // Create a prefixer plugin stream
      const converter = html2pug({ preserveLineBreaks: false });
      converter.write(pugFile);

      // wait for the file to come back out
      converter.once('data', (file) => {
        // make sure it came out the same way it went in
        expect(file.isBuffer()).to.equal(true);
        expect(basename(file.path)).to.equal('index.pug');

        // buffer the contents to make sure it got prepended to
        expect(file.contents.toString()).to.equal(convertedPug);
        done();
      });
    });
  });

  describe('html2pug options', () => {
    it('should convert given html fragment file', (done) => {
      // create the fake file
      const pugFile = new File({
        path: 'test/fragment.html',
        contents: Buffer.from(readFileSync('test/fragment.html')),
      });

      // Create a prefixer plugin stream
      const converter = html2pug({ preserveLineBreaks: false, fragment: true });
      converter.write(pugFile);

      // wait for the file to come back out
      converter.once('data', (file) => {
        // make sure it came out the same way it went in
        expect(file.isBuffer()).to.equal(true);
        expect(basename(file.path)).to.equal('fragment.pug');

        // buffer the contents to make sure it got prepended to
        expect(file.contents.toString()).to.equal('div foo');
        done();
      });
    });
  });
});
