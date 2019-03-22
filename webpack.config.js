const webpack = require('webpack')
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebPackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const markdownConfig = require('./webpack.config.markdown');

const webpackBasicConfig = merge(markdownConfig, {
    output: {
        path: __dirname + "/docs",
        // publicPath: "/Note.NET",
        chunkFilename: '[name].bundle.js',
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: "vue-loader"
        }, {
            test: /\.js?$/,
            loader: 'babel-loader',
            exclude: /tus-js-client|node_modules\/(?!(dom7|ssr-window|vue-plugin-load-script)\/).*/
        }, {
            test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            exclude: /node_modules/,
            loader: 'file-loader?name=img/[path][name].[ext]&context=./app/images'
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        }, ]
    },
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.esm.js"
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebPackPlugin({
            favicon: './src/assets/favicon.ico',
            template: './src/index.html',
            filename: './index.html'
        }),
        new CopyWebpackPlugin([{
            from: './src/assets/favicon.ico'
        }, ])
    ],
    optimization: {
        minimize: true,
        namedModules: true,
        noEmitOnErrors: true,
        concatenateModules: true,
        mangleWasmImports: true,
        removeAvailableModules: true,
        removeEmptyChunks: true,
        mergeDuplicateChunks: true,
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: 1,
            minSize: 0,
            maxSize: 200,
        },
    }
});
module.exports = webpackBasicConfig;