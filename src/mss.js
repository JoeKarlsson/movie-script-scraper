const getScriptsByGenre = require('./getScriptsByGenre');
const getScriptByTitle = require('./getScriptByTitle');

const mss = async argv => {
	let { genre, title, total, dest } = argv;

	title = title || 'Frozen';
	genre = genre || 'Action';
	total = total || 10;
	dest = dest || 'scripts';

	if (genre) {
		const result = await getScriptsByGenre(genre, total, dest);
		return result;
	} else if (title) {
		return getScriptByTitle(title, dest);
	}
	return getScriptsByGenre(dest);
};

module.exports = mss;
