const fs = require('fs');
const fetchMock = require('fetch-mock');
const mss = require('../../src/mss');
const mocksUrls = require('../../tests/fixtures/__mocks__/data/mock-urls.json');

jest.unmock('../../src/getScript/getScript');
jest.mock('../../src/getScript/helper/writeToFile', () => require('../../tests/fixtures/__mocks__/writeToFile'));
jest.mock('../../src/getScript/helper/isInvalidScript', () => require('../../tests/fixtures/__mocks__/isInvalidScript'));
jest.mock('../../src/getScript/helper/extractPageContents', () => require('../../tests/fixtures/__mocks__/extractPageContents'));
jest.mock('../../src/genre/helper/shouldRandomlySave', () => require('../../tests/fixtures/__mocks__/shouldRandomlySave'));
jest.mock('../../src/genre/helper/fileSystem', () => require('../../tests/fixtures/__mocks__/fileSystem'));
jest.mock('../../src/genre/helper/addScriptsToDir', () => require('../../tests/fixtures/__mocks__/addScriptsToDir'));

const mockData = fs.readFileSync(
	'tests/fixtures/__mocks__/data/mock_genre_data.xml',
	{
		encoding: 'utf-8',
	}
);

const mockRawData = fs.readFileSync(
	'tests/fixtures/__mocks__/data/mock_raw_data_1.txt',
	{
		encoding: 'utf-8',
	}
);

describe('Movie Script Scraper', () => {
	beforeEach(() => {
		fetchMock.reset();
	});

	it('should return an array of filePaths from newly created scripts - genre', () => {
		const genre = 'Action';
		const genreUrl = `http://www.imsdb.com/feeds/genre.php?genre=${genre}`;
		fetchMock.mock(genreUrl, mockData);
		mocksUrls.forEach((url, i) => {
			fetchMock.mock(mocksUrls[i], mockRawData);
		});

		const options = {
			genre: 'Action',
			total: 1,
			dest: 'scripts',
		};

		const expectedResult = [
			'scripts/Action/frozen.txt'
		];

		return mss(options)
			.then(result => {
				expect(result).toMatchObject(expectedResult);
			});
	});

	it('should return an array of filePaths from newly created scripts - title', () => {
		const options = {
			title: 'frozen',
			dest: 'scripts',
		};

		const expectedResult = 'scripts/frozen.txt';

		return mss(options)
			.then(result => {
				expect(result).toBe(expectedResult);
			});
	});

	it('should return an array of filePaths from newly created scripts - default', () => {
		const options = {};

		const expectedResult = [
			'scripts/Action/frozen.txt',
			'scripts/Action/frozen.txt',
			'scripts/Action/frozen.txt'
		];

		return mss(options)
			.then(result => {
				expect(result).toMatchObject(expectedResult);
			});
	});
});
