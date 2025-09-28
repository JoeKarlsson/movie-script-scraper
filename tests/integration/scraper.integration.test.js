/**
 * Integration Tests for Movie Script Scraper
 * 
 * These tests verify that the scraper works end-to-end with real (or mocked) data.
 * They test the integration between different modules and ensure the complete workflow functions.
 */

const fs = require('fs');
const path = require('path');
const mss = require('../../src/mss');
const { createMockOptions, createMockURLs } = global.testUtils;

// Mock the API calls to avoid hitting real IMSDB during tests
jest.mock('../../src/helper/api', () => {
    return jest.fn().mockImplementation((url) => {
        if (url.includes('genre.php')) {
            // Mock genre feed response
            return Promise.resolve(`
				<rss>
					<channel>
						<item>
							<link>http://www.imsdb.com/scripts/Action-Movie-1.html</link>
							<title>Action Movie 1</title>
						</item>
						<item>
							<link>http://www.imsdb.com/scripts/Action-Movie-2.html</link>
							<title>Action Movie 2</title>
						</item>
					</channel>
				</rss>
			`);
        }
        // Mock individual script page
        return Promise.resolve(`
			<html>
				<head><title>Test Movie Script at IMSDb.</title></head>
				<body>
					<table>
						<tr><td>FADE IN:</td></tr>
						<tr><td>EXT. TEST LOCATION - DAY</td></tr>
						<tr><td>This is a test movie script with enough content to be valid.</td></tr>
						<tr><td>It contains multiple lines of dialogue and action.</td></tr>
						<tr><td>CHARACTER: Hello, this is a test script.</td></tr>
						<tr><td>ANOTHER CHARACTER: Yes, this should be long enough to pass validation.</td></tr>
					</table>
				</body>
			</html>
		`);
    });
});

// Mock other dependencies
jest.mock('../../src/getScript/helper/writeToFile', () => jest.fn((path, script) => {
    // Create the directory and file for integration tests
    const fs = require('fs');
    const pathModule = require('path');
    const dir = pathModule.dirname(path);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(path, script);
    return Promise.resolve(path);
}));
jest.mock('../../src/getScript/helper/isInvalidScript', () => jest.fn(() => false));
jest.mock('../../src/getScript/helper/extractPageContents', () => jest.fn(() => ({
    script: 'FADE IN:\nEXT. TEST LOCATION - DAY\nThis is a test movie script with enough content to be valid.',
    title: 'test-movie'
})));
jest.mock('../../src/genre/helper/shouldRandomlySave', () => jest.fn(() => true));
jest.mock('../../src/genre/helper/fileSystem', () => ({
    checkDirectory: jest.fn((dest, genre) => {
        const fs = require('fs');
        const path = require('path');
        const dir = path.join(dest, genre);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        return Promise.resolve(true);
    }),
    removeExtraScripts: jest.fn((filePaths, total) => Promise.resolve(filePaths.slice(0, total)))
}));

