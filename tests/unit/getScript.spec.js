const fs = require('fs');
const fetchMock = require('fetch-mock');
const getScript = require('../../src/getScript/getScript');

jest.mock('../../src/getScript/helper/writeToFile', () => require('../../tests/fixtures/__mocks__/writeToFile'));
jest.mock('../../src/getScript/helper/extractPageContents', () => require('../../tests/fixtures/__mocks__/extractPageContents'));
jest.mock('../../src/getScript/helper/isInvalidScript', () => require('../../tests/fixtures/__mocks__/isInvalidScript'));

const mockRawHTML = fs.readFileSync(
	'tests/fixtures/__mocks__/data/mock_raw_data_1.txt',
	{
		encoding: 'utf-8',
	}
);

describe('getScript', () => {
	it('should return the file path of the script retreived', () => {
		const url = 'http://www.imsdb.com/scripts/FrozenTESTSTST.html';
		const options = {
			genre: 'Action',
			total: 1,
			dest: 'scripts',
		};

		fetchMock.mock(url, mockRawHTML);

		getScript(url, options)
			.then(result => {
				expect(result).toBe('scripts/Action/frozen.txt');
			})
			.catch(err => {
				console.error(err);
			});
	});
});
