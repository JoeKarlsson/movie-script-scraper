const fs = require('fs');
const fetchMock = require('fetch-mock');
const getScriptsByGenre = require('./getScriptsByGenre');
const mocksUrls = require('./helper/__mocks__/data/mock-urls.json');

jest.unmock('../getScript/getScript');
jest.mock('../getScript/helper/writeToFile');
jest.mock('../getScript/helper/isInvalidScript');
jest.mock('./helper/shouldRandomlySave');
jest.mock('./helper/fileSystem');

const mockData = fs.readFileSync(
	'src/genre/helper/__mocks__/data/mock_genre_data.xml',
	{
		encoding: 'utf-8',
	}
);

const mockRawData = fs.readFileSync(
	'src/genre/helper/__mocks__/data/mock_raw_data_1.txt',
	{
		encoding: 'utf-8',
	}
);

describe('getScriptsByGenre', () => {
	beforeEach(() => {
		fetchMock.reset();
	});

	it('should return an array of filePaths from newly created scripts', () => {
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
			'scripts/hellboy.txt',
			'scripts/frozen.txt',
			'scripts/x-men.txt',
			'scripts/american-sniper.txt',
		];

		getScriptsByGenre(options)
			.then(result => {
				expect(result).toMatchObject(expectedResult);
			})
			.catch(e => {
				console.error(e);
			});
	});
});
