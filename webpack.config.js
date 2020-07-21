const path = require('path');

const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  config.module.rules = [
    ...config.module.rules,
    {
      test: /\.(js|jsx|mjs)$/,
      include: [path.resolve(__dirname, 'node_modules/react-router-native')],
      loader: require.resolve('babel-loader'),
    },
  ];
  // Customize the config before returning it.
  return config;
};
