var fs = require('fs');
var path = require('path');
var tarzan = require('../index.js');
var test = require('tape');
var tar = require('tar');
var through = require('through');
var readPath = path.join(__dirname, 'mock', 'read');
var writePath = path.join(__dirname, 'mock', 'write', 'pack.tar');


// test('packs a directory', function (t) {
//   var write = fs.createWriteStream(writePath);
//   var package = tarzan({
//     directory: readPath
//   });
  
//   package.pipe(write).on('end', function () {
//     t.ok(fs.statStync(writePath).isFile(), 'wrote the file');
//     t.end();
//   });  
// });