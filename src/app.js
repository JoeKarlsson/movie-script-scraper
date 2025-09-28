#!/usr/bin/env node

/**
 * Movie Script Scraper - Main Application Entry Point
 * 
 * This is the main entry point for the movie script scraper application.
 * It handles command-line argument parsing and orchestrates the script scraping process.
 * 
 * Usage:
 *   node src/app.js --genre Action --total 5 --dest ./scripts
 *   node src/app.js --genre Comedy --total 3
 *   node src/app.js --all --total 20 --dest ./all-scripts
 *   node src/app.js (uses defaults: Action genre, 10 scripts, ./scripts dest)
 * 
 * Note: Title-based scraping has been disabled due to IMSDB URL structure limitations.
 * Please use genre-based scraping or the --all option instead, which are more reliable and efficient.
 */

const minimist = require('minimist');
const mss = require('./mss');
const parseArgs = require('./helper/parseArgs');
const handleError = require('./helper/handleError');

/**
 * Main application function that orchestrates the script scraping process
 * 
 * @async
 * @function app
 * @returns {Promise<Array<string>|undefined} Array of file paths to downloaded scripts, or undefined on error
 * 
 * Process Flow:
 * 1. Parse command-line arguments using minimist
 * 2. Validate arguments using parseArgs helper
 * 3. Set default values for undefined options
 * 4. Call main scraper function (mss) with processed options
 * 5. Display results and return file paths
 */
const app = async () => {
	try {
		// Parse command-line arguments into a clean object
		// process.argv.slice(2) removes 'node' and script path, leaving only user arguments
		const argv = minimist(process.argv.slice(2));

		// Check if user is trying to use title-based scraping (disabled)
		if (argv.title) {
			console.error('❌ Title-based scraping has been disabled.');
			console.error('📝 Reason: IMSDB URL structure limitations prevent reliable title-based access.');
			console.error('');
			console.error('✅ Recommended alternatives:');
			console.error('   • Use genre-based scraping: --genre Action --total 5');
			console.error('   • Browse available scripts by genre and select what you need');
			console.error('   • Genre-based scraping is faster and more reliable');
			console.error('');
			console.error('💡 Example usage:');
			console.error('   node src/app.js --genre Action --total 3 --dest ./scripts');
			console.error('   node src/app.js --genre Comedy --total 5');
			return false;
		}

		// Validate the parsed arguments and check for required parameters
		const clear = parseArgs(argv);

		// Only proceed if arguments are valid
		if (clear) {
			// Set undefined values to undefined explicitly (for cleaner object structure)
			argv.genre = argv.genre || undefined;
			argv.total = argv.total || undefined;
			argv.dest = argv.dest || undefined;

			// Call the main scraper function with processed options
			const filePaths = await mss(argv);

			// Display completion message and results
			console.log('Script scrapping complete!');
			console.log(filePaths);

			return filePaths;
		}
	} catch (e) {
		// Handle any errors that occur during the scraping process
		return handleError(e);
	}
};

// Execute the application immediately when this file is run
app();
