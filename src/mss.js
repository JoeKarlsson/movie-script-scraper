const getScriptsByGenre = require('./genre/getScriptsByGenre');
const getScriptByTitle = require('./title/getScriptByTitle');
const cleanArr = require('./helper/cleanArr');
const handleError = require('./helper/handleError');

const setDefaults = options => {
	options.genre = options.genre || 'Action';
	options.dest = options.dest || 'scripts';
	options.total = options.total || 10;

	return options;
};

const mss = async options => {
	try {
		let filePaths;
		const { genre, title } = options;
		options.dest = options.dest || 'scripts';
		options.total = options.total || 10;

		if (genre) {
			filePaths = await getScriptsByGenre(options);
			filePaths = cleanArr(filePaths);
		} else if (title) {
			filePaths = await getScriptByTitle(options);
		} else {
			setDefaults(options);
			filePaths = await getScriptsByGenre(options);
			filePaths = cleanArr(filePaths);
		}
		return filePaths;
	} catch (e) {
		handleError(e);
	}
};

module.exports = mss;
