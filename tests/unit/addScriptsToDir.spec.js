const addScriptsToDir = require('../../src/genre/helper/addScriptsToDir');
const mocksUrls = require('../../tests/fixtures/__mocks__/data/mock-urls.json');

jest.mock('../../src/getScript/getScript');
jest.mock('../../src/helper/handleError');
jest.mock('../../src/genre/helper/shouldRandomlySave');

describe('addScriptsToDir', () => {
	it('should return true if directory exists', () => {
		const options = {
			genre: 'Action',
			dest: 'scripts',
			total: 10,
		};
		const expectedResult = ['scripts/frozen.txt'];
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
