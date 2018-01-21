const getScriptsByGenre = require('./getScriptsByGenre');
const getScriptByTitle = require('./getScriptByTitle');
const cleanArr = require('./helper/cleanArr');

const setDefaults = options => {
	let { genre, title, total, dest } = options;

	title = title || 'Frozen';
	genre = genre || 'Action';
	total = total || 10;
	dest = dest || 'scripts';

	const defaultOptions = {
		title,
		genre,
		total,
		dest,
	};

	return defaultOptions;
};

const mss = async options => {
	let filePaths;
	const { genre, title } = options;

	if (genre) {
		filePaths = await getScriptsByGenre(options);
	} else if (title) {
		filePaths = await getScriptByTitle(options);
	} else {
		const defaultOptions = setDefaults(options);
		filePaths = await getScriptsByGenre(defaultOptions);
	}
	console.log(filePaths);
	return cleanArr(filePaths);
};

module.exports = mss;
