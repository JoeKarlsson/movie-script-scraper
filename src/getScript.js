const string = require('string');
const fs = require('fs');
const cheerio = require('cheerio');
const api = require('./api');
const handleError = require('./helper/handleError');

const writeToFile = (path, script, title) => {
	fs.writeFile(path, script, err => {
		if (err) console.log(err);
		else console.log(`Saved ${title}`);
	});
};

const getCleanTitle = $ => {
	let title = string($('title').text())
		.chompRight(' Script at IMSDb.')
		.slugify().s;

	const idx = title.indexOf('script-at-imsdb');
	if (idx > 0) {
		title = title.substring(0, idx - 1);
	}
	return title;
};

const extractPageContents = html => {
	// Extract page contents
	const $ = cheerio.load(html);

	let script = $('table:nth-child(2)').text();

	script = script.replace('Search IMSDb', '');

	const title = getCleanTitle($);
	return {
		script,
		title,
	};
};

const getScript = async (scriptURL, genre = null) => {
	try {
		console.log('scriptURL', scriptURL);
		const rawScriptData = await api(scriptURL);
		// console.log('rawScriptData', rawScriptData);
		const { script, title } = extractPageContents(rawScriptData);

		// Return if no script (probably TV episode, slightly different URL)
		if (script.length < 500) return;

		if (genre) {
			const path = `scripts/${genre}/${title}.txt`;
			writeToFile(path, script, title);
		} else {
			const path = `scripts/${title}.txt`;
			writeToFile(path, script, title);
		}
	} catch (e) {
		handleError(e);
	}
};

module.exports = getScript;
