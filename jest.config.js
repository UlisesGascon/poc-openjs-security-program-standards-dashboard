export default {
  collectCoverageFrom: [
    'lib/**/*.js'
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/__tests__/'
  ],
  transformIgnorePatterns: [
    '/node_modules/(?!octokit).+\\.js$'
  ]
}
