// Load the node-import first.
require('node-import');

var PSD = require('psd');
var Imagemin = require('imagemin');
var fs = require("fs");

function getFilesizeInBytes(filename) {
 var stats = fs.statSync(filename);
 var fileSizeInBytes = stats.size;
 return fileSizeInBytes;
}


PSD.open('psd/faq.psd').then(function (psd) {
  return psd.image.saveAsPng('png/faq.png');
}).then(function () {
  console.log('Finished, now we compress!');
  console.log('Taille du png : ' + Math.round(getFilesizeInBytes('png/faq.png') / 1024) + ' Ko');

  new Imagemin()
    .src('png/*.png')
    .dest('png')
    .use(Imagemin.optipng({optimizationLevel: 3}))
    .run(function (err, files) {
        console.log(files[0] + ' done!');
        console.log('Nouvelle Taille du png : ' + Math.round(getFilesizeInBytes('png/faq.png') / 1024) + ' Ko');
        // => {path: 'build/images/foo.jpg', contents: <Buffer 89 50 4e ...>}
    });
});
