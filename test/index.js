import File from 'vinyl';

import { readFileSync, createReadStream } from 'fs';
import { expect } from 'chai';
import { spy } from 'sinon';
import { pEvent } from 'p-event';
import vinylToString from 'vinyl-contents-tostring';

// https://github.com/import-js/eslint-plugin-import/issues/1649
// eslint-disable-next-line import/no-unresolved,node/no-missing-import
import html2pug from 'gulp-html2pug';

const convertedPug = `doctype html
html(lang='en')
  head
    meta(charset='UTF-8')
    title gulp-html2pug test
  body gulp html2pug test`;

describe('gulp-html2pug', () => {
  describe('in streaming mode', () => {
    it('should convert given html file', async () => {
      const cb = spy();

      // create the fake file
      const pugFile = new File({
        path: 'test/index.html',
        contents: createReadStream('test/index.html'),
      });

      // Create a prefixer plugin stream
      const converter = html2pug({ preserveLineBreaks: false });
      converter.end(pugFile);

      // wait for the file to come back out
      converter.on('data', cb);
      await pEvent(converter, 'end');

      expect(cb).to.have.been.calledOnce();
      const file = cb.firstCall.args[0];

      // make sure it came out the same way it went in
      expect(file.isStream()).to.equal(true);
      expect(file.basename).to.equal('index.pug');
      return expect(vinylToString(file)).to.become(convertedPug);
    });
  });

  describe('in buffering mode', () => {
    it('should convert given html file', async () => {
      const cb = spy();

      // create the fake file
      const pugFile = new File({
        path: 'test/index.html',
        contents: Buffer.from(readFileSync('test/index.html')),
      });

      // Create a prefixer plugin stream
      const converter = html2pug({ preserveLineBreaks: false });
      converter.end(pugFile);

      // wait for the file to come back out
      converter.on('data', cb);
      await pEvent(converter, 'end');

      expect(cb).to.have.been.calledOnce();

      const file = cb.firstCall.args[0];
      expect(file.isBuffer()).to.equal(true);
      expect(file.basename).to.equal('index.pug');
      expect(file.contents.toString()).to.equal(convertedPug);
    });
  });

  describe('html2pug options', () => {
    it('should use default options', async () => {
      const cb = spy();

      // create the fake file
      const pugFile = new File({
        path: 'test/index.html',
        contents: Buffer.from(readFileSync('test/index.html')),
      });

      // Create a prefixer plugin stream
      const converter = html2pug();
      converter.end(pugFile);

      converter.on('data', cb);
      await pEvent(converter, 'end');

      expect(cb).to.have.been.calledOnce();

      const file = cb.firstCall.args[0];
      expect(file.isBuffer()).to.equal(true);
      expect(file.basename).to.equal('index.pug');
      expect(file.contents.toString()).to.equal(`doctype html
html(lang='en')
  head
    meta(charset='UTF-8')
    title gulp-html2pug test
  body.
    
    gulp html2pug test
    
    
    `);
    });

    it('should convert given html fragment file', async () => {
      const cb = spy();

      // create the fake file
      const pugFile = new File({
        path: 'test/fragment.html',
        contents: Buffer.from(readFileSync('test/fragment.html')),
      });

      // Create a prefixer plugin stream
      const converter = html2pug({ preserveLineBreaks: false, fragment: true });
      converter.end(pugFile);

      converter.on('data', cb);
      await pEvent(converter, 'end');

      expect(cb).to.have.been.calledOnce();

      const file = cb.firstCall.args[0];
      expect(file.isBuffer()).to.equal(true);
      expect(file.basename).to.equal('fragment.pug');
      expect(file.contents.toString()).to.equal('div foo');
    });
  });
});
