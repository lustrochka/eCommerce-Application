/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EslintPlugin = require('eslint-webpack-plugin');

const baseConfig = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    assetModuleFilename: 'assets/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: 'ts-loader',
      },
      {
        test: /\.html$/i,
        use: {
          loader: 'html-loader',
          options: { minimize: true },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin(),
    new EslintPlugin({ extensions: 'ts' }),
    new CleanWebpackPlugin(),
  ],
  stats: {
    children: true,
  },
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');
  return merge(baseConfig, envConfig);
};
