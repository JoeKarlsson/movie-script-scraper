const string = require('string');
const cheerio = require('cheerio');
const api = require('../helper/api');
const handleError = require('../helper/handleError');
const writeToFile = require('./helper/writeToFile');
const isInvalidScript = require('./helper/isInvalidScript');

const getCleanTitle = page => {
	let title = string(page('title').text())
		.chompRight(' Script at IMSDb.')
		.slugify().s;

	const idx = title.indexOf('script-at-imsdb');
	if (idx > 0) {
		title = title.substring(0, idx - 1);
	}
	return title;
};

const extractPageContents = html => {
	const $ = cheerio.load(html);
	let script = $('table:nth-child(2)').text();

	script = script.replace('Search IMSDb', '');

	const title = getCleanTitle($);
	return {
		script,
		title,
	};
};

const getScript = async (url, options) => {
	options.dest = options.dest || 'scripts';
	const { dest, genre } = options;

	try {
		const rawScriptData = await api(url);
		console.log(rawScriptData);
		const { script, title } = extractPageContents(rawScriptData);

		// Return if no script (probably TV episode, slightly different URL)
		if (isInvalidScript(script, genre)) return false;

		if (genre) {
			const path = `${dest}/${genre}/${title}.txt`;
			console.log(path);

			return writeToFile(path, script, title);
		}
		const path = `scripts/${title}.txt`;
		return writeToFile(path, script, title);
	} catch (e) {
		return handleError(e);
	}
};

module.exports = getScript;
