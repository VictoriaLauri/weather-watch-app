module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // This ensures that setupTests.js runs before your tests
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    "/node_modules/(?!some-package-to-transform)/", 
    '/node_modules/(?!axios)/',
  ],
  moduleNameMapper: {
    "^react-router-dom$": "<rootDir>/src/__mocks__/react-router-dom.js", 
  },
  testEnvironment: 'jest-environment-jsdom'
};
