const string = require('string');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

const randomNum = () => {
	return Math.floor(Math.random() * 100 + 1);
};

const saveScript = (scriptURL, genre, total) => {
	let totalCounter = 0;

	// Randomly choosing if script shall be saved
	if (total !== 0) {
		if (totalCounter === total) return;
		const totalRandomNumber = randomNum();
		if (totalRandomNumber % 3 !== 0) return; // Don't save
	}
	// Request the script page
	request(scriptURL, { rejectUnauthorized: false }, (error, response, html) => {
		// Handle error
		if (error || response.statusCode !== 200) {
			console.log(error);
			return;
		}

		// Extract page contents
		const $ = cheerio.load(html);
		let script = $('table:nth-child(2)').text();
		// Remove whitespace and extra text
		// script = S(script).collapseWhitespace();
		script = script.replace('Search IMSDb', '');
		// Get a clean title
		const title = string($('title').text())
			.chompRight(' Script at IMSDb.')
			.slugify().s;

		// Return if no script (probably TV episode, slightly different URL)
		if (script.length < 500) return;

		// Write to file
		fs.writeFile(`scripts/${genre}/'${title}.txt`, script, err => {
			if (err) console.log(err);
			else console.log(`Saved ${title}`);
		});
		// Increment total counter
	});
	if (total !== 0) ++totalCounter;
};

module.exports = saveScript;
