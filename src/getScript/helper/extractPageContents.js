const cheerio = require('cheerio');

const title = page => {
	let titleText = page('title').text();

	// Remove ' Script at IMSDb.' suffix
	if (titleText.endsWith(' Script at IMSDb.')) {
		titleText = titleText.slice(0, -' Script at IMSDb.'.length);
	}

	// Convert to slug format
	let title = titleText
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '') // Remove special characters
		.replace(/\s+/g, '-') // Replace spaces with hyphens
		.replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
		.replace(/^-|-$/g, ''); // Remove leading/trailing hyphens

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
