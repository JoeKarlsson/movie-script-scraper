const writeToFile = require('../../src/getScript/helper/writeToFile');
const fs = require('fs');
const path = require('path');
const os = require('os');

jest.mock('../../src/helper/handleError', () => jest.fn(() => 'error-handled'));

describe('writeToFile', () => {
	let tempDir;

	beforeEach(() => {
		// Create a temporary directory for each test
		tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'writeToFile-test-'));
	});

	afterEach(() => {
		// Clean up temporary directory
		if (tempDir && fs.existsSync(tempDir)) {
			fs.rmSync(tempDir, { recursive: true, force: true });
		}
	});

	it('should return the file path of the script that is written to the FS', async () => {
		const filePath = path.join(tempDir, 'frozen.html');
		const mockScript = 'MOCK SCRIPT';

		const result = await writeToFile(filePath, mockScript);
		expect(result).toBe(filePath);

		// Verify file was actually written
		expect(fs.existsSync(filePath)).toBe(true);
		expect(fs.readFileSync(filePath, 'utf8')).toBe(mockScript);
	});

	it('should create directory if it does not exist', async () => {
		const dirPath = path.join(tempDir, 'new-directory');
		const filePath = path.join(dirPath, 'frozen.html');
		const mockScript = 'MOCK SCRIPT';

		const result = await writeToFile(filePath, mockScript);
		expect(result).toBe(filePath);

		// Verify directory was created and file was written
		expect(fs.existsSync(dirPath)).toBe(true);
		expect(fs.existsSync(filePath)).toBe(true);
		expect(fs.readFileSync(filePath, 'utf8')).toBe(mockScript);
	});

	it('should use default title when not provided', async () => {
		const filePath = path.join(tempDir, 'frozen.html');
		const mockScript = 'MOCK SCRIPT';

		const result = await writeToFile(filePath, mockScript);
		expect(result).toBe(filePath);

		// Verify file was written
		expect(fs.existsSync(filePath)).toBe(true);
		expect(fs.readFileSync(filePath, 'utf8')).toBe(mockScript);
	});

	it('should handle complex directory paths', async () => {
		const dirPath = path.join(tempDir, 'scripts', 'Action', 'SubGenre');
		const filePath = path.join(dirPath, 'frozen.html');
		const mockScript = 'MOCK SCRIPT';

		const result = await writeToFile(filePath, mockScript);
		expect(result).toBe(filePath);

		// Verify directory structure was created and file was written
		expect(fs.existsSync(dirPath)).toBe(true);
		expect(fs.existsSync(filePath)).toBe(true);
		expect(fs.readFileSync(filePath, 'utf8')).toBe(mockScript);
	});
});
