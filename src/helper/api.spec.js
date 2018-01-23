const fetchMock = require('fetch-mock');
const fs = require('fs');
const api = require('./api');

jest.mock('./handleError');

const mockData = fs.readFileSync('src/helper/__mocks__/mock_genre_data.xml', {
	encoding: 'utf-8',
});

describe('API', () => {
	beforeEach(() => {
		fetchMock.reset();
	});

	describe('#api', () => {
		it('should return all the script URLs as a promise', () => {
			const genre = 'Action';
			const url = `http://www.imsdb.com/feeds/genre.php?genre=${genre}`;

			fetchMock.mock(url, mockData);

			api(url)
				.then(body => {
					expect(body).toEqual(mockData);
				})
				.catch(error => {
					throw new Error(error);
				});
		});

		// it('should throw an error when invalid error input', () => {
		// 	const url = '/';
		//
		// 	api(url)
		// 		.then(body => {
		// 			expect(body).toEqual(mockData);
		// 		})
		// 		.catch(error => {
		// 			throw new Error(error);
		// 		});
		// });
	});
});
