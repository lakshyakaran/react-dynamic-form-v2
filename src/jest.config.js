module.exports = {
    testEnvironment: 'jsdom',  // Ensures Jest runs in a browser-like environment
    transform: {
        '^.+\\.jsx?$': 'babel-jest',  // Transforms JavaScript/JSX files with Babel
    },
};