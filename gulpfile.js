'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	csso = require('gulp-csso'),
	debug = require('gulp-debug');

gulp.task('style', function() {
	return gulp.src('dev/style/**/*.scss')
			.pipe(debug())
	 		.pipe(sass().on('error', sass.logError))
			.pipe(sourcemaps.write())
	    	.pipe(concat('all.css'))
	    	.pipe(csso())
	    	.pipe(debug())
			.pipe(gulp.dest('public/css'))
})