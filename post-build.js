var fs = require('fs')

var cssContent = fs.readFileSync('./public/css/essential.css', 'utf-8');
var index = './public/index.html'

fs.readFile(index, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data
    .replace('/*essential*/', cssContent.replace(/\n\s{1,}/gim, ''))
    .replace('<link href="/css/style.css" rel="stylesheet">', '');


  fs.writeFile(index, result, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});
