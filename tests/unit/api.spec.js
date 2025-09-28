const fs = require('fs');
const api = require('../../src/helper/api');

// Mock node-fetch
jest.mock('node-fetch');
const fetch = require('node-fetch');

jest.mock('../../src/helper/handleError');

const mockData = fs.readFileSync('tests/fixtures/__mocks__/data/mock_genre_data.xml', {
	encoding: 'utf-8',
});

describe('API', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('#api', () => {
		it('should return all the script URLs as a promise', async () => {
			const genre = 'Action';
			const url = `http://www.imsdb.com/feeds/genre.php?genre=${genre}`;

			// Mock the fetch response with proper structure
			fetch.mockResolvedValue({
				ok: true,
				text: () => Promise.resolve(mockData)
			});

			const result = await api(url);
			expect(result).toEqual(mockData);
			expect(fetch).toHaveBeenCalledWith(url, expect.objectContaining({
				signal: expect.any(Object),
				headers: expect.objectContaining({
					'User-Agent': expect.any(String),
					'Accept': expect.any(String)
				})
			}));
		});

		it('should retry on network failure', async () => {
			const url = 'http://test.com';

			// Mock first call to fail, second to succeed
			fetch
				.mockRejectedValueOnce(new Error('Network error'))
				.mockResolvedValueOnce({
					ok: true,
					text: () => Promise.resolve('success')
				});

			const result = await api(url, { maxRetries: 1, retryDelay: 10, timeout: 100 });
			expect(result).toEqual('success');
			expect(fetch).toHaveBeenCalledTimes(2);
		});

		it('should handle HTTP error responses', async () => {
			const url = 'http://test.com';

			fetch.mockResolvedValue({
				ok: false,
				status: 404,
				statusText: 'Not Found'
			});

			const result = await api(url);
			expect(result).toBeUndefined(); // Should call handleError
		});
	});
});