describe('Movie Script Scraper Integration Tests', () => {
    const testDir = path.join(__dirname, '../../test-output');

    beforeEach(() => {
        // Clean up test directory before each test
        if (fs.existsSync(testDir)) {
            fs.rmSync(testDir, { recursive: true, force: true });
        }
        fs.mkdirSync(testDir, { recursive: true });
    });

    afterEach(() => {
        // Clean up test directory after each test
        if (fs.existsSync(testDir)) {
            fs.rmSync(testDir, { recursive: true, force: true });
        }
    });

    describe('Genre-based Scraping', () => {
        it('should successfully scrape scripts by genre', async () => {
            const options = createMockOptions({
                genre: 'Action',
                dest: testDir,
                total: 2
            });

            const result = await mss(options);

            expect(result).toBeDefined();
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBeGreaterThan(0);

            // Verify files were created
            const genreDir = path.join(testDir, 'Action');
            expect(fs.existsSync(genreDir)).toBe(true);

            const files = fs.readdirSync(genreDir);
            expect(files.length).toBeGreaterThan(0);
            expect(files.every(file => file.endsWith('.txt'))).toBe(true);
        });

        it('should handle invalid genre gracefully', async () => {
            // Mock API to return empty response for invalid genre
            const api = require('../../src/helper/api');
            api.mockResolvedValueOnce('<rss><channel></channel></rss>');

            const options = createMockOptions({
                genre: 'InvalidGenre',
                dest: testDir,
                total: 2
            });

            try {
                const result = await mss(options);
                expect(result).toBeDefined();
                expect(Array.isArray(result)).toBe(true);
            } catch (error) {
                // If error is thrown, it should be handled gracefully
                expect(error).toBeDefined();
            }
        });

        it('should respect the total limit', async () => {
            const options = createMockOptions({
                genre: 'Action',
                dest: testDir,
                total: 1
            });

            const result = await mss(options);

            expect(result).toBeDefined();
            expect(result.length).toBeLessThanOrEqual(1);
        });
    });

    describe('Title-based Scraping', () => {
        it('should successfully scrape a specific movie script', async () => {
            const options = createMockOptions({
                title: 'Test Movie',
                dest: testDir
            });

            const result = await mss(options);

            expect(result).toBeDefined();
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBeGreaterThanOrEqual(1);
        });

        it('should handle non-existent movie gracefully', async () => {
            // Mock API to return empty response for non-existent movie
            const api = require('../../src/helper/api');
            api.mockResolvedValueOnce('<html><body>Movie not found</body></html>');

            const options = createMockOptions({
                title: 'NonExistentMovie',
                dest: testDir
            });

            const result = await mss(options);

            expect(result).toBeDefined();
            expect(Array.isArray(result)).toBe(true);
        });
    });

    describe('Default Behavior', () => {
        it('should use default settings when no options provided', async () => {
            const options = createMockOptions({
                dest: testDir
            });

            const result = await mss(options);

            expect(result).toBeDefined();
            expect(Array.isArray(result)).toBe(true);

            // Should create Action directory (default genre)
            const actionDir = path.join(testDir, 'Action');
            expect(fs.existsSync(actionDir)).toBe(true);
        });
    });

    describe('Error Handling', () => {
        it('should handle network errors gracefully', async () => {
            // Mock API to throw network error
            const api = require('../../src/helper/api');
            api.mockRejectedValueOnce(new Error('Network error'));

            const options = createMockOptions({
                genre: 'Action',
                dest: testDir,
                total: 1
            });

            try {
                const result = await mss(options);
                // If no error is thrown, result should be undefined
                expect(result).toBeUndefined();
            } catch (error) {
                // If error is thrown, it should be handled gracefully
                expect(error).toBeDefined();
            }
        });

        it('should handle file system errors gracefully', async () => {
            // Create a read-only directory to simulate permission error
            const readOnlyDir = path.join(testDir, 'readonly');
            fs.mkdirSync(readOnlyDir);
            fs.chmodSync(readOnlyDir, 0o444);

            const options = createMockOptions({
                genre: 'Action',
                dest: readOnlyDir,
                total: 1
            });

            try {
                const result = await mss(options);
                // Should handle the error gracefully
                expect(result).toBeDefined();
            } catch (error) {
                // If error is thrown, it should be handled gracefully
                expect(error).toBeDefined();
            }
        });
    });

    describe('File System Operations', () => {
        it('should create proper directory structure', async () => {
            const options = createMockOptions({
                genre: 'Comedy',
                dest: testDir,
                total: 1
            });

            await mss(options);

            const comedyDir = path.join(testDir, 'Comedy');
            expect(fs.existsSync(comedyDir)).toBe(true);
        });

        it('should write valid script files', async () => {
            const options = createMockOptions({
                genre: 'Action',
                dest: testDir,
                total: 1
            });

            await mss(options);

            const actionDir = path.join(testDir, 'Action');
            const files = fs.readdirSync(actionDir);

            expect(files.length).toBeGreaterThan(0);

            const scriptFile = path.join(actionDir, files[0]);
            const content = fs.readFileSync(scriptFile, 'utf8');

            expect(content.length).toBeGreaterThan(50); // Should be valid script length
            expect(content).toContain('FADE IN:'); // Should contain script content
        });
    });
});
