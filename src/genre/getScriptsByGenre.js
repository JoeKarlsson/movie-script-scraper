const { removeExtraScripts } = require('./helper/fileSystem');
const handleURLs = require('./helper/handleURLs');
const addScriptsToDir = require('./helper/addScriptsToDir');
const api = require('../helper/api');
const isValidGenre = require('../helper/isValidGenre');
const handleError = require('../helper/handleError');

const getScriptsByGenre = async options => {
	const { genre } = options;

	if (isValidGenre(genre)) {
		try {
			const url = `http://www.imsdb.com/feeds/genre.php?genre=${genre}`;
			const rawURLs = await api(url);
			const urls = handleURLs(rawURLs);
			const filePaths = await addScriptsToDir(urls, options);
			const prunedFilePaths = await removeExtraScripts(
				filePaths,
				options.total
			);
			return prunedFilePaths;
		} catch (err) {
			return handleError(err);
		}
	}
	handleError('Invalid Genre');
};

module.exports = getScriptsByGenre;
