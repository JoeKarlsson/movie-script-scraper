const string = require('string');

const createURL = title => {
	const urlTitle = string(title)
		.dasherize()
		.titleCase().s;
	return `http://www.imsdb.com/scripts/${urlTitle}.html`;
};

module.exports = createURL;
