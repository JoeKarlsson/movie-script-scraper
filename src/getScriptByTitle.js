const getScript = require('./getScript');
const string = require('string');

const createURL = title => {
	const urlTitle = string(title)
		.dasherize()
		.titleCase().s;
	return `http://www.imsdb.com/scripts/${urlTitle}.html`;
};

const getScriptByTitle = (title, dest = 'script') => {
	const url = createURL(title);
	const options = {
		url,
		dest,
	};
	return getScript(options);
};

module.exports = getScriptByTitle;
