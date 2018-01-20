const minimist = require('minimist');
const mss = require('./mss');
const isValidGenre = require('./helper/isValidGenre');

const parseArgs = argv => {
	const { genre, title } = argv;
	let { total } = argv;

	total = total || 10;
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

const cleanArr = arr => {
	return arr.filter(Boolean);
};

const app = async () => {
	const argv = minimist(process.argv.slice(2));
	const clear = parseArgs(argv);

	if (clear) {
		argv.title = argv.title || undefined;
		argv.genre = argv.genre || undefined;
		argv.total = argv.total || undefined;

		const filePaths = await mss(argv);
		console.log('Script scrapping complete!');
		return cleanArr(filePaths);
	}
};

app();
