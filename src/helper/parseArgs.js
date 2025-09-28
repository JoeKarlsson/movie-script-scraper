/**
 * Command Line Arguments Parser and Validator
 * 
 * This module handles parsing and validating command-line arguments for the movie script scraper.
 * It validates genres, provides user feedback, and determines if the arguments are valid.
 */

const isValidGenre = require('./isValidGenre');

/**
 * Parses and validates command-line arguments for the scraper
 * 
 * @function parseArgs
 * @param {Object} argv - Parsed command-line arguments object
 * @param {string} [argv.genre] - Movie genre to scrape
 * @param {string} [argv.title] - Specific movie title to scrape
 * @param {number} [argv.total] - Number of scripts to download
 * @returns {boolean} True if arguments are valid, false otherwise
 * 
 * Validation Logic:
 * 1. If genre is provided: Validates against allowed genre list
 * 2. If title is provided: Always valid (no validation needed)
 * 3. Provides user feedback for each operation
 * 4. Returns false if genre is invalid, true otherwise
 * 
 * @example
 * const args = { genre: 'Action', total: 5 };
 * const isValid = parseArgs(args); // true
 * 
 * const invalidArgs = { genre: 'InvalidGenre' };
 * const isInvalid = parseArgs(invalidArgs); // false
 */
const parseArgs = argv => {
	const { genre, title, total } = argv;

	let validArgs = true;

	// Validate genre if provided
	if (genre) {
		if (isValidGenre(genre)) {
			// Genre is valid, provide user feedback
			console.log(`Getting ${total} random scripts for movies of ${genre}`);
		} else {
			// Genre is invalid, set flag and provide feedback
			console.log('Sorry, invalid genre.');
			validArgs = false;
		}
	}

	// Handle title-based scraping
	if (title) {
		// Title-based scraping doesn't need validation
		console.log(`Getting script for ${title}`);
		return validArgs;
	}

	// Return validation result
	return validArgs;
};

module.exports = parseArgs;
