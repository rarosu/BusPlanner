module.exports = function (config) {
    config.set({
        files: [
            'bower_components/angular/angular.min.js',
            'bower_components/angular-route/angular-route.min.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'scripts/**/*.js',
            'views/**/*.js',
            'index.html',
			'tests/unittests/**/*.js'
        ],
        frameworks: ['jasmine'],
        browsers: ['Firefox']
    });
};