const { checkDirectory, removeExtraScripts } = require('./fileSystem');

jest.mock('fs');
jest.mock('../../helper/randomIntFromInterval');

describe('fileSystem', () => {
	describe('checkDirectory', () => {
		it('should return true if directory exists', () => {
			checkDirectory('scripts', 'Action').then(result => {
				expect(result).toBe(true);
			});
		});
	});
	describe('removeExtraScripts', () => {
		it('should return true if directory exists', () => {
			const filePaths = ['script 1', 'script 2', 'script 3', 'script 4'];
			const total = 3;

			const expectedResult = ['script 1', 'script 3', 'script 4'];

			removeExtraScripts(filePaths, total).then(result => {
				expect(result).toMatchObject(expectedResult);
			});
		});
	});
});
