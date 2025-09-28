/**
 * Performance and Load Tests
 * 
 * These tests verify that the application performs well under various
 * load conditions and resource constraints.
 */

const mss = require('../../src/mss');
const api = require('../../src/helper/api');
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

describe('Performance Tests', () => {
    describe('Response Time Tests', () => {
        it('should complete genre scraping within acceptable time', async () => {
            const startTime = Date.now();

            const options = createMockOptions({
                genre: 'Action',
                total: 5
            });

            const result = await mss(options);

            const endTime = Date.now();
            const duration = endTime - startTime;

            expect(result).toBeDefined();
            expect(duration).toBeLessThan(5000); // Should complete within 5 seconds
        });

        it('should complete title scraping within acceptable time', async () => {
            const startTime = Date.now();

            const options = createMockOptions({
                title: 'Test Movie'
            });

            const result = await mss(options);

            const endTime = Date.now();
            const duration = endTime - startTime;

            expect(result).toBeDefined();
            expect(duration).toBeLessThan(3000); // Should complete within 3 seconds
        });
    });

    describe('Memory Usage Tests', () => {
        it('should not leak memory during multiple operations', async () => {
            const initialMemory = process.memoryUsage();

            // Perform multiple operations
            for (let i = 0; i < 10; i++) {
                const options = createMockOptions({
                    genre: 'Action',
                    total: 1
                });

                await mss(options);

                // Force garbage collection if available
                if (global.gc) {
                    global.gc();
                }
            }

            const finalMemory = process.memoryUsage();
            const memoryIncrease = finalMemory.heapUsed - initialMemory.heapUsed;

            // Memory increase should be reasonable (less than 50MB)
            expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024);
        });

        it('should handle large datasets efficiently', async () => {
            // Mock API to return large dataset
            const largeDataset = Array.from({ length: 1000 }, (_, i) =>
                `<item><link>http://www.imsdb.com/scripts/movie-${i}.html</link></item>`
            ).join('');

            api.mockResolvedValueOnce(`<rss>${largeDataset}</rss>`);

            const startTime = Date.now();

            const options = createMockOptions({
                genre: 'Action',
                total: 100
            });

            const result = await mss(options);

            const endTime = Date.now();
            const duration = endTime - startTime;

            expect(result).toBeDefined();
            expect(duration).toBeLessThan(10000); // Should handle large dataset within 10 seconds
        });
    });

    describe('Concurrent Load Tests', () => {
        it('should handle multiple concurrent requests', async () => {
            const startTime = Date.now();

            // Start 10 concurrent operations
            const promises = Array.from({ length: 10 }, (_, i) =>
                mss(createMockOptions({
                    genre: 'Action',
                    total: 1
                }))
            );

            const results = await Promise.all(promises);

            const endTime = Date.now();
            const duration = endTime - startTime;

            // All operations should complete
            results.forEach(result => {
                expect(result).toBeDefined();
            });

            // Should complete within reasonable time even with concurrency
            expect(duration).toBeLessThan(15000); // 15 seconds for 10 concurrent operations
        });

        it('should maintain performance under sustained load', async () => {
            const startTime = Date.now();
            const operations = [];

            // Perform 50 operations in batches
            for (let batch = 0; batch < 5; batch++) {
                const batchPromises = Array.from({ length: 10 }, () =>
                    mss(createMockOptions({
                        genre: 'Action',
                        total: 1
                    }))
                );

                const batchResults = await Promise.all(batchPromises);
                operations.push(...batchResults);
            }

            const endTime = Date.now();
            const duration = endTime - startTime;

            // All operations should complete
            expect(operations.length).toBe(50);
            operations.forEach(result => {
                expect(result).toBeDefined();
            });

            // Should maintain reasonable performance
            expect(duration).toBeLessThan(30000); // 30 seconds for 50 operations
        });
    });

    describe('Resource Cleanup Tests', () => {
        it('should properly clean up resources after completion', async () => {
            const initialHandles = process._getActiveHandles().length;
            const initialRequests = process._getActiveRequests().length;

            const options = createMockOptions({
                genre: 'Action',
                total: 5
            });

            await mss(options);

            // Wait a bit for cleanup
            await new Promise(resolve => setTimeout(resolve, 100));

            const finalHandles = process._getActiveHandles().length;
            const finalRequests = process._getActiveRequests().length;

            // Should not have significantly more handles/requests than initially
            expect(finalHandles - initialHandles).toBeLessThan(5);
            expect(finalRequests - initialRequests).toBeLessThan(5);
        });

        it('should handle cleanup on errors', async () => {
            // Mock API to throw error after some operations
            api.mockRejectedValueOnce(new Error('Simulated error'));

            const initialHandles = process._getActiveHandles().length;

            const options = createMockOptions({
                genre: 'Action',
                total: 5
            });

            await mss(options);

            // Wait for cleanup
            await new Promise(resolve => setTimeout(resolve, 100));

            const finalHandles = process._getActiveHandles().length;

            // Should not leak handles even on error
            expect(finalHandles - initialHandles).toBeLessThan(5);
        });
    });

    describe('Scalability Tests', () => {
        it('should scale linearly with total parameter', async () => {
            const testCases = [1, 5, 10, 20];
            const results = [];

            for (const total of testCases) {
                const startTime = Date.now();

                const options = createMockOptions({
                    genre: 'Action',
                    total
                });

                await mss(options);

                const endTime = Date.now();
                const duration = endTime - startTime;

                results.push({ total, duration });
            }

            // Performance should scale reasonably with total
            // (not necessarily linear, but shouldn't be exponential)
            for (let i = 1; i < results.length; i++) {
                const ratio = results[i].duration / results[i - 1].duration;
                const totalRatio = results[i].total / results[i - 1].total;

                // Duration increase should be less than total increase squared
                expect(ratio).toBeLessThan(totalRatio * totalRatio);
            }
        });

        it('should handle different genres with similar performance', async () => {
            const genres = ['Action', 'Comedy', 'Drama', 'Horror'];
            const results = [];

            for (const genre of genres) {
                const startTime = Date.now();

                const options = createMockOptions({
                    genre,
                    total: 5
                });

                await mss(options);

                const endTime = Date.now();
                const duration = endTime - startTime;

                results.push({ genre, duration });
            }

            // All genres should perform similarly
            const durations = results.map(r => r.duration);
            const maxDuration = Math.max(...durations);
            const minDuration = Math.min(...durations);

            // Max duration should not be more than 2x min duration
            expect(maxDuration).toBeLessThan(minDuration * 2);
        });
    });
});
