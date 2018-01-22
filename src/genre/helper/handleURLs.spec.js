const fs = require('fs');
const handleURLs = require('./handleURLs');
const mocksUrls = require('./__mocks__/mock-urls.json');

const mockData = fs.readFileSync(
	'src/genre/helper/__mocks__/mock_genre_data.xml',
	{
		encoding: 'utf-8',
	}
);

describe('handleURLs', () => {
	it('should return true if directory exists', () => {
		const result = handleURLs(mockData);
		expect(result).toMatchObject(mocksUrls);
	});
});
