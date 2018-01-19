/*
	eslint-disable prefer-destructuring
*/

const _ = require('lodash');
const minimist = require('minimist');
const mss = require('./mss');

// Process command line arguments
const argv = minimist(process.argv.slice(2));

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
} else if (_.indexOf(genres, argv.genre) > -1) {
	console.log('Sorry, invalid genre.');
} else {
	genre = argv.genre;
	if (argv.total) {
		total = argv.total;
		console.log(`Getting ${total} random scripts for movies of ${genre}`);
	} else {
		console.log(`Getting all scripts for movies of ${genre}`);
	}
}

argv.title = argv.title || null;
argv.genre = argv.genre || null;
argv.total = argv.total || null;

mss(argv);
