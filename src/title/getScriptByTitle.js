const getScript = require('../getScript/getScript');
const handleError = require('../helper/handleError');
const createURL = require('./helper/createURL');

const getScriptByTitle = async options => {
	try {
		const url = createURL(options.title);
		const filePath = await getScript(url, options);
		return filePath;
	} catch (e) {
		handleError(e);
	}
};

module.exports = getScriptByTitle;
