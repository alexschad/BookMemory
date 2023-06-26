module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  // Reanimated's Babel plugin here:
  plugins: [
    [
      'react-native-reanimated/plugin',
      {
        globals: ['__scanCodes'],
      },
    ],
  ],
};
