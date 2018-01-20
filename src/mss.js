const getScriptsByGenre = require('./getScriptsByGenre');
const getScriptByTitle = require('./getScriptByTitle');

const cleanArr = arr => {
	return arr.filter(Boolean);
};

const mss = async options => {
	let { genre, title, total, dest } = options;

	title = title || 'Frozen';
	genre = genre || 'Action';
	total = total || 10;
	dest = dest || 'scripts';

	if (genre) {
		const filePaths = await getScriptsByGenre(genre, total, dest);
		return cleanArr(filePaths);
	} else if (title) {
		const filePaths = await getScriptByTitle(title, dest);
		return cleanArr(filePaths);
	}
	const filePaths = await getScriptsByGenre(dest);
	return cleanArr(filePaths);
};

module.exports = mss;
