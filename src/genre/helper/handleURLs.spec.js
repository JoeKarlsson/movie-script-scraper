const fs = require('fs');
const handleURLs = require('./handleURLs');
const mocksUrls = require('./__mocks__/data/mock-urls.json');

const mockData = fs.readFileSync(
	'src/genre/helper/__mocks__/data/mock_genre_data.xml',
	{
		encoding: 'utf-8',
	}
);

describe('handleURLs', () => {
	it('should return true if directory exists', () => {
		const result = handleURLs(mockData);
		expect(result).toMatchObject(mocksUrls);
	});

	it('should return null if invalid data is passed through', () => {
		const result = handleURLs('TEST DATA');
		expect(result).toBe(null);
	});
});
