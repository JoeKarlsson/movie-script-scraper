/**
 * Error Handling and Edge Case Tests
 * 
 * These tests verify that the application handles various error conditions
 * and edge cases gracefully without crashing.
 */

const mss = require('../../src/mss');
const api = require('../../src/helper/api');
const parseArgs = require('../../src/helper/parseArgs');
const { createMockOptions } = global.testUtils;

// Mock console methods to avoid cluttering test output
const originalConsole = console;
beforeAll(() => {
    global.console = {
        ...originalConsole,
        log: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        info: jest.fn(),
    };
});

afterAll(() => {
    global.console = originalConsole;
});

describe('Error Handling Tests', () => {
    describe('Network Errors', () => {
        it('should handle network timeout errors', async () => {
            // Mock API to simulate timeout
            api.mockRejectedValueOnce(new Error('Request timeout'));

            const options = createMockOptions({
                genre: 'Action',
                total: 1
            });

            const result = await mss(options);

            expect(result).toBeUndefined();
        });

        it('should handle connection refused errors', async () => {
            // Mock API to simulate connection refused
            api.mockRejectedValueOnce(new Error('ECONNREFUSED'));

            const options = createMockOptions({
                genre: 'Action',
                total: 1
            });

            const result = await mss(options);

            expect(result).toBeUndefined();
        });

        it('should handle DNS resolution errors', async () => {
            // Mock API to simulate DNS error
            api.mockRejectedValueOnce(new Error('ENOTFOUND'));

            const options = createMockOptions({
                genre: 'Action',
                total: 1
            });

            const result = await mss(options);

            expect(result).toBeUndefined();
        });
    });

    describe('Invalid Data Handling', () => {
        it('should handle empty API responses', async () => {
            // Mock API to return empty response
            api.mockResolvedValueOnce('');

            const options = createMockOptions({
                genre: 'Action',
                total: 1
            });

            const result = await mss(options);

            expect(result).toBeDefined();
            expect(Array.isArray(result)).toBe(true);
        });

        it('should handle malformed XML responses', async () => {
            // Mock API to return malformed XML
            api.mockResolvedValueOnce('<rss><item><link>invalid</link></item>');

            const options = createMockOptions({
                genre: 'Action',
                total: 1
            });

            const result = await mss(options);

            expect(result).toBeDefined();
            expect(Array.isArray(result)).toBe(true);
        });

        it('should handle null and undefined inputs', async () => {
            const options = createMockOptions({
                genre: null,
                total: undefined,
                dest: null
            });

            const result = await mss(options);

            expect(result).toBeDefined();
        });
    });

    describe('File System Errors', () => {
        it('should handle permission denied errors', async () => {
            // Mock file system operations to throw permission error
            const fs = require('fs');
            const originalMkdir = fs.mkdir;
            fs.mkdir = jest.fn().mockImplementation((path, options, callback) => {
                callback(new Error('EACCES: permission denied'));
            });

            const options = createMockOptions({
                genre: 'Action',
                total: 1
            });

            const result = await mss(options);

            expect(result).toBeUndefined();

            // Restore original function
            fs.mkdir = originalMkdir;
        });

        it('should handle disk full errors', async () => {
            // Mock file system operations to throw disk full error
            const fs = require('fs');
            const originalWriteFile = fs.writeFile;
            fs.writeFile = jest.fn().mockImplementation((path, data, callback) => {
                callback(new Error('ENOSPC: no space left on device'));
            });

            const options = createMockOptions({
                genre: 'Action',
                total: 1
            });

            const result = await mss(options);

            expect(result).toBeUndefined();

            // Restore original function
            fs.writeFile = originalWriteFile;
        });
    });

    describe('Memory and Resource Limits', () => {
        it('should handle large response data', async () => {
            // Mock API to return very large response
            const largeData = 'x'.repeat(10 * 1024 * 1024); // 10MB
            api.mockResolvedValueOnce(largeData);

            const options = createMockOptions({
                genre: 'Action',
                total: 1
            });

            const result = await mss(options);

            expect(result).toBeDefined();
        });

        it('should handle memory pressure gracefully', async () => {
            // Simulate memory pressure by creating large objects
            const largeArray = Array.from({ length: 10000 }, (_, i) => ({
                id: i,
                data: 'x'.repeat(1000)
            }));

            const options = createMockOptions({
                genre: 'Action',
                total: 1
            });

            // Clear the large array to free memory
            largeArray.length = 0;

            const result = await mss(options);

            expect(result).toBeDefined();
        });
    });

    describe('Concurrent Operations', () => {
        it('should handle concurrent scraping operations', async () => {
            const promises = [];

            // Start multiple concurrent operations
            for (let i = 0; i < 5; i++) {
                const options = createMockOptions({
                    genre: 'Action',
                    total: 1
                });

                promises.push(mss(options));
            }

            const results = await Promise.all(promises);

            // All operations should complete
            results.forEach(result => {
                expect(result).toBeDefined();
            });
        });
    });

    describe('Input Validation', () => {
        it('should handle extremely long genre names', async () => {
            const longGenre = 'A'.repeat(1000);

            const options = createMockOptions({
                genre: longGenre,
                total: 1
            });

            const result = await mss(options);

            expect(result).toBeDefined();
        });

        it('should handle special characters in genre names', async () => {
            const specialGenre = 'Action!@#$%^&*()_+-=[]{}|;:,.<>?';

            const options = createMockOptions({
                genre: specialGenre,
                total: 1
            });

            const result = await mss(options);

            expect(result).toBeDefined();
        });

        it('should handle negative total values', async () => {
            const options = createMockOptions({
                genre: 'Action',
                total: -1
            });

            const result = await mss(options);

            expect(result).toBeDefined();
        });

        it('should handle zero total values', async () => {
            const options = createMockOptions({
                genre: 'Action',
                total: 0
            });

            const result = await mss(options);

            expect(result).toBeDefined();
        });
    });

    describe('Argument Parsing Edge Cases', () => {
        it('should handle empty arguments object', () => {
            const result = parseArgs({});

            expect(result).toBe(true);
        });

        it('should handle undefined arguments', () => {
            const result = parseArgs(undefined);

            expect(result).toBe(true);
        });

        it('should handle null arguments', () => {
            const result = parseArgs(null);

            expect(result).toBe(true);
        });

        it('should handle arguments with only whitespace', () => {
            const result = parseArgs({
                genre: '   ',
                title: '\t\n',
                total: '   '
            });

            expect(result).toBe(true);
        });
    });
});
