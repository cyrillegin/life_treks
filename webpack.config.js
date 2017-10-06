module.exports = function buildConfig() {
    if (process.env.NODE_ENV === 'production') {
        return require('./webpack.prod.config.js');
    }
    return require('./webpack.dev.config.js');
};
