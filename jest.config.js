module.exports = {
    testEnvironment: 'node',
    coverageDirectory: 'coverage',
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.js'],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        'src/app.js',
        'src/server.js'
    ],
    setupFilesAfterEnv: ['./tests/setupDbInMemory.js']
};