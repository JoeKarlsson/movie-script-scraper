const addScriptsToDir = require('../../src/genre/helper/addScriptsToDir');
const mocksUrls = require('../../tests/fixtures/__mocks__/data/mock-urls.json');

jest.mock('../../src/getScript/getScript', () => jest.fn((url, options) => {
	return Promise.resolve(`scripts/${options.genre}/frozen.txt`);
}));
jest.mock('../../src/helper/handleError');
// shouldRandomlySave module removed - no longer needed with parallel processing
jest.mock('../../src/genre/helper/fileSystem', () => ({
	checkDirectory: jest.fn(() => Promise.resolve(true))
}));

describe('addScriptsToDir', () => {
	it('should return true if directory exists', () => {
		const options = {
			genre: 'Action',
			dest: 'scripts',
			total: 10,
		};
		const expectedResult = ['scripts/Action/frozen.txt'];
		addScriptsToDir(mocksUrls, options)
			.then(result => {
				expect(result).toMatchObject(expectedResult);
			})
			.catch(e => {
				console.error(e);
			});
	});
	it('should handle invlaid input', () => {
		const mocksUrls = null;
		const options = null;

		addScriptsToDir(mocksUrls, options)
			.then(result => {
				console.log('result', result);
				// expect(result).toMatchObject(expectedResult);
			})
			.catch(e => {
				console.error(e);
			});
	});
});
