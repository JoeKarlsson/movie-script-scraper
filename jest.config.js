module.exports = {
	collectCoverageFrom: ['src/**/*.js'],
	coverageReporters: ['html', 'text-summary', 'text', 'json', 'lcov'],
	coverageDirectory: 'coverage',
	moduleDirectories: ['node_modules', 'src'],
	coverageThreshold: {
		global: {
			branches: 0,
			functions: 0,
			lines: 0,
			statements: 0,
		},
	},
	testEnvironment: 'node',
};
