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
		it('should return correct number of scripts when removing extras', async () => {
			const filePaths = ['script 1', 'script 2', 'script 3', 'script 4'];
			const total = 3;

			const result = await removeExtraScripts(filePaths, total);
			
			expect(result).toHaveLength(3);
			// New implementation removes from the end (most recently added)
			expect(result).toContain('script 1');
			expect(result).toContain('script 2');
			expect(result).toContain('script 3');
			expect(result).not.toContain('script 4'); // Last script removed
		});

		it('should return all scripts when total is greater than or equal to filePaths length', async () => {
			const filePaths = ['script 1', 'script 2', 'script 3'];
			const total = 5;

			const result = await removeExtraScripts(filePaths, total);
			
			expect(result).toHaveLength(3);
			expect(result).toEqual(filePaths);
		});

		it('should return empty array when filePaths is empty', async () => {
			const filePaths = [];
			const total = 3;

			const result = await removeExtraScripts(filePaths, total);
			
			expect(result).toHaveLength(0);
		});
	});
});
