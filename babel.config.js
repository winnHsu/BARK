module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    //New Added
    plugins: ['react-native-reanimated/plugin'],
  };
};
