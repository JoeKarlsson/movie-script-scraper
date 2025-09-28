const fileSystem = {
    checkDirectory: jest.fn((dest, genre) => {
        return Promise.resolve(true);
    }),
    removeExtraScripts: jest.fn((filePaths, total) => {
        return Promise.resolve(filePaths.slice(0, total));
    })
};

module.exports = fileSystem;
