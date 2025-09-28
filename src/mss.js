/**
 * Movie Script Scraper - Main Scraper Logic
 * 
 * This module contains the core logic for scraping movie scripts from IMSDB.
 * It focuses on genre-based scraping which is more reliable and efficient.
 * 
 * The scraper supports two modes:
 * 1. Genre-based scraping: Downloads multiple scripts from a specific genre
 * 2. Default mode: Uses default settings (Action genre, 10 scripts)
 * 
 * Note: Title-based scraping has been disabled due to IMSDB URL structure limitations.
 */

const getScriptsByGenre = require('./genre/getScriptsByGenre');
const getAllScripts = require('./all/getAllScripts');
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
 * @param {boolean} [options.all] - Download from all-scripts page
 * @param {string} [options.dest] - Destination directory for downloaded scripts
 * @param {number} [options.total] - Number of scripts to download
 * @returns {Promise<Array<string>>} Array of file paths to downloaded scripts
 * 
 * Scraping Modes:
 * 1. If all is true: Scrape from all-scripts page
 * 2. If genre is provided: Scrape multiple scripts from that genre
 * 3. If no options provided: Use default settings (Action genre, 10 scripts)
 */
const mss = async options => {
	try {
		let filePaths;
		const { genre, all } = options;

		// Ensure destination and total have default values
		options.dest = options.dest || 'scripts';
		options.total = options.total || 10;

		console.log(`🚀 Starting movie script scraper...`);
		console.log(`📁 Destination: ${options.dest}`);
		console.log(`📊 Target: ${options.total} script${options.total > 1 ? 's' : ''}`);

		const startTime = Date.now();

		// Route to appropriate scraping method based on provided options
		if (all) {
			// All-scripts scraping: Download from complete script list
			console.log(`🌐 Source: All scripts (complete list)`);
			filePaths = await getAllScripts(options);
			// Clean up any null/undefined values from the results
			filePaths = cleanArr(filePaths);
		} else if (genre) {
			// Genre-based scraping: Download multiple scripts from specified genre
			console.log(`🎬 Genre: ${genre}`);
			filePaths = await getScriptsByGenre(options);
			// Clean up any null/undefined values from the results
			filePaths = cleanArr(filePaths);
		} else {
			// Default mode: Use default settings and scrape by genre
			setDefaults(options);
			console.log(`🎬 Genre: ${options.genre} (default)`);
			filePaths = await getScriptsByGenre(options);
			// Clean up any null/undefined values from the results
			filePaths = cleanArr(filePaths);
		}

		const endTime = Date.now();
		const duration = ((endTime - startTime) / 1000).toFixed(2);
		const successCount = filePaths ? filePaths.length : 0;

		console.log(`\n✅ Scraping complete!`);
		console.log(`📈 Successfully downloaded: ${successCount} script${successCount !== 1 ? 's' : ''}`);
		console.log(`⏱️  Total time: ${duration}s`);
		console.log(`⚡ Average: ${successCount > 0 ? (duration / successCount).toFixed(2) : 0}s per script`);

		return filePaths;
	} catch (e) {
		// Handle any errors that occur during the scraping process
		handleError(e);
	}
};

module.exports = mss;
