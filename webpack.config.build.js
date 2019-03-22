 const merge = require('webpack-merge');
 const baseConfig = require('./webpack.config');
 const CleanWebpackPlugin = require('clean-webpack-plugin');
 const webpackBuildConfig = merge(baseConfig, {
     output: {
         path: __dirname + "/docs",
         //  publicPath: "/Note.NET"
     },
     plugins: [
         new CleanWebpackPlugin({
             verbose: true
         }),
     ]
 });
 module.exports = webpackBuildConfig