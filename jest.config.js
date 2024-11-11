module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Трансформація файлів .js і .jsx через Babel
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios|some-other-library)/', // Трансформувати axios та інші бібліотеки
  ],
};
