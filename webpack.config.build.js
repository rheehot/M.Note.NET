 const merge = require('webpack-merge');
 const baseConfig = require('./webpack.config');
 const webpackBuildConfig = merge(baseConfig, {
     output: {
         path: __dirname + "/docs",
         //  publicPath: "/Note.NET"
     },
 });
 module.exports = webpackBuildConfig