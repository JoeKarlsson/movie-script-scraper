const createURL = require('../../src/title/helper/createURL');

describe('createURL', () => {
	it('should return a valid URL for one letter film titles', () => {
		const title = 'frozen';
		const expectedResult = `https://imsdb.com/scripts/Frozen.html`;

		expect(createURL(title)).toBe(expectedResult);
	});

	it('should return a valid URL for multi letter film titles', () => {
		const title = 'american sniper';
		const expectedResult = `https://imsdb.com/scripts/American-Sniper.html`;
		expect(createURL(title)).toBe(expectedResult);
	});
});
