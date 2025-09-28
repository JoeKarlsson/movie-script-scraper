const fs = require('fs');
const handleURLs = require('../../src/genre/helper/handleURLs');
const mocksUrls = require('../../tests/fixtures/__mocks__/data/mock-urls.json');

const mockData = `
<html>
<body>
<a href="/Movie Scripts/Die Hard Script.html">Die Hard</a>
<a href="/Movie Scripts/Terminator Script.html">Terminator</a>
<a href="/Movie Scripts/Aliens Script.html">Aliens</a>
</body>
</html>
`;

describe('handleURLs', () => {
	it('should return true if directory exists', () => {
		const result = handleURLs(mockData);
		const expectedUrls = [
			'https://imsdb.com/scripts/Die-Hard.html',
			'https://imsdb.com/scripts/Terminator.html',
			'https://imsdb.com/scripts/Aliens.html'
		];
		expect(result).toEqual(expectedUrls);
	});

	it('should return null if invalid data is passed through', () => {
		const result = handleURLs('TEST DATA');
		expect(result).toBe(null);
	});
});
