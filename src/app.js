const minimist = require('minimist');
const mss = require('./mss');
const isValidGenre = require('./helper/isValidGenre');

const parseArgs = argv => {
	const { genre, total, title } = argv;
	console.log('argv', argv);
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
		return validArgs;
	}

	return validArgs;
};

const app = () => {
	const argv = minimist(process.argv.slice(2));
	const clear = parseArgs(argv);

	if (clear) {
		argv.title = argv.title || null;
		argv.genre = argv.genre || null;
		argv.total = argv.total || null;

		mss(argv);
	}
};

app();
