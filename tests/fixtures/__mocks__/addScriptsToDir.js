const addScriptsToDir = jest.fn((urls, options) => {
    // Return mock file paths based on the test expectations
    return Promise.resolve([
        'scripts/Action/frozen.txt',
        'scripts/Action/frozen.txt',
        'scripts/Action/frozen.txt'
    ]);
});

module.exports = addScriptsToDir;
