const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const ENV = process.env.npm_lifecycle_event;
const isDev = ENV === 'dev';
const isProd = ENV === 'build';

function setDevTool() {
  if (isDev) {
    return 'cheap-module-eval-source-map';
  } else {
    return 'none';
  }
}

function setDMode() {
  if (isProd) {
    return 'production';
  } else {
    return 'development';
  }
}

const config = {
  target: "web",
  entry: { index: './src/js/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    library: "card",
    libraryTarget: "umd"
  },
  mode: setDMode(),
  devtool: setDevTool(),
  module: {
    rules: [{
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: false
          }
        }]
      },
      {
        test: /\.js$/,
        use: ['babel-loader' /*, 'eslint-loader' */],
        exclude: [
          /node_modules/
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: './postcss.config.js' } }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: './postcss.config.js' } }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/images',
              name: '[name].[ext]'
            }}          
        ]
      },
      {
        test: /.(mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/audio',
              name: '[name].[ext]'
            }
        }]
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'fonts'
          }
        }]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),    
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/assets', to: './assets/' },
        { from: './src/assets/images', to: './assets/images/' },
        { from: './src/assets/audio', to: './assets/audio/' }
      ]
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    overlay: true,
    stats: 'errors-only',
    clientLogLevel: 'none'
  }
}


module.exports = config;
