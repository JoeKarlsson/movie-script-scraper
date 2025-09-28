/**
 * All Scripts Scraper - Downloads scripts from IMSDB's complete script list
 * 
 * This module handles scraping from the all-scripts.html page which contains
 * a comprehensive alphabetical list of all available movie scripts on IMSDB.
 * 
 * URL: https://imsdb.com/all-scripts.html
 */

const addScriptsToDir = require('../genre/helper/addScriptsToDir');
const handleError = require('../helper/handleError');
const api = require('../helper/api');

/**
 * Extracts script URLs from the all-scripts.html page
 * 
 * @function extractAllScriptURLs
 * @param {string} html - The HTML content from all-scripts.html
 * @returns {Array<string>} Array of script URLs
 */
const extractAllScriptURLs = (html) => {
	// Look for script links in the format: /Movie Scripts/[Script Name] Script.html
	const scriptPattern = /href="(\/Movie Scripts\/[^"]+Script\.html)"/gi;
	const matches = html.match(scriptPattern) || [];

	// Extract the actual URLs from the matches and convert to script URLs
	const urls = matches.map(match => {
		const urlMatch = match.match(/href="([^"]+)"/);
		if (urlMatch) {
			// Convert "/Movie Scripts/Die Hard Script.html" to "/scripts/Die-Hard.html"
			const movieScriptPath = urlMatch[1];
			const scriptName = movieScriptPath
				.replace('/Movie Scripts/', '')
				.replace(' Script.html', '')
				.replace(/\s+/g, '-')
				.replace(/[^a-zA-Z0-9-]/g, '');

			return `https://imsdb.com/scripts/${scriptName}.html`;
		}
		return null;
	}).filter(url => url !== null);

	return urls;
};

/**
 * Main function to get all scripts from IMSDB's complete script list
 * 
 * @async
 * @function getAllScripts
 * @param {Object} options - Configuration options
 * @param {string} options.dest - Destination directory for scripts
 * @param {number} options.total - Number of scripts to download (default: 50)
 * @returns {Promise<Array<string>>} Array of file paths to downloaded scripts
 */
const getAllScripts = async (options) => {
	try {
		const { total = 50 } = options;

		console.log(`🌐 Fetching all scripts list from IMSDB...`);

		// Fetch the all-scripts.html page
		const allScriptsUrl = 'https://imsdb.com/all-scripts.html';
		const html = await api(allScriptsUrl);

		// Extract all script URLs
		const allUrls = extractAllScriptURLs(html);
		console.log(`📋 Found ${allUrls.length} total scripts available`);

		// Limit to requested number
		const selectedUrls = allUrls.slice(0, total);
		console.log(`🎯 Selected ${selectedUrls.length} scripts for download`);

		// Use the existing parallel processing logic
		const filePaths = await addScriptsToDir(selectedUrls, {
			...options,
			genre: 'All', // Use 'All' as the genre for organization
			total: selectedUrls.length
		});

		return filePaths;
	} catch (error) {
		return handleError(error);
	}
};

module.exports = getAllScripts;
