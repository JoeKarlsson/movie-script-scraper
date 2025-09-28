/**
 * Genre-based Script Scraper
 * 
 * This module handles scraping multiple movie scripts from a specific genre on IMSDB.
 * It fetches a list of scripts from the genre feed, processes the URLs, downloads
 * the scripts, and manages the file system operations.
 * 
 * Process Flow:
 * 1. Validate the provided genre
 * 2. Fetch the genre feed from IMSDB
 * 3. Parse and process the script URLs
 * 4. Download scripts and save to filesystem
 * 5. Remove extra scripts to match the requested total
 */

const { removeExtraScripts } = require('./helper/fileSystem');
const handleURLs = require('./helper/handleURLs');
const addScriptsToDir = require('./helper/addScriptsToDir');
const api = require('../helper/api');
const isValidGenre = require('../helper/isValidGenre');
const handleError = require('../helper/handleError');

/**
 * Scrapes movie scripts from a specific genre on IMSDB
 * 
 * @async
 * @function getScriptsByGenre
 * @param {Object} options - Configuration options for genre scraping
 * @param {string} options.genre - The movie genre to scrape (e.g., 'Action', 'Comedy')
 * @param {string} [options.dest] - Destination directory for downloaded scripts
 * @param {number} [options.total] - Maximum number of scripts to download
 * @returns {Promise<Array<string>>} Array of file paths to downloaded scripts
 * 
 * Process Steps:
 * 1. Validates the genre against allowed values
 * 2. Constructs IMSDB genre feed URL
 * 3. Fetches raw genre data from IMSDB
 * 4. Parses script URLs from the response
 * 5. Downloads scripts and saves to filesystem
 * 6. Removes excess scripts to match requested total
 */
const getScriptsByGenre = async options => {
	const { genre } = options;

	// Validate the genre before proceeding with scraping
	if (isValidGenre(genre)) {
		try {
			// Construct the IMSDB genre feed URL
			// This endpoint returns XML data containing script URLs for the specified genre
			const url = `https://imsdb.com/genre/${genre}`;

			// Fetch the raw genre data from IMSDB
			const rawURLs = await api(url);

			// Parse the raw data and extract script URLs
			const urls = handleURLs(rawURLs);

			// Download scripts and save them to the filesystem
			// This function handles the actual downloading and file creation
			const filePaths = await addScriptsToDir(urls, options);

			// Remove excess scripts to match the requested total
			// This ensures we don't exceed the user's requested number of scripts
			const prunedFilePaths = await removeExtraScripts(
				filePaths,
				options.total
			);

			return prunedFilePaths;
		} catch (err) {
			// Handle any errors that occur during the scraping process
			return handleError(err);
		}
	}

	// Handle invalid genre error
	handleError('Invalid Genre');
};

module.exports = getScriptsByGenre;
