//do not move this file ino config folder, jest will not find it as it is configured to look in root

export default {
  testEnvironment: 'node',
  transform: {},
  moduleFileExtensions: ['js', 'mjs'],
  testMatch: ['**/__tests__/**/*.mjs', '**/?(*.)+(spec|test).mjs'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}
