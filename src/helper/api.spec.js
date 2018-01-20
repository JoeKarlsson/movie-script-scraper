const fetchMock = require('fetch-mock');
const fs = require('fs');
const api = require('./api');

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
					console.log(body);
					expect(body).toEqual(mockData);
				})
				.catch(error => {
					throw new Error(error);
				});
		});
	});
});

// const api = url => {
// 	return fetch(url)
// 		.then(response => {
// 			return response.text();
// 		})
// 		.catch(err => {
// 			return handleError(err);
// 		});
// };
//
// module.exports = api;
