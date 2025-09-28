/**
 * HTTP API Helper
 * 
 * This module provides a simple HTTP client for making requests to external APIs.
 * It uses node-fetch to make HTTP requests and handles responses as text.
 * 
 * Used primarily for:
 * - Fetching genre feeds from IMSDB
 * - Downloading individual script pages
 * - Any other HTTP requests needed by the scraper
 */

const fetch = require('node-fetch');
const handleError = require('./handleError');

/**
 * Makes an HTTP GET request to the specified URL and returns the response as text
 * 
 * @function api
 * @param {string} url - The URL to make the request to
 * @returns {Promise<string>} The response body as text
 * 
 * Process:
 * 1. Makes a GET request to the provided URL
 * 2. Converts the response to text format
 * 3. Handles any errors that occur during the request
 * 
 * @example
 * const data = await api('http://www.imsdb.com/feeds/genre.php?genre=Action');
 * console.log(data); // XML data containing script URLs
 */
const api = url => {
	return fetch(url)
		.then(response => {
			// Convert the response to text format
			// This is suitable for HTML, XML, or plain text responses
			return response.text();
		})
		.catch(err => {
			// Handle any network or HTTP errors
			return handleError(err);
		});
};

module.exports = api;
