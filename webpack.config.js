const path = require('path')

module.exports = {
  mode: 'development',
  entry: './www/js/index.js',
  output: {
    path: path.resolve(__dirname, 'www'),
    filename: 'index.bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|mp3)$/,
        exclude: /node_modules/,
        use: 'url-loader'
      }
    ]
  }
}