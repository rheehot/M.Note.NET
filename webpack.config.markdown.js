const webpack = require('webpack')
const __MARKDOWN_FILE_DIR = "./src/markdown";
const __markdownList = [];
const __markdownChunkGroup = {}
const __markdownChunkGroupOption = {
    chunks: "all",
    minSize: 0,
    minChunks: 1,
    reuseExistingChunk: true,
    enforce: true
};
// Read directory markdownFolderCategory 
require("fs").readdirSync(__MARKDOWN_FILE_DIR).forEach(categoryFolder => {
    var mdList = [];
    require("fs").readdirSync(`${__MARKDOWN_FILE_DIR}/${categoryFolder}`)
        // Take only .md files
        .filter(filename => /\.md$/.test(filename))
        // Normalize file data.
        .map(filename => {
            console.log(filename)
            mdList.push({
                category: categoryFolder,
                filename: filename
            })
        });
    __markdownList.push({
        category: categoryFolder,
        mdList: mdList
    })
    __markdownChunkGroup[categoryFolder] = {
        name: categoryFolder,
        test: new RegExp('[\\\\/]' + categoryFolder + '[\\\\/]'),
        ...__markdownChunkGroupOption
    }
})

module.exports = {
    module: {
        rules: [{
            test: /\.js?$/,
            loader: 'babel-loader',
            exclude: /tus-js-client|node_modules\/(?!(dom7|ssr-window|vue-plugin-load-script)\/).*/
        }, {
            test: /\.md$/,
            use: [{
                loader: "html-loader"
            }, {
                loader: "markdown-loader"
            }]
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            __markdownList__: JSON.stringify(__markdownList)
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: __markdownChunkGroup,
        }
    }
};