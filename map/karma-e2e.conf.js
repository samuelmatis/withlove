// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['ng-scenario'],
        files: [
            'test/e2e/**/*.js'
        ],
        exclude: [],
        port: 8080,
        logLevel: config.LOG_INFO,  // LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false
    });
};
