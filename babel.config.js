module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@src': './src',
          '@shared': './src/shared',
          '@modules': './src/modules',
          '@configs': './src/configs',
          '@assets': './assets',
        },
      },
    ],
  ],
};
