const isInvalidScript = script => {
	// Return if no script (probably TV episode, slightly different URL)
	if (script.length < 500) {
		return true;
	}
	return false;
};

module.exports = isInvalidScript;
