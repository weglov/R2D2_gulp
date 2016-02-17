'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	csso = require('gulp-csso'),
	gulpIf = require('gulp-if'),
	newer = require('gulp-newer'),
	size = require('gulp-size'),
	autoprefixer = require('gulp-autoprefixer'),
	imagemin = require('gulp-imagemin');
	del = require('del'),

	debug = require('gulp-debug');
// Сборка стилей
gulp.task('style', function() {
	return gulp.src('dev/style/**/*.scss')
			.pipe(size())
			.pipe(autoprefixer())
			.pipe(sourcemaps.init())
	 		.pipe(sass().on('error', sass.logError))
	    	.pipe(concat('all.css'))
	    	.pipe(csso())
	    	.pipe(size())
	    	.pipe(sourcemaps.write('.'))
	    	.pipe(debug())
			.pipe(gulp.dest('public/css'))
});

gulp.task('clean', function() {
	return del('public');
});

gulp.task('assets', function() {
	return gulp.src('dev/assets/**')
			.pipe(newer('public'))
			.pipe(imagemin())
			.pipe(gulp.dest('public'));
});


gulp.task('build', gulp.series(
	'clean', 
	gulp.parallel('style', 'assets')
	)
);

gulp.task('watch', function() {
	gulp.watch('dev/style/**/*.*', gulp.series('style'));
	gulp.watch('dev/assets/**/*.*', gulp.series('assets'));
});


gulp.task('dev', gulp.series('build', 'watch'));