const webpack = require('webpack')
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebPackPlugin = require('html-webpack-plugin');
const __MARKDOWN_FILE_DIR = "./src/markdown";
const __markdownList = [];
const __markdownChunkGroup = {}
const __markdownChunkGroupOption = {chunks: "all", minSize:0, minChunks: 1, reuseExistingChunk: true, enforce: true};
// Read directory markdownFolderCategory 
require("fs").readdirSync(__MARKDOWN_FILE_DIR).forEach(categoryFolder=>{
    var mdList = [];
    require("fs").readdirSync(`${__MARKDOWN_FILE_DIR}/${categoryFolder}`)
        // Take only .md files
        .filter(filename => /\.md$/.test(filename))
        // Normalize file data.
        .map(filename => {
            console.log(filename)
            mdList.push({
                category : categoryFolder,
                filename: filename
            })
        });
    __markdownList.push({
        category : categoryFolder,
        mdList : mdList
    })
    __markdownChunkGroup[categoryFolder] = {
        name: categoryFolder,
         test: new RegExp('[\//]' + categoryFolder + '[\//]'),
        ...__markdownChunkGroupOption
    }
})
console.log(__markdownChunkGroup)
// console.log(__markdownList)
module.exports = {
    output: {
        path: __dirname + "/docs",
        publicPath: "/Note.NET",
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
            __markdownList__: JSON.stringify(__markdownList)
        })
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
        splitChunks: {
            // include all types of chunks
            cacheGroups:__markdownChunkGroup,
            cacheGroups:
        }
    }
};