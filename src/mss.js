const getScriptsByGenre = require('./getScriptsByGenre');
const getScriptByTitle = require('./getScriptByTitle');

const mss = async argv => {
	const { genre, title, total } = argv;

	if (genre) {
		const result = await getScriptsByGenre(genre, total);
		console.log('result', result);
		return result;
	} else if (title) {
		return getScriptByTitle(title);
	}
	return getScriptsByGenre();
};

module.exports = mss;
