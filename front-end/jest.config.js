module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/config/setupTests.js'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  transform: {
    // Transpile JavaScript and JSX files using Babel
    '^.+\\.jsx?$': 'babel-jest',
  },

  moduleDirectories: ['node_modules', 'src'], // Resolve modules from these directories
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': '<rootDir>/__mocks__/fileMock.js',
  },
};
