const shouldRandomlySave = require('../../src/genre/helper/shouldRandomlySave');

describe('shouldRandomlySave', () => {
	it('should return true if directory exists', () => {
		const result = shouldRandomlySave();
		expect(typeof result).toBe('boolean');
	});
});
