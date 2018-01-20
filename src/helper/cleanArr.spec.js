const cleanArr = require('./cleanArr');

describe('cleanArr', () => {
	it('should remove all falsy junk from array', () => {
		const arr = [];
		const expectedResult = [];
		const result = cleanArr(arr);
		expect(result).toMatchObject(expectedResult);
	});
});
