const path = require('path')
const webpack = require('webpack')

module.exports = {
  target: 'electron-main',
  entry: './app/app.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'build')
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
