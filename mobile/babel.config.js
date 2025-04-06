module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv', {
        "moduleName": "@env",
        "path": ".env",
        // Make sure to remove this part
        "safe": false,
        "allowUndefined": true
      }]
    ]
  };
};
