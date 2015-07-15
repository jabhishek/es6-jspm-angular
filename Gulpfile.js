var gulp = require("gulp");
var server = require('gulp-develop-server');
var runSequence = require('run-sequence');
var $gulp = require('gulp-load-plugins')({
	lazy: false
});

gulp.task('watch', function () {
	"use strict";
	/*gulp.watch(['server/!**!/!*.js'], ['test:server']);*/
	gulp.watch(['server/**/*.js'], ['server:restart']);

	gulp.watch([
		'client/index.html', 'client/app/**/*.js', 'client/app/**/*.html'
	], $gulp.livereload.changed);
});

gulp.task('server:start', function () {
	"use strict";
	server.listen({path: 'server/app.js', execArgv: ['--harmony', '--use_strict']}, $gulp.livereload.listen);
});

gulp.task('server:restart', function () {
	//server.restart();
	server.changed(function (error) {
		if (!error) $gulp.livereload.changed();
	});
});

gulp.task('default', function () {
	runSequence('server:start', 'watch');
});

