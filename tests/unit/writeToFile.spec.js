const writeToFile = require('../../src/getScript/helper/writeToFile');
const fs = require('fs');

jest.mock('fs');
jest.mock('../../src/helper/handleError', () => jest.fn(() => 'error-handled'));

describe('writeToFile', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should return the file path of the script that is written to the FS', async () => {
		const path = 'script/frozen.html';
		const mockScript = 'MOCK SCRIPT';
		
		// Mock successful file operations
		fs.access = jest.fn().mockResolvedValue(undefined);
		fs.writeFile = jest.fn().mockResolvedValue(undefined);
		
		const result = await writeToFile(path, mockScript);
		expect(result).toBe(path);
		expect(fs.writeFile).toHaveBeenCalledWith(path, mockScript, 'utf8');
	});

	it('should create directory if it does not exist', async () => {
		const path = 'new-directory/frozen.html';
		const mockScript = 'MOCK SCRIPT';
		
		// Mock directory doesn't exist, then creation succeeds
		fs.access = jest.fn().mockRejectedValue(new Error('Directory not found'));
		fs.mkdir = jest.fn().mockResolvedValue(undefined);
		fs.writeFile = jest.fn().mockResolvedValue(undefined);
		
		const result = await writeToFile(path, mockScript);
		expect(result).toBe(path);
		expect(fs.mkdir).toHaveBeenCalledWith('new-directory', { recursive: true });
		expect(fs.writeFile).toHaveBeenCalledWith(path, mockScript, 'utf8');
	});

	it('should handle write file errors', async () => {
		const path = 'script/frozen.html';
		const mockScript = 'MOCK SCRIPT';
		const mockError = new Error('Write failed');
		
		// Mock successful directory check but failed write
		fs.access = jest.fn().mockResolvedValue(undefined);
		fs.writeFile = jest.fn().mockRejectedValue(mockError);
		
		const result = await writeToFile(path, mockScript, 'Test Title');
		expect(result).toBe('error-handled');
	});

	it('should handle directory creation errors', async () => {
		const path = 'new-directory/frozen.html';
		const mockScript = 'MOCK SCRIPT';
		const mockError = new Error('Directory creation failed');
		
		// Mock directory doesn't exist and creation fails
		fs.access = jest.fn().mockRejectedValue(new Error('Directory not found'));
		fs.mkdir = jest.fn().mockRejectedValue(mockError);
		
		const result = await writeToFile(path, mockScript, 'Test Title');
		expect(result).toBe('error-handled');
	});

	it('should use default title when not provided', async () => {
		const path = 'script/frozen.html';
		const mockScript = 'MOCK SCRIPT';
		
		fs.access = jest.fn().mockResolvedValue(undefined);
		fs.writeFile = jest.fn().mockResolvedValue(undefined);
		
		const result = await writeToFile(path, mockScript);
		expect(result).toBe(path);
		expect(fs.writeFile).toHaveBeenCalledWith(path, mockScript, 'utf8');
	});

	it('should handle complex directory paths', async () => {
		const path = 'scripts/Action/SubGenre/frozen.html';
		const mockScript = 'MOCK SCRIPT';
		
		fs.access = jest.fn().mockRejectedValue(new Error('Directory not found'));
		fs.mkdir = jest.fn().mockResolvedValue(undefined);
		fs.writeFile = jest.fn().mockResolvedValue(undefined);
		
		const result = await writeToFile(path, mockScript);
		expect(result).toBe(path);
		expect(fs.mkdir).toHaveBeenCalledWith('scripts/Action/SubGenre', { recursive: true });
	});
});
