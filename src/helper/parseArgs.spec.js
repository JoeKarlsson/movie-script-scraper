const parseArgs = require('./parseArgs');

describe('parseArgs', () => {
	it('should return true if all args are clear', () => {
		const mockArgs = {
			title: 'Frozen',
			genre: 'Action',
			total: 1,
			dest: 'scripts',
		};
		const expectedResult = true;
		const result = parseArgs(mockArgs);
		expect(result).toBe(expectedResult);
	});

	it('should return false if an invalid genre is passed in', () => {
		const mockArgs = {
			title: 'Frozen',
			genre: 'FOOBAR',
			total: 1,
			dest: 'scripts',
		};
		const expectedResult = false;
		const result = parseArgs(mockArgs);
		expect(result).toBe(expectedResult);
	});

	it('should return true no args are passed in', () => {
		const mockArgs = {};
		const expectedResult = true;
		const result = parseArgs(mockArgs);
		expect(result).toBe(expectedResult);
	});
});
