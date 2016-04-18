const File = require('vinyl');
const PassThrough = require('stream').PassThrough;

const chai = require('chai');
const path = require('path');
const es = require('event-stream');

const html2pug = require('../dist');

const convertedPug = `
meta
title
  | gulp-html2pug test
|  gulp html2pug test`;

chai.should();

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
        file.isStream().should.equal(true);
        path.basename(file.path).should.equal('index.pug');

        // buffer the contents to make sure it got prepended to
        file.contents.pipe(es.wait((err, data) => {
          // check the contents
          data.toString().should.equal(convertedPug);
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
        file.isBuffer().should.equal(true);
        path.basename(file.path).should.equal('index.pug');

        // buffer the contents to make sure it got prepended to
        file.contents.toString().should.equal(convertedPug);
        done();
      });
    });
  });
});
