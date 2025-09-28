const fs = require('fs');
const fetchMock = require('fetch-mock');
const getAllScripts = require('../../src/all/getAllScripts');

jest.unmock('../../src/getScript/getScript');
jest.mock('../../src/getScript/helper/writeToFile', () => require('../../tests/fixtures/__mocks__/writeToFile'));
jest.mock('../../src/getScript/helper/isInvalidScript', () => require('../../tests/fixtures/__mocks__/isInvalidScript'));
jest.mock('../../src/getScript/helper/extractPageContents', () => require('../../tests/fixtures/__mocks__/extractPageContents'));
jest.mock('../../src/genre/helper/fileSystem', () => require('../../tests/fixtures/__mocks__/fileSystem'));
jest.mock('../../src/genre/helper/addScriptsToDir', () => require('../../tests/fixtures/__mocks__/addScriptsToDir'));

const mockAllScriptsData = fs.readFileSync(
    'tests/fixtures/__mocks__/data/mock_genre_data.xml',
    {
        encoding: 'utf-8',
    }
);

describe('getAllScripts', () => {
    beforeEach(() => {
        fetchMock.reset();
    });

    it('should return an array of filePaths from all-scripts page', () => {
        const allScriptsUrl = 'https://imsdb.com/all-scripts.html';
        fetchMock.mock(allScriptsUrl, mockAllScriptsData);

        const options = {
            all: true,
            total: 2,
            dest: 'scripts',
        };

        const expectedResult = [
            'scripts/Action/frozen.txt',
            'scripts/Action/frozen.txt',
            'scripts/Action/frozen.txt'
        ];

        return getAllScripts(options)
            .then(result => {
                expect(result).toMatchObject(expectedResult);
            });
    });

    it('should handle errors gracefully', () => {
        const allScriptsUrl = 'https://imsdb.com/all-scripts.html';
        fetchMock.mock(allScriptsUrl, 500);

        const options = {
            all: true,
            total: 2,
            dest: 'scripts',
        };

        return getAllScripts(options)
            .then(result => {
                expect(result).toEqual(['scripts/Action/frozen.txt', 'scripts/Action/frozen.txt', 'scripts/Action/frozen.txt']);
            });
    });
});
