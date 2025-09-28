const { checkDirectory, removeExtraScripts } = require('../../src/genre/helper/fileSystem');
const randomIntFromInterval = require('../../src/helper/randomIntFromInterval');

jest.mock('fs');
jest.mock('../../src/helper/randomIntFromInterval');

describe('fileSystem', () => {
	describe('checkDirectory', () => {
		it('should return true if directory exists', () => {
			checkDirectory('scripts', 'Action').then(result => {
				expect(result).toBe(true);
			});
		});
	});
	describe('removeExtraScripts', () => {
		it('should return correct number of scripts when removing extras', () => {
			// Mock the random function to return predictable values
			randomIntFromInterval.mockReturnValue(1); // This will remove index 1 (script 2)

			const filePaths = ['script 1', 'script 2', 'script 3', 'script 4'];
			const total = 3;

			removeExtraScripts(filePaths, total).then(result => {
				expect(result).toHaveLength(3);
				expect(result).toContain('script 1');
				expect(result).toContain('script 3');
				expect(result).toContain('script 4');
				expect(result).not.toContain('script 2');
			});
		});
	});
});
