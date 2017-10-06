const path = require('path');
const recursiveReadSync = require('recursive-readdir-sync');

const components = recursiveReadSync(path.join(__dirname, 'src'));

const files = [];
const entries = {};
components.forEach(component => {
  if (component.split('.')[1] !== 'js') {
    return;
  }
  const file = component.split('.')[0];
  const name = file.replace(path.join(__dirname, 'src/'), '');
  files.push(file);
  entries[name] = file;
});

module.exports = {
  entry: entries,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname),
    libraryTarget: 'commonjs2'
  },
  externals: [
    (context, request, callback) => {
      // Do not treat icon files as external
      if (files.indexOf(request) > -1) {
        return callback(null, false);
      }
      if (/\.(png|jpg|jpeg|ico|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/.test(request)) {
        return callback(null, false);
      }
      // Treat all other files as external
      return callback(null, true);
    }
  ],
  module: {
    loaders: [
      {
        test: /\.js/,
        include: path.join(__dirname, 'src'),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0', 'react']
          }
        }]
      },
      {
        test: /\.(png|jpg|jpeg|ico|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      react: path.join(process.cwd(), 'node_modules/react')
    }
  }
};
