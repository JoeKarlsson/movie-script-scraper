const _ = require('lodash');

const isValidGenre = genre => {
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

	const isValid = _.indexOf(genres, genre) > -1;
	return isValid;
};

module.exports = isValidGenre;
