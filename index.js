var fs = require('fs');
var tar = require('tar');
var zlib = require('zlib');
var Ignore = require('fstream-ignore');
var path = require('path');
var through = require('through');

module.exports = function (options) {
  var ignore = options.ignore || [];
  
  if (!options.directory) throw new Error('Directory required');
  
  // Pipe app directory into tar.gz stream
  // We keep track of files by name as they
  // are packed into the stream.
  var reader = Ignore({
    path: options.directory,
    type: 'Directory'
  });
  
  reader.addIgnoreRules(ignore);
  
  var packed = through();
  
  reader
    .pipe(tar.Pack({
      pathFilter: function(pathname) {
        var p = pathname.replace(path.join(options.directory, '/'), '');     
        
        if (!fs.lstatSync(pathname).isDirectory()) {
          packed.emit('file', {
            full: pathname,
            relative: p
          });
        }
        
        return p;
      }
    }))
    .pipe(zlib.Gzip())
    .pipe(packed);
    
  return packed;
};