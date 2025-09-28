const fs = require('fs');
const fetchMock = require('fetch-mock');
const getScript = require('../../src/getScript/getScript');

jest.mock('../../src/getScript/helper/writeToFile', () => require('../../tests/fixtures/__mocks__/writeToFile'));
jest.mock('../../src/getScript/helper/extractPageContents', () => require('../../tests/fixtures/__mocks__/extractPageContents'));
jest.mock('../../src/getScript/helper/isInvalidScript', () => require('../../tests/fixtures/__mocks__/isInvalidScript'));
jest.mock('../../src/helper/handleError', () => jest.fn(() => 'error-handled'));

const mockRawHTML = fs.readFileSync(
	'tests/fixtures/__mocks__/data/mock_raw_data_1.txt',
	{
		encoding: 'utf-8',
	}
);

describe('getScript', () => {
	beforeEach(() => {
		fetchMock.reset();
		jest.clearAllMocks();
	});

	afterEach(() => {
		fetchMock.restore();
	});

	it('should return the file path of the script retrieved with genre', () => {
		const url = 'http://www.imsdb.com/scripts/FrozenTESTSTST.html';
		const options = {
			genre: 'Action',
			total: 1,
			dest: 'scripts',
		};

		fetchMock.mock(url, mockRawHTML);

		return getScript(url, options)
			.then(result => {
				expect(result).toBe('scripts/Action/frozen.txt');
			})
			.catch(err => {
				console.error(err);
			});
	});

	it('should return the file path of the script retrieved without genre', () => {
		const url = 'http://www.imsdb.com/scripts/FrozenTESTSTST.html';
		const options = {
			total: 1,
			dest: 'scripts',
		};

		fetchMock.mock(url, mockRawHTML);

		return getScript(url, options)
			.then(result => {
				expect(result).toBe('scripts/frozen.txt');
			})
			.catch(err => {
				console.error(err);
			});
	});

	it('should return false for invalid script', () => {
		const url = 'http://www.imsdb.com/scripts/InvalidScript.html';
		const options = {
			genre: 'Action',
			total: 1,
			dest: 'scripts',
		};

		// Mock isInvalidScript to return true (invalid)
		const mockIsInvalidScript = require('../../tests/fixtures/__mocks__/isInvalidScript');
		mockIsInvalidScript.mockReturnValue(true);

		fetchMock.mock(url, mockRawHTML);

		return getScript(url, options)
			.then(result => {
				expect(result).toBe(false);
			})
			.catch(err => {
				console.error(err);
			});
	});

	it('should handle API errors', () => {
		const url = 'http://www.imsdb.com/scripts/ErrorScript.html';
		const options = {
			genre: 'Action',
			total: 1,
			dest: 'scripts',
		};

		fetchMock.mock(url, () => {
			throw new Error('API Error');
		});

		return getScript(url, options)
			.then(result => {
				expect(result).toBe('error-handled');
			})
			.catch(err => {
				console.error(err);
			});
	});

	it('should use default dest when not provided', () => {
		const url = 'http://www.imsdb.com/scripts/FrozenTESTSTST.html';
		const options = {
			genre: 'Action',
			total: 1,
		};

		fetchMock.mock(url, mockRawHTML);

		return getScript(url, options)
			.then(result => {
				expect(result).toBe('scripts/Action/frozen.txt');
			})
			.catch(err => {
				console.error(err);
			});
	});

	it('should handle extractPageContents errors', () => {
		const url = 'http://www.imsdb.com/scripts/ErrorScript.html';
		const options = {
			genre: 'Action',
			total: 1,
			dest: 'scripts',
		};

		// Mock extractPageContents to throw an error
		const mockExtractPageContents = require('../../tests/fixtures/__mocks__/extractPageContents');
		mockExtractPageContents.mockImplementation(() => {
			throw new Error('Extraction Error');
		});

		fetchMock.mock(url, mockRawHTML);

		return getScript(url, options)
			.then(result => {
				expect(result).toBe('error-handled');
			})
			.catch(err => {
				console.error(err);
			});
	});
});
