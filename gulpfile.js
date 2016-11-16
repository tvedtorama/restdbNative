"use strict"

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var gulpBabel = require('gulp-babel');
var ts = require('gulp-typescript');

function compileTypescript(fileSpec, folder, singleFile) {
	var options = {jsx: 'react', moduleResolution: 'node', target: 'ES6', module: 'CommonJS'}
	if (singleFile)
		options.out = singleFile
	return gulp
		.src(fileSpec)
		.on('end', function() { console.log('Done compiling typescript, or actually just started'); })
		.pipe(sourcemaps.init())
		.pipe(ts(options))
 		.pipe(gulpBabel({presets: ['react', 'es2015', 'stage-0']})) // This blows up the module import
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(folder));
}

var appTsPath = ['./app/**/*.ts*', "./typings/index.d.ts"]



function compileTsAppForTests() {
	return compileTypescript(appTsPath, './build/app') // Note: typescript requires the modules to be in the same relative directory.
}

gulp.task('buildTsAppForTests', function() {return compileTsAppForTests(); })
gulp.task('watchTsAppForTests', function() { return gulp.watch(appTsPath, ["buildTsAppForTests"]) });


gulp.task('build', ['buildTsAppForTests'])
gulp.task('watch', ['build', 'watchTsAppForTests']);
gulp.task('ci', ['build'])

gulp.task('default', ['watch']);
