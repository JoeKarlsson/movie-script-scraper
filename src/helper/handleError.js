const handleError = error => {
	console.error(error);
	throw new Error(error, 'Bad response from server');
};

module.exports = handleError;
