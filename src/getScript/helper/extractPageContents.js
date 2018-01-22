const string = require('string');
const cheerio = require('cheerio');

const title = page => {
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

	const cleanTitle = title($);
	return {
		script,
		title: cleanTitle,
	};
};

module.exports = extractPageContents;
