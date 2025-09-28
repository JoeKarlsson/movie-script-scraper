module.exports = {
	// Set root directory to project root
	rootDir: process.cwd(),

	// Test file patterns
	testMatch: [
		'<rootDir>/tests/unit/**/*.spec.js',
		'<rootDir>/tests/integration/**/*.test.js',
		'<rootDir>/tests/e2e/**/*.e2e.test.js'
	],

	// Coverage configuration
	collectCoverageFrom: [
		'src/**/*.js',
		'!src/**/*.spec.js',
		'!src/**/*.test.js',
		'!src/**/__mocks__/**',
		'!src/app.js',
	],
	coverageReporters: ['text', 'lcov', 'html', 'json'],
	coverageDirectory: 'coverage',
	coveragePathIgnorePatterns: ['<rootDir>/src/app'],
	coverageThreshold: {
		global: {
			branches: 0,
			functions: 0,
			lines: 0,
			statements: 0,
		},
	},

	// Test environment
	testEnvironment: 'node',
	transform: {
		'^.+\\.js$': 'babel-jest',
	},
	moduleFileExtensions: ['js', 'json'],

	// Module resolution
	moduleDirectories: ['node_modules', 'src'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'^@tests/(.*)$': '<rootDir>/tests/$1',
		'^@config/(.*)$': '<rootDir>/config/$1',
	},

	// Setup files
	setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],

	// Test timeout
	testTimeout: 30000,

	// Verbose output
	verbose: true,

	// Clear mocks between tests
	clearMocks: true,
	restoreMocks: true,

	// Force exit to prevent hanging
	forceExit: true,

	// Detect open handles
	detectOpenHandles: true,
};
