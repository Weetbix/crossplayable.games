module.exports = {
    transform: {
        // Avoid overriding the gatsby build in magical but not visible
        // babel config, by specifying a special babel config for jest
        '\\.ts$': ['babel-jest', { configFile: './babel.config.jest.js' }]
    },
};