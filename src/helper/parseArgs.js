const isValidGenre = require('./isValidGenre');

const parseArgs = argv => {
	const { genre, title, total } = argv;

	let validArgs = true;

	if (genre) {
		if (isValidGenre(genre)) {
			console.log(`Getting ${total} random scripts for movies of ${genre}`);
		} else {
			console.log('Sorry, invalid genre.');
			validArgs = false;
		}
	}
	if (title) {
		console.log(`Getting script for ${title}`);
		return validArgs;
	}

	return validArgs;
};

module.exports = parseArgs;
