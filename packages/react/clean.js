const globby = require('globby');
const rimraf = require('rimraf');

globby([
  '*',
  '!src',
  '!node_modules',
  '!clean.js',
  '!package-lock.json',
  '!package.json',
  '!README.md',
  '!webpack.config.js',
]).then(paths => paths.map(item => rimraf.sync(item)));
