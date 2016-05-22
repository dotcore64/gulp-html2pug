import File from 'vinyl';
import { PassThrough } from 'stream';

import path from 'path';
import es from 'event-stream';
import { expect } from 'chai';

import html2pug from '../src';

const convertedPug = `
meta
title
  | gulp-html2pug test
|  gulp html2pug test`;

describe('gulp-html2pug', () => {
  describe('in streaming mode', () => {
    it('should convert given html file', done => {
      // create the fake file
      const pugFile = new File({
        path: 'test/index.html',
        contents: new PassThrough(),
      });

      // Create a prefixer plugin stream
      const converter = html2pug();
      converter.write(pugFile);

      // wait for the file to come back out
      converter.once('data', file => {
        // make sure it came out the same way it went in
        expect(file.isStream()).to.equal(true);
        expect(path.basename(file.path)).to.equal('index.pug');

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
    it('should convert given html file', done => {
      // create the fake file
      const pugFile = new File({
        path: 'test/index.html',
        contents: new Buffer(''),
      });

      // Create a prefixer plugin stream
      const converter = html2pug();
      converter.write(pugFile);

      // wait for the file to come back out
      converter.once('data', file => {
        // make sure it came out the same way it went in
        expect(file.isBuffer()).to.equal(true);
        expect(path.basename(file.path)).to.equal('index.pug');

        // buffer the contents to make sure it got prepended to
        expect(file.contents.toString()).to.equal(convertedPug);
        done();
      });
    });
  });
});
