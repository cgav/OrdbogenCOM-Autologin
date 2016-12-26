const webpack = require('webpack');
const envs = require('./envs.json');

module.exports = {
  entry: {
    background: ['babel-polyfill', './src/background.js'],
    content: ['babel-polyfill', './src/content.js']
  },
  output: {
    path: './build',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /.json$/, loader: "json-loader" }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'UNILOGIN_USER': JSON.stringify(envs.UNILOGIN_USER),
      'UNILOGIN_PASS': JSON.stringify(envs.UNILOGIN_PASS)
    })
  ]
};
