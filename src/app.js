const minimist = require('minimist');
const mss = require('./mss');
const parseArgs = require('./helper/parseArgs');
const handleError = require('./helper/handleError');

const app = async () => {
	try {
		const argv = minimist(process.argv.slice(2));
		const clear = parseArgs(argv);

		if (clear) {
			argv.title = argv.title || undefined;
			argv.genre = argv.genre || undefined;
			argv.total = argv.total || undefined;
			argv.dest = argv.dest || undefined;

			const filePaths = await mss(argv);
			console.log('Script scrapping complete!');
			console.log(filePaths);
			return filePaths;
		}
	} catch (e) {
		return handleError(e);
	}
};

app();
