var path = require("path");
var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");

module.exports = {
  entry : 'reduxstagram.js',
  output : {
    filename : 'bundle.js',
    path : __dirname 
  },
  module: {
      loaders: [
          { test: /\.js$/, loaders: ['babel?presets[]=es2015'], exclude: /node_modules/ }
      ]
  }
}
