const getScriptByTitle = require('./getScriptByTitle');

jest.mock('../getScript/getScript');
jest.mock('../helper/handleError');

describe('getScriptByTitle', () => {
	it('should return a valid URL for one letter film titles', () => {
		const options = {
			title: 'hellboy',
		};

		const exectedResult = 'scripts/frozen.txt';
		getScriptByTitle(options)
			.then(result => {
				expect(result).toBe(exectedResult);
			})
			.catch(e => {
				console.error(e);
			});
	});

	it('should throw an error when invalid error input', () => {
		const options = null;

		getScriptByTitle(options)
			.then(result => {
				expect(result).toBe(undefined);
			})
			.catch(e => {
				console.error(e);
			});
	});
});
