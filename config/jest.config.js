module.exports = {
	// Set root directory to project root
	rootDir: process.cwd(),

	// Test file patterns
	testMatch: [
		'<rootDir>/tests/unit/**/*.spec.js',
		'<rootDir>/tests/integration/**/*.test.js',
		'<rootDir>/tests/e2e/**/*.e2e.test.js'
	],

	// Coverage configuration - using c8 instead of Jest's built-in coverage
	collectCoverage: false,

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
