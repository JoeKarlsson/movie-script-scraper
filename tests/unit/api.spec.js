const fs = require('fs');
const api = require('../../src/helper/api');

// Mock node-fetch
jest.mock('node-fetch');
const fetch = require('node-fetch');

jest.mock('../../src/helper/handleError');

const mockData = fs.readFileSync('tests/fixtures/__mocks__/data/mock_genre_data.xml', {
	encoding: 'utf-8',
});

describe('API', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('#api', () => {
		it('should return all the script URLs as a promise', async () => {
			const genre = 'Action';
			const url = `http://www.imsdb.com/feeds/genre.php?genre=${genre}`;

			// Mock the fetch response
			fetch.mockResolvedValue({
				text: () => Promise.resolve(mockData)
			});

			const result = await api(url);
			expect(result).toEqual(mockData);
			expect(fetch).toHaveBeenCalledWith(url);
		});
	});
});
