const { checkDirectory } = require('./fileSystem');

describe('checkDirectory', () => {
	it('should return true if directory exists', () => {
		checkDirectory('scripts', 'Action').then(result => {
			expect(result).toBe(true);
		});
	});
});
