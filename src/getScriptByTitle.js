const getScript = require('./getScript');
const string = require('string');

const createURL = title => {
	const urlTitle = string(title)
		.dasherize()
		.titleCase().s;
	return `http://www.imsdb.com/scripts/${urlTitle}.html`;
};

const getScriptByTitle = title => {
	const url = createURL(title);
	return getScript(url);
};

module.exports = getScriptByTitle;
