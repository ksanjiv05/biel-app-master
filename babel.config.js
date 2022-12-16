module.exports = function (api) {
  api.cache(true);

  // const babelEnv = api.env();
  // const plugins = [];
  // console.log("env", babelEnv);
  //change to 'production' to check if this is working in 'development' mode
  // if (babelEnv !== "production") {
  //   plugins.push(["transform-remove-console", { exclude: ["error"] }]);
  // }
  // return {
  //   presets: ["babel-preset-expo"],
  //   plugins,
  // };
  return {
    presets: ["babel-preset-expo"],
    plugins: ["react-native-reanimated/plugin"],
  };
};
