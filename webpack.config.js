'use strict';
const path = require('path');

module.exports = {
  entry: {app: './index.jsx'},
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'static')
  },
  module: {
     // configuration regarding modules
     rules: [
       // rules for modules (configure loaders, parser options, etc.)
       {
         test: /\.jsx?$/,
         loader: "babel-loader"
       }
     ]
   }
};
