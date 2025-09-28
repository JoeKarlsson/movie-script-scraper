/**
 * Command Line Arguments Parser and Validator
 * 
 * This module handles parsing and validating command-line arguments for the movie script scraper.
 * It validates genres, provides user feedback, and determines if the arguments are valid.
 * 
 * Note: Title-based scraping has been disabled due to IMSDB URL structure limitations.
 */

const isValidGenre = require('./isValidGenre');

/**
 * Parses and validates command-line arguments for the scraper
 * 
 * @function parseArgs
 * @param {Object} argv - Parsed command-line arguments object
 * @param {string} [argv.genre] - Movie genre to scrape
 * @param {boolean} [argv.all] - Download from all-scripts page
 * @param {number} [argv.total] - Number of scripts to download
 * @returns {boolean} True if arguments are valid, false otherwise
 * 
 * Validation Logic:
 * 1. If all is provided: Validates all-scripts option
 * 2. If genre is provided: Validates against allowed genre list
 * 3. Provides user feedback for each operation
 * 4. Returns false if genre is invalid, true otherwise
 * 5. Uses default values if no options specified
 * 
 * @example
 * const args = { genre: 'Action', total: 5 };
 * const isValid = parseArgs(args); // true
 * 
 * const allArgs = { all: true, total: 20 };
 * const isAllValid = parseArgs(allArgs); // true
 * 
 * const invalidArgs = { genre: 'InvalidGenre' };
 * const isInvalid = parseArgs(invalidArgs); // false
 */
const parseArgs = argv => {
	const { genre, all, total } = argv;

	let validArgs = true;

	// Handle all-scripts option
	if (all) {
		const scriptCount = total || 50;
		console.log(`Getting ${scriptCount} scripts from complete IMSDB script list`);
		return validArgs;
	}

	// Validate genre if provided
	if (genre) {
		if (isValidGenre(genre)) {
			// Genre is valid, provide user feedback
			const scriptCount = total || 10;
			console.log(`Getting ${scriptCount} random scripts for movies of ${genre}`);
		} else {
			// Genre is invalid, set flag and provide feedback
			console.log('Sorry, invalid genre.');
			console.log('Available genres: Action, Adventure, Animation, Comedy, Crime, Drama, Family, Fantasy, Film-Noir, Horror, Musical, Mystery, Romance, Sci-Fi, Short, Thriller, War, Western');
			validArgs = false;
		}
	} else {
		// No genre specified, use default
		const scriptCount = total || 10;
		console.log(`Getting ${scriptCount} random scripts for movies of Action (default)`);
	}

	// Return validation result
	return validArgs;
};

module.exports = parseArgs;
