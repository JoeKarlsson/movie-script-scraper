const isInvalidScript = jest.fn((script, genre) => {
	// Return false for valid scripts (not invalid)
	return false;
});

module.exports = isInvalidScript;
