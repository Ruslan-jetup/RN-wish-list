const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    extraNodeModules: {
      '@src': `${__dirname}/src/typing`,
      '@shared': `${__dirname}/src/shared`,
      '@modules': `${__dirname}/src/modules`,
      '@configs': `${__dirname}/src/configs`,
      '@assets': `${__dirname}/assets`,
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
