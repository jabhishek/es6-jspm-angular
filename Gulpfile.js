var gulp = require("gulp");
var server = require('gulp-develop-server');
var runSequence = require('run-sequence');
var $gulp = require('gulp-load-plugins')({
	lazy: false
});
var inject = require('gulp-inject');
var exec = require('child_process').exec;
var argv = require('yargs').argv;

gulp.task('watch', function () {
	"use strict";
	gulp.watch(['server/**/*.js'], ['server:restart']);

	gulp.watch([
		'client/index.html', 'client/app/**/*.js', 'client/app/**/*.html'
	], $gulp.livereload.changed);
});

gulp.task('server:start', function () {
	"use strict";
	var mode = argv.production ? 'production' : 'development';
	server.listen({
			path: 'server/app.js',
			execArgv: ['--harmony', '--use_strict'],
			env: { PORT: 5000, NODE_ENV: mode }
		},
		$gulp.livereload.listen);
});

gulp.task('server:restart', function () {
	server.changed(function (error) {
		if (!error) $gulp.livereload.changed();
	});
});

/* Run "gulp --production" if want to run in production mode (files served from build folder) */
gulp.task('default', function () {
	runSequence('server:start', 'watch');
});

/* Distribution tasks */

gulp.task('build:js', function (cb) {
	exec('jspm bundle-sfx app/bootstrap build/app.js --minify --no-mangle', function (err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
});

gulp.task('html', ['build:js'], function () {
	var target = gulp.src('./client/index.html');
	var sources = gulp.src(['./build/app.js'], {read: false});

	return target
		.pipe(inject(sources, {addRootSlash: false, ignorePath: 'build'}))
		.pipe(gulp.dest('./build/'));
});

gulp.task('dist', function () {
	runSequence('html');
});
