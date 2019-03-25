 const merge = require('webpack-merge');
 const baseConfig = require('./webpack.config');
 const CleanWebpackPlugin = require('clean-webpack-plugin');
 const CopyWebpackPlugin = require('copy-webpack-plugin');


 const webpackBuildConfig = merge(baseConfig, {
     output: {
         path: __dirname + "/docs",
     },
     plugins: [
         new CleanWebpackPlugin({
             verbose: true
         }),
         new CopyWebpackPlugin([{
             from: './src/CNAME'
         }]),
     ]
 });
 module.exports = webpackBuildConfig