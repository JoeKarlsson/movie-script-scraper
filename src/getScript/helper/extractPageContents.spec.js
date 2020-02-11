const fs = require('fs');
const extractPageContents = require('./extractPageContents');

const mockRawHTML = fs.readFileSync(
	'src/genre/helper/__mocks__/data/mock_raw_data_1.txt',
	{
		encoding: 'utf-8',
	}
);

const mockScript = fs.readFileSync(
	'src/genre/helper/__mocks__/data/mock_script_frozen.txt',
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
		expect(result.script).toBe(mockScript);
	});
});
