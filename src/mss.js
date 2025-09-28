/**
 * Movie Script Scraper - Main Scraper Logic
 * 
 * This module contains the core logic for scraping movie scripts from IMSDB.
 * It acts as a router that determines whether to scrape by genre or by specific title.
 * 
 * The scraper supports three modes:
 * 1. Genre-based scraping: Downloads multiple scripts from a specific genre
 * 2. Title-based scraping: Downloads a specific script by movie title
 * 3. Default mode: Uses default settings (Action genre, 10 scripts)
 */

const getScriptsByGenre = require('./genre/getScriptsByGenre');
const getScriptByTitle = require('./title/getScriptByTitle');
const cleanArr = require('./helper/cleanArr');
const handleError = require('./helper/handleError');

/**
 * Sets default values for scraper options when no specific options are provided
 * 
 * @function setDefaults
 * @param {Object} options - The options object to set defaults for
 * @param {string} [options.genre] - Movie genre to scrape (default: 'Action')
 * @param {string} [options.dest] - Destination directory for scripts (default: 'scripts')
 * @param {number} [options.total] - Number of scripts to download (default: 10)
 * @returns {Object} The options object with defaults applied
 */
const setDefaults = options => {
	options.genre = options.genre || 'Action';
	options.dest = options.dest || 'scripts';
	options.total = options.total || 10;

	return options;
};

/**
 * Main scraper function that orchestrates the script downloading process
 * 
 * @async
 * @function mss
 * @param {Object} options - Configuration options for the scraper
 * @param {string} [options.genre] - Movie genre to scrape (e.g., 'Action', 'Comedy')
 * @param {string} [options.title] - Specific movie title to scrape
 * @param {string} [options.dest] - Destination directory for downloaded scripts
 * @param {number} [options.total] - Number of scripts to download
 * @returns {Promise<Array<string>>} Array of file paths to downloaded scripts
 * 
 * Scraping Modes:
 * 1. If genre is provided: Scrape multiple scripts from that genre
 * 2. If title is provided: Scrape the specific movie script
 * 3. If neither is provided: Use default settings (Action genre, 10 scripts)
 */
const mss = async options => {
	try {
		let filePaths;
		const { genre, title } = options;

		// Ensure destination and total have default values
		options.dest = options.dest || 'scripts';
		options.total = options.total || 10;

		// Route to appropriate scraping method based on provided options
		if (genre) {
			// Genre-based scraping: Download multiple scripts from specified genre
			filePaths = await getScriptsByGenre(options);
			// Clean up any null/undefined values from the results
			filePaths = cleanArr(filePaths);
		} else if (title) {
			// Title-based scraping: Download specific movie script
			filePaths = await getScriptByTitle(options);
		} else {
			// Default mode: Use default settings and scrape by genre
			setDefaults(options);
			filePaths = await getScriptsByGenre(options);
			// Clean up any null/undefined values from the results
			filePaths = cleanArr(filePaths);
		}

		return filePaths;
	} catch (e) {
		// Handle any errors that occur during the scraping process
		handleError(e);
	}
};

module.exports = mss;
