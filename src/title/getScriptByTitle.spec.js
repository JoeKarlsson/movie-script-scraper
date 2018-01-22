const getScriptByTitle = require('./getScriptByTitle');

jest.mock('../getScript/getScript');

describe('getScriptByTitle', () => {
	it('should return a valid URL for one letter film titles', () => {
		const options = {
			title: 'hellboy',
		};

		const exectedResult = 'scripts/hellboy.txt';
		getScriptByTitle(options).then(result => {
			expect(result).toBe(exectedResult);
		});
	});
});
