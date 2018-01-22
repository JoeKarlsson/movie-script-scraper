const addScriptsToDir = require('./addScriptsToDir');
const mocksUrls = require('./__mocks__/data/mock-urls.json');

jest.mock('../../getScript/getScript');
jest.mock('./shouldRandomlySave');

describe('addScriptsToDir', () => {
	it('should return true if directory exists', () => {
		const options = {
			genre: 'Action',
			dest: 'scripts',
			total: 10,
		};
		const expectedResult = [
			'scripts/hellboy.txt',
			'scripts/hellboy.txt',
			'scripts/hellboy.txt',
			'scripts/hellboy.txt',
			'scripts/hellboy.txt',
			'scripts/hellboy.txt',
			'scripts/hellboy.txt',
			'scripts/hellboy.txt',
			'scripts/hellboy.txt',
			'scripts/hellboy.txt',
			'scripts/hellboy.txt',
			'scripts/hellboy.txt',
			'scripts/hellboy.txt',
			'scripts/hellboy.txt',
			'scripts/hellboy.txt',
			'scripts/hellboy.txt',
			'scripts/hellboy.txt',
			'scripts/hellboy.txt',
			'scripts/hellboy.txt',
			'scripts/hellboy.txt',
			'scripts/hellboy.txt',
			'scripts/hellboy.txt',
			'scripts/hellboy.txt',
			'scripts/hellboy.txt',
			'scripts/hellboy.txt',
			'scripts/hellboy.txt',
			'scripts/hellboy.txt',
			'scripts/hellboy.txt',
		];
		addScriptsToDir(mocksUrls, options).then(result => {
			expect(result).toMatchObject(expectedResult);
		});
	});
});
