const webpack = require('webpack')
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MARKDOWN_FILE_DIR = "./src/markdown";
const markdownList = [];
// Read directory contents
require("fs").readdirSync(MARKDOWN_FILE_DIR)
    // Take only .md files
    .filter(filename => /\.md$/.test(filename))
    // Normalize file data.
    .map(filename => {
        console.log(filename)
        markdownList.push({
            filename: filename
        })
    });
console.log(markdownList)
module.exports = {
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
            loader: 'url-loader',
            options: {
                name: '[hash].[ext]',
            },
        }, {
            test: /\.md$/,
            use: [{
                loader: "html-loader"
            }, {
                loader: "markdown-loader"
            }]
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
            template: './src/index.html',
            filename: './index.html'
        }),
        new webpack.DefinePlugin({
            __markdownList__: JSON.stringify(markdownList)
        })
    ]
};