const writeToFile = require('./helper/writeToFile');
const isInvalidScript = require('./helper/isInvalidScript');
const extractPageContents = require('./helper/extractPageContents');
const api = require('../helper/api');
const handleError = require('../helper/handleError');

const getScript = async (url, options) => {
	options.dest = options.dest || 'scripts';
	const { dest, genre } = options;
	try {
		const rawScriptData = await api(url);
		const { script, title } = extractPageContents(rawScriptData);

		// Return if no script (probably TV episode, slightly different URL)
		if (isInvalidScript(script, genre)) return false;

		if (genre) {
			const path = `${dest}/${genre}/${title}.txt`;
			const filePath = await writeToFile(path, script, title);
			return filePath;
		}
		const path = `${dest}/${title}.txt`;
		const filePath = await writeToFile(path, script, title);
		return filePath;
	} catch (e) {
		return handleError(e);
	}
};

module.exports = getScript;
