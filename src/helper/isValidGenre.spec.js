const isValidGenre = require('./isValidGenre');

describe('isValidGenre', () => {
	it('should return true if its valid', () => {
		expect(isValidGenre('Action')).toBe(true);
	});

	it('should return false if its not valid', () => {
		expect(isValidGenre('FooBar')).toBe(false);
	});
});
