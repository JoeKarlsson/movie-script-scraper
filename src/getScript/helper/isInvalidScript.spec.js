const fs = require('fs');
const isInvalidScript = require('./isInvalidScript');

const mockScriptLong = fs.readFileSync(
	'src/genre/helper/__mocks__/data/mock-script.txt',
	{
		encoding: 'utf-8',
	}
);

describe('isInvalidScript', () => {
	it('should true is input is less than 500 characters', () => {
		const mockScriptShort = 'test script';
		const result = isInvalidScript(mockScriptShort);
		expect(result).toBe(true);
	});

	it('should false is input is greater than 500 characters', () => {
		const result = isInvalidScript(mockScriptLong);
		expect(result).toBe(false);
	});
});
