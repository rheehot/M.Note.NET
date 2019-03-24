module.exports = function (api) {
    api.cache(true);
  
    const presets = [ "@babel/preset-env" ];
    const plugins = [ "babel-plugin-dynamic-import-webpack" ];
  
    return {
      presets,
      plugins
    };
  }