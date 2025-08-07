const baseConfig = require('./wdio.conf.js').config;

exports.config = {
    ...baseConfig,
    framework: 'cucumber',
    specs: ['./test/features/**/*.feature'],
    cucumberOpts: {
        require: ['./test/features/step-definitions/*.js'],
        timeout: 60000,
        ignoreUndefinedDefinitions: true
    }
};
