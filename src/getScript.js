const string = require('string');
const fs = require('fs');
const util = require('util');
const cheerio = require('cheerio');
const api = require('./api');
const handleError = require('./helper/handleError');

const writeFile = util.promisify(fs.writeFile);

const writeToFile = (path, script, title) => {
	return writeFile(path, script)
		.then(() => {
			console.log(`Saved ${title}`);
			return path;
		})
		.catch(err => {
			return handleError(err);
		});
};

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

const invalidScript = (script, genre) => {
	// Return if no script (probably TV episode, slightly different URL)
	if (script.length < 500 && !genre) {
		return true;
	}
	return false;
};

const getScript = async (scriptURL, dest = 'scripts', genre = null) => {
	try {
		const rawScriptData = await api(scriptURL);
		const { script, title } = extractPageContents(rawScriptData);

		// Return if no script (probably TV episode, slightly different URL)
		if (invalidScript(script, genre)) {
			return handleError('Script not found');
		}

		if (genre) {
			const path = `${dest}/${genre}/${title}.txt`;
			return writeToFile(path, script, title);
		}
		const path = `scripts/${title}.txt`;
		return writeToFile(path, script, title);
	} catch (e) {
		return handleError(e);
	}
};

module.exports = getScript;
