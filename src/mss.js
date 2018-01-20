const getScriptsByGenre = require('./getScriptsByGenre');
const getScriptByTitle = require('./getScriptByTitle');
const cleanArr = require('./helper/cleanArr');

const mss = async options => {
	let filePaths;
	let { genre, title, total, dest } = options;

	title = title || 'Frozen';
	genre = genre || 'Action';
	total = total || 10;
	dest = dest || 'scripts';

	if (genre) {
		filePaths = await getScriptsByGenre(genre, total, dest);
	} else if (title) {
		filePaths = await getScriptByTitle(title, dest);
	} else {
		filePaths = await getScriptsByGenre(dest);
	}
	return cleanArr(filePaths);
};

module.exports = mss;
