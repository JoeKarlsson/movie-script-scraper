const handleError = error => {
	console.error(error);
	throw new Error(`Bad response from server: ${error}`);
};

module.exports = handleError;
