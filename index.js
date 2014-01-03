var fs = require('fs');
var tar = require('tar');
var zlib = require('zlib');
var Ignore = require('fstream-ignore');

var tarzan = function (options) {
  var ignore = options.ignore || [];
  
  if (!options.directory) throw new Error('Directory required');
  
  // Pipe app directory into tar.gz stream
  // We keep track of files by name as they
  // are packed into the stream.
  var reader = Ignore({
    path: options.directory,
    type: 'Directory',
    ignoreFiles: ignore
  });
  
  return reader
    .pipe(tar.Pack({
      pathFilter: function(path) {
        return path.replace(options.directory + '/', '');     
      }
    }))
    .pipe(zlib.Gzip());
};

module.exports = tarzan;