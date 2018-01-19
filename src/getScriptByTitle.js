const getScript = require('./getScript');
const string = require('string');

const getScriptByTitle = title => {
	const urlTitle = string(title)
		.dasherize()
		.titleCase().s;
	const url = `http://www.imsdb.com/scripts/${urlTitle}.html`;
	return getScript(url);
};

module.exports = getScriptByTitle;
