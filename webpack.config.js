const path = require('path')
module.exports = {
  entry: './src/js/index',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist/js')
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
}
