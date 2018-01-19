const getScriptsByGenre = require('./getScriptsByGenre');
const getScriptByTitle = require('./getScriptByTitle');

const mss = argv => {
	const { genre, title, total } = argv;

	if (genre) {
		return getScriptsByGenre(genre, total);
	} else if (title) {
		return getScriptByTitle(title);
	}
	return getScriptsByGenre();
};

module.exports = mss;
