const shouldRandomlySave = jest.fn(() => {
    // Always return true for testing
    return true;
});

module.exports = shouldRandomlySave;
