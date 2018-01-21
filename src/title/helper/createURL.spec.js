const createURL = require('./createURL');

describe('createURL', () => {
	it('should return a valid URL for one letter film titles', () => {
		const title = 'frozen';
		const expectedResult = `http://www.imsdb.com/scripts/Frozen.html`;

		expect(createURL(title)).toBe(expectedResult);
	});

	it('should return a valid URL for multi letter film titles', () => {
		const title = 'american sniper';
		const expectedResult = `http://www.imsdb.com/scripts/American-Sniper.html`;
		expect(createURL(title)).toBe(expectedResult);
	});
});
