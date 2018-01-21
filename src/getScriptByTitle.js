const getScript = require('./getScript');
const string = require('string');
const handleError = require('./helper/handleError');

const createURL = title => {
	const urlTitle = string(title)
		.dasherize()
		.titleCase().s;
	return `http://www.imsdb.com/scripts/${urlTitle}.html`;
};

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
