const fs = require('fs');
const fetchMock = require('fetch-mock');
const getScript = require('./getScript');

jest.mock('./helper/writeToFile');

const mockRawHTML = fs.readFileSync(
	'src/genre/helper/__mocks__/data/mock_raw_data_1.txt',
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
