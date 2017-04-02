const path = require('path')

module.exports = {
  target: 'electron-main',
  entry: './app/app.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public')
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {presets: ['es2015', 'react']}
      }
    ]
  }
}
