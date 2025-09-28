/**
 * Jest Test Setup
 * 
 * This file runs before each test file and sets up the testing environment.
 * It configures global test utilities and mocks.
 */

// Increase timeout for integration tests
jest.setTimeout(30000);

// Global test utilities
global.testUtils = {
    // Helper to create mock options
    createMockOptions: (overrides = {}) => ({
        genre: 'Action',
        dest: 'test-scripts',
        total: 5,
        ...overrides,
    }),

    // Helper to create mock URLs
    createMockURLs: (count = 3) =>
        Array.from({ length: count }, (_, i) =>
            `http://www.imsdb.com/scripts/mock-script-${i + 1}.html`
        ),

    // Helper to create mock file paths
    createMockFilePaths: (count = 3) =>
        Array.from({ length: count }, (_, i) =>
            `test-scripts/Action/mock-script-${i + 1}.txt`
        ),
};

// Console suppression for cleaner test output
const originalConsole = console;
const mockConsole = {
    ...originalConsole,
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
};

// Suppress console output during tests
beforeEach(() => {
    global.console = mockConsole;
    jest.clearAllMocks();
});

// Restore console after tests
afterEach(() => {
    global.console = originalConsole;
});

afterAll(() => {
    global.console = originalConsole;
});
