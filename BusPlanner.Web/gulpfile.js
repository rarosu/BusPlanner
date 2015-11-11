var gulp = require('gulp');
var karma = require('karma');
var connect = require('gulp-connect');
var protractor = require('gulp-protractor').protractor;

gulp.task('tdd', function(done) {
	new karma.Server({
		configFile: __dirname + '/karma.conf.js'
	}, done).start();
});

gulp.task('e2e', function() {
	connect.server();
	
	gulp.src(["./tests/e2etests/**/*.js"])
		.pipe(protractor({
			configFile: './protractor.conf.js'
		}))
		.on('error', function(e) {
			throw e;
		});
});

gulp.task('default', ['tdd']);