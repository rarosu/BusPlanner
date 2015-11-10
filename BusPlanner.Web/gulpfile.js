var gulp = require('gulp');
var karma = require('karma');

gulp.task('tdd', function(done) {
	new karma.Server({
		configFile: __dirname + '/karma.conf.js'
	}, done).start();
});

gulp.task('default', ['tdd']);