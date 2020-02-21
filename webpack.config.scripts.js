'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.common');
const config = require('./task/config');
const path = require('path');
const glob = require('glob');

// Plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

// Define
const isProduction = process.env.NODE_ENV === 'production';

// エントリーファイルをディレクトリ構成ごと取得
const entry = {};

// JS, Vueの対象
const jsFiles = glob.sync(`${config.path.src.scripts.pages}**/index.+(ts|tsx|vue)`);
for (const file of jsFiles) {
  const key = file.replace(config.path.src.root, '').split(/\/index\.(ts|tsx|vue)/)[0];
  entry[key] = file;
}

module.exports = merge(common, {
  entry,
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|ts|vue)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [
          {
            loader: 'vue-style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              // CSS内のurl()メソッドの取り込みを禁止する
              url: true,
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              // PostCSS側でもソースマップを有効にする
              sourceMap: true,
              plugins: [
                // ベンダープレフィックスを追加する(gridも有効)
                require('autoprefixer')({ grid: true })
              ]
            }
          },
          {
            loader: 'sass-loader'
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [`${path.resolve(__dirname, config.path.src.styles.common, 'partial/variables/**/*.scss')}`]
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimize: isProduction,
    minimizer: [
      new TerserPlugin({
        extractComments: 'all',
        cache: true
      })
    ]
  },
  plugins: [
    // distを削除
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, config.path.dist.root, 'scripts')]
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: ['default',
          {
            autoprefixer: {
              // autoprefixerによる vendor prefix の追加を行う
              add: true,
              // サポートするブラウザVersionの指定
              browsers: [
                'last 2 versions',
                'ie >= 11',
                'Android >= 5'
              ]
            },
            // ライセンスも含めて、コメントを全て削除する
            discardComments: { removeAll: true },
            // CSSの定義のソートを行う
            cssDeclarationSorter: { order: 'smacss' }
          }
        ]
      },
      canPrint: true
    }),
    // Vue Loader
    new VueLoaderPlugin()
  ]
});
