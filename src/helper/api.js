/**
 * HTTP API Helper
 * 
 * This module provides a robust HTTP client for making requests to external APIs.
 * It uses node-fetch with retry logic, connection pooling, and error handling.
 * 
 * Used primarily for:
 * - Fetching genre feeds from IMSDB
 * - Downloading individual script pages
 * - Any other HTTP requests needed by the scraper
 */

const fetch = require('node-fetch');
const handleError = require('./handleError');

/**
 * Sleep utility for retry delays
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise} Promise that resolves after the delay
 */
const sleep = ms => new Promise(resolve => {
	setTimeout(resolve, ms);
});

/**
 * Makes an HTTP GET request with retry logic and exponential backoff
 * 
 * @function api
 * @param {string} url - The URL to make the request to
 * @param {Object} options - Request options
 * @param {number} options.maxRetries - Maximum number of retries (default: 3)
 * @param {number} options.retryDelay - Initial retry delay in ms (default: 1000)
 * @param {number} options.timeout - Request timeout in ms (default: 30000)
 * @returns {Promise<string>} The response body as text
 * 
 * Process:
 * 1. Makes a GET request to the provided URL with timeout
 * 2. Converts the response to text format
 * 3. Retries on failure with exponential backoff
 * 4. Handles any persistent errors
 * 
 * @example
 * const data = await api('https://www.imsdb.com/genre/Action');
 * console.log(data); // HTML data containing script URLs
 */
const api = async (url, options = {}) => {
	const {
		maxRetries = 3,
		retryDelay = 1000,
		timeout = 30000
	} = options;

	let lastError;

	// eslint-disable-next-line no-await-in-loop
	for (let attempt = 0; attempt <= maxRetries; attempt++) {
		let timeoutId;
		try {
			// Create AbortController for timeout
			const controller = new AbortController();
			timeoutId = setTimeout(() => controller.abort(), timeout);

			// eslint-disable-next-line no-await-in-loop
			const response = await fetch(url, {
				signal: controller.signal,
				headers: {
					'User-Agent': 'Mozilla/5.0 (compatible; MovieScriptScraper/1.0)',
					'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
					'Accept-Language': 'en-US,en;q=0.5',
					'Accept-Encoding': 'gzip, deflate',
					'Connection': 'keep-alive',
					'Upgrade-Insecure-Requests': '1'
				}
			});

			// Always clear the timeout
			clearTimeout(timeoutId);

			// Check if response is ok
			if (!response.ok) {
				throw new Error(`HTTP ${response.status}: ${response.statusText}`);
			}

			// Convert the response to text format
			// eslint-disable-next-line no-await-in-loop
			return await response.text();

		} catch (error) {
			// Ensure timeout is cleared even on error
			if (timeoutId) {
				clearTimeout(timeoutId);
			}

			lastError = error;

			// Don't retry on the last attempt
			if (attempt === maxRetries) {
				break;
			}

			// Don't retry on certain error types
			if (error.name === 'AbortError' ||
				error.message.includes('404') ||
				error.message.includes('403')) {
				break;
			}

			// Calculate exponential backoff delay
			const delay = retryDelay * 2 ** attempt;
			console.warn(`Request failed (attempt ${attempt + 1}/${maxRetries + 1}), retrying in ${delay}ms:`, error.message);

			// eslint-disable-next-line no-await-in-loop
			await sleep(delay);
		}
	}

	// Handle any persistent errors
	return handleError(lastError);
};

module.exports = api;
