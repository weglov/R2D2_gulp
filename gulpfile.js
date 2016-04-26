'use strict';
var $ = require('gulp-load-plugins')();

var gulp = require('gulp');
var del = require('del');
var browserSync = require('browser-sync');
var isdev = true;

// Сборка стилей
gulp.task('style', function() {
	return gulp.src('dev/style/**/*.scss')
			.pipe($.plumber({
				errorHandler: $.notify.onError(function(err) {
		 			return {
		 				title: 'Sass',
		 				message: err.message
		 			};
	 			})
			}))
			.pipe($.if(isdev, $.sourcemaps.init()))
	 		.pipe($.sass())
	 		.pipe($.autoprefixer())
	    	.pipe($.concat('all.css'))
	    	.pipe($.csso())
	    	.pipe($.if(isdev, $.sourcemaps.write()))
	    	.pipe($.debug())
			.pipe(gulp.dest('public/css'))
});



// Сборка JS
gulp.task('script', function() {
	return gulp.src('dev/script/**/*.js')
			.pipe($.plumber({
				errorHandler: $.notify.onError(function(err) {
		 			return {
		 				title: 'JS',
		 				message: err.message
		 			};
	 			})
			}))
			.pipe($.eslint())
			.pipe($.eslint.failAfterError())
			.pipe($.concat('script.js'))
			.pipe(gulp.dest('public/js'))
});


// Полная пересборка

gulp.task('clean', function() {
	return del('public');
});

// Загрузка на ФТП
gulp.task('ftp', function() {
		return gulp.src('public/*')
			.pipe($.ftp({
				host: 'website.com',
				user: 'johndoe',
				pass: '1234'
			}))
});

// Работа с файлами img
gulp.task('assets', function() {
	return gulp.src('dev/assets/**')
			.pipe($.newer('public'))
			.pipe($.plumber({
				errorHandler: $.notify.onError(function(err) {
		 			return {
		 				title: 'IMAGE',
		 				message: err.message
		 			};
	 			})
			}))
			.pipe($.imagemin())
			.pipe(gulp.dest('public'));
});


// Работа с файлами 
gulp.task('files', function() {
	return gulp.src('dev/**/*.html')
			.pipe($.newer('public'))
			.pipe(gulp.dest('public'));
});

// Сборка с нуля
gulp.task('build', gulp.series(
	'clean', 
	gulp.parallel('style', 'assets', 'script', 'files')
	)
);

// Watch 
gulp.task('watch', function() {
	gulp.watch('dev/style/**/*.*', gulp.series('style', 'ftp'));
	gulp.watch('dev/assets/**/*.*', gulp.series('assets'));
	gulp.watch('dev/script/**/*.*', gulp.series('script'));
});


gulp.task('serve', function() {
	browserSync.init({
		server: 'public'
	});
	browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev', 
	gulp.series('build', 
		gulp.parallel('watch', 'serve')
		)
);