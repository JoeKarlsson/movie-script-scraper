const writeToFile = require('./writeToFile');

jest.mock('fs');

describe('writeToFile', () => {
	it('should return the file path of the script that is written to the FS', () => {
		const path = 'script/frozen.html';
		const mockScript = 'MOCK SCRIPT';
		writeToFile(path, mockScript)
			.then(result => {
				expect(result).toBe(path);
			})
			.catch(err => {
				console.error(err);
			});
	});
});
