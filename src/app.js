/*
	eslint-disable prefer-destructuring
*/

const _ = require('lodash');
const getScriptsByGenre = require('./getScriptsByGenre');
const minimist = require('minimist');

const mss = argv => {
	// List of valid genres
	const genres = [
		'Action',
		'Adventure',
		'Animation',
		'Comedy',
		'Crime',
		'Drama',
		'Family',
		'Fantasy',
		'Film-Noir',
		'Horror',
		'Musical',
		'Mystery',
		'Romance',
		'Sci-Fi',
		'Short',
		'Thriller',
		'War',
		'Western',
	];

	// Set default genre and total number of scripts
	let genre = argv.genre || 'Action';
	let total = 0;

	// Check if it's a valid genre and if a total number of scripts was given
	if (!argv.genre && !argv.total) {
		console.log(`Getting all the scripts for movies of ${genre}`);
	} else if (!argv.genre && argv.total) {
		total = argv.total;
		console.log(`Getting ${total} random scripts for movies of ${genre}`);
	} else if (!_.contains(genres, argv.genre)) {
		console.log('Sorry, invalid genre.');
		return;
	} else {
		genre = argv.genre;
		if (argv.total) {
			total = argv.total;
			console.log(`Getting ${total} random scripts for movies of ${genre}`);
		} else {
			console.log(`Getting all scripts for movies of ${genre}`);
		}
		console.log('hit');
	}
	getScriptsByGenre(genre, total);
};

// Process command line arguments
const argv = minimist(process.argv.slice(2));

mss(argv);

module.export = mss;
