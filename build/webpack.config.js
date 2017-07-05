var webpack = require("webpack");
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var HtmlwebpackPlugin = require("html-webpack-plugin");
// 项目根路径
var ROOT_PATH = path.resolve(__dirname, ("../"));
// 项目源码路径
var SRC_PATH = ROOT_PATH + "/src";
// 产出路径
var DIST_PATH = ROOT_PATH + "/dist";
// node_modules
var NODE_MODULES_PATH =  ROOT_PATH + '/node_modules';
// 是否是开发环境
var __DEV__ = process.env.NODE_ENV !== "production";
// 使用缓存 var CACHE_PATH = ROOT_PATH + "/cache";

var args = process.argv;
var uglify = args.indexOf('--uglify') > -1;

var config = {
  context: SRC_PATH,
  entry: {
    app: [ SRC_PATH + "/pages/app.js"],
    lib: [ "react", "react-dom", "react-router","redux", "react-redux", "redux-thunk"]
  },
  output: {
    path: DIST_PATH,
    filename: __DEV__ ? 'js/[name].js' : 'js/[name].[chunkhash].js',
    chunkFilename: __DEV__ ? 'js/[name].js' : 'js/[name].[chunkhash].js'
  },
  module: {},
  resolve: {
    // alias: alias
  },
  plugins: [
    new webpack.DefinePlugin({
      // http://stackoverflow.com/questions/30030031/passing-environment-dependent-var
      // iables-in-webpack
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
    }),
    // 根据文件内容生成 hash
    new WebpackMd5Hash(),
    new webpack.optimize.CommonsChunkPlugin({name:"lib", filename: "js/lib.js"}),
  ]
};

// 使用缓存
var CACHE_PATH = ROOT_PATH + "/cache";
// loaders
config.module.loaders = [];
// 使用 babel 编译 jsx、es6
config.module.loaders.push({
  test: /\.js$/,
  exclude: /node_modules/,
  loaders: ['babel-loader?' +
    'presets[]=es2015,' +
    'presets[]=react'],
  });
// 编译 sass
if (__DEV__) {
  config.module.loaders.push({
    test: /\.(scss|css)$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader']
  });
} else {
  config.module.loaders.push({
    test: /\.(scss|css)$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
  });
  config.plugins.push(
    new ExtractTextPlugin('css/[name].[contenthash].css')
  );
}

// 图片路径处理，压缩
config.module.loaders.push({
  test: /\.(?:jpg|gif|png|svg)$/,
  loaders: [
    'url-loader?limit=0&name=img/[hash].[ext]',
    'image-webpack-loader'
  ]
});
// 压缩 js, css
if (uglify) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  );
}
// 去掉重复模块
if (!__DEV__) {
  config.plugins.push(
    new webpack.optimize.DedupePlugin()
  );
}
config.plugins.push(
  new HtmlwebpackPlugin({
    filename: 'index.html',
    chunks: ['app', 'lib'],
    template: SRC_PATH + '/pages/app.html',
    minify: __DEV__ ? false : {
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeComments: true
    }
  })
);
module.exports = config;
