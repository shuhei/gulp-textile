var expect = require('chai').expect;
var textile = require('..');
var gutil = require('gulp-util');
var path = require('path');
var Stream = require('stream').Stream;

describe('gulp-textile', function () {
  it('compiles textile of buffer files', function (done) {
    var bufferFile = new gutil.File({
      path: path.resolve('hello.textile'),
      contents: new Buffer('h1. Hello, World!')
    });
    textile().on('data', function (file) {
      expect(file.contents.toString()).to.equal('<h1>Hello, World!</h1>');
      expect(path.basename(file.path)).to.equal('hello.html');
    }).on('end', done).end(bufferFile);
  });

  it('pass null files along', function (done) {
    var nullFile = new gutil.File();
    textile().on('data', function (file) {
      expect(file.isNull()).to.be.true;
      expect(file).to.equal(nullFile);
    }).on('end', done).end(nullFile);
  });

  it('emits plugin error for stream files', function (done) {
    var streamFile = new gutil.File({ contents: new Stream() });
    textile().on('error', function (err) {
      expect(err).to.be.an.instanceOf(gutil.PluginError);
      expect(err.plugin).to.be.eq('gulp-textile');
      done();
    }).end(streamFile);
  });
});
