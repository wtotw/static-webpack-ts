'use strict';

const webpack = require('webpack');
const config = require('./task/config');
const path = require('path');

// Plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// Define
const mode = process.env.NODE_ENV || 'development';
const isProduction = process.env.NODE_ENV === 'production';
console.log(`mode: ${mode}`);

module.exports = {
  mode,
  devtool: !isProduction ? 'source-map' : false,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.vue'],
    alias: {
      '@scripts': path.resolve(__dirname, 'src/scripts/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@img': path.resolve(__dirname, 'src/img/'),
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    // distを削除
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, config.path.dist.img), path.resolve(__dirname, config.path.dist.html)]
    }),
    // ファイルコピー
    new CopyPlugin([
      {
        from: `${config.path.src.img}`,
        to: 'img'
      },
      {
        from: `${config.path.src.html}`,
        to: 'html'
      }
    ],
    {
      copyUnmodified: true
    })
  ]
}