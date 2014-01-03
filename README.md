# tarzan
 
Package tarballs with options
 
## Install
 
```
npm install tarzan --save
```
 
## Usage
 
```js
var fs = require('fs');
var tarzan = require('tarzan');
var write = fs.createWriteStream('path/to/package.tar');

var package = tarzan({
  directory: 'path/to/somewhere',
  ignore: ['**/node_modules']
});

package.pipe(write);
```

## Options

* `directory` - the directory to package
* `ignore` - an array of file globs to skip when packaging files

## Run Tests
 
```
npm install
npm test
```