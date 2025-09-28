const fs = require('fs');
const extractPageContents = require('../../src/getScript/helper/extractPageContents');

const mockRawHTML = fs.readFileSync(
	'tests/fixtures/__mocks__/data/mock_raw_data_1.txt',
	{
		encoding: 'utf-8',
	}
);

const mockScript = fs.readFileSync(
	'tests/fixtures/__mocks__/data/mock_script_frozen.txt',
	{
		encoding: 'utf-8',
	}
);

describe('extractPageContents', () => {
	it('should extract the title of the script', () => {
		const result = extractPageContents(mockRawHTML);
		expect(result.title).toBe('frozen');
	});

	it('should extract the script from the raw HTML', () => {
		const result = extractPageContents(mockRawHTML);
		// Normalize whitespace for comparison
		const normalizedResult = result.script.replace(/\s+/g, ' ').trim();
		const normalizedExpected = mockScript.replace(/\s+/g, ' ').trim();
		expect(normalizedResult).toBe(normalizedExpected);
	});
});
