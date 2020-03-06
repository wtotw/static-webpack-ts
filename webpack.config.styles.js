'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.common');
const config = require('./task/config');
const path = require('path');
const glob = require('glob');

// Plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// Define
const isProduction = process.env.NODE_ENV === 'production';

// エントリーファイルをディレクトリ構成ごと取得
const entry = {};

// CSSの対象
const cssFiles = glob.sync(`${config.path.src.root}styles/{common, pages}/**/index.+(sass|scss|css)`);
for (const file of cssFiles) {
  const key = file.replace(config.path.src.root, '').split(/\/index\.(sass|scss|css)/)[0];
  entry[key] = file;
}

module.exports = merge(common, {
  entry,
  module: {
    rules: [
      {
        test: /\.(sass|scss|css)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
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
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, config.path.dist.root, 'styles')]
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
                'Android >= 4'
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
    // CSSファイルの出力
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    }),
    // JSファイルの除去
    new FixStyleOnlyEntriesPlugin({
      extensions: ['sass', 'scss', 'css']
    }),
    // Stylelint
    new StylelintPlugin({
      files: [
        `${config.path.src.styles.lib}**/*`,
        `${config.path.src.styles.pages}**/*`
      ],
      syntax: 'scss'
    })
  ]
});
