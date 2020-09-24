const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const IncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const styleLoader = [
  {
    loader: MiniCssExtractPlugin.loader,
  },
  'css-loader?sourceMap',
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: [
        require('postcss-preset-env')({
          autoprefixer: {
            flexbox: 'no-2009',
          },
          stage: 3,
        }),
      ],
    },
  },
  'sass-loader?sourceMap',
];

module.exports = {
  mode: 'production',
  bail: true, // Stop compilation early in production
  devtool: 'source-map',
  entry: {
    app: ['@babel/polyfill', path.resolve(__dirname, 'src/index.js')],
    auth: path.resolve(__dirname, 'src/services/adal/redirect_page/auth.js'),
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'build/dist'),
    pathinfo: false,
    publicPath: '/',
    filename: '[name].[contenthash].js',
  },
  externals: {
    'app-config': 'APP_CONFIG',
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: false,
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        APP_VERSION: JSON.stringify(require('./package.json').version),
        APP_TIME_STAMP: JSON.stringify(Date.now()),
      },
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new HtmlWebPackPlugin({
      template: 'src/index.ejs',
      chunks: ['app', 'unsupported'],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
      filename: 'index.html',
      favicon: 'src/favicon.ico',
    }),
    new HtmlWebPackPlugin({
      template: 'src/services/adal/redirect_page/auth.ejs',
      chunks: ['auth'],
      favicon: 'src/favicon.ico',
      inject: true,
      filename: 'auth.html',
    }),
    new IncludeAssetsPlugin({
      assets: ['app.config.js'],
      append: false,
      hash: true,
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        cache: true,
        parallel: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  module: {
    strictExportPresence: true,
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.html$/, use: { loader: 'html-loader' } },
      { test: /\.glsl$/, exclude: /node_modules/, loader: 'webpack-glsl-loader' },
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader' },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]',
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=[name].[ext]',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]',
      },
      { test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader?name=[name].[ext]' },
      { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' },
      { test: /(\.css|\.scss|\.sass)$/, use: styleLoader },
    ],
  },
};
