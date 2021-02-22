module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
    '@common/(.*)': '<rootDir>/src/common/$1',
    '@modules/(.*)': '<rootDir>/src/modules/$1',
    '@app/(.*)': '<rootDir>/src/app/$1',
  },
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  setupFiles: ['./jest.setup.ts'],
};
