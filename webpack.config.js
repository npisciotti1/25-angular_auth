'use strict';

const dotenv = require('dotenv');
const webpack = require('webpack');
const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const production = process.env.NODE_ENV === 'production';
const sassVars = require('./app/scss/_vars.scss');

dotenv.load();

module.exports = {
  devtool: 'eval',
  entry: `${__dirname}/app/entry.js`,
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/build`
  },
  plugins: [
    new HTMLPlugin({
      template: `${__dirname}/app/index.html`
    }),
    new ExtractTextPlugin('bundle.css'),
    new webpack.DefinePlugin({
      'process.env': {
        '__API_URL__': JSON.stringify(process.env.API_URL),
        '__DEBUG__': JSON.stringify(!production)
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      }
    ]
  }
};
