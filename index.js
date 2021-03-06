var through = require('through2').obj;
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var textile = require('textile-js');

module.exports = function (options) {
  function transform(file, enc, cb) {
    var self = this;

    function doNothing() {
      self.push(file);
      cb();
    }

    function emitError(message) {
      var error = new PluginError('gulp-textile', message);
      self.emit('error', error);
      cb();
    }

    if (file.isNull()) {
      return doNothing();
    }

    if (file.isStream()) {
      return emitError('Stream is not supported');
    }

    var html;
    try {
      html = textile(file.contents.toString(), options);
    } catch (e) {
      return emitError(err);
    }

    file.contents = new Buffer(html);
    file.path = gutil.replaceExtension(file.path, '.html');

    self.push(file);
    cb();
  }

  return through(transform);
}
