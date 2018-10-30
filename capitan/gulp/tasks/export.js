/**
 * Description: Copy files
 *
 * */

const gulp = require('gulp');
const gulpif = require('gulp-if');
const replace = require('gulp-replace');
const Config = require('../config');

module.exports = {
	copy: function () {
		gulp.src(Config.paths.templates.dest + '*.html')
			.pipe(gulp.dest(Config.paths.privateDir + '../_capitan_'));

		gulp.src(Config.paths.styles.dest + '**/*')
			.pipe(gulp.dest(Config.paths.privateDir + '../_capitan_/css/'));

		gulp.src(Config.paths.scripts.dest + '**/*')
			.pipe(gulp.dest(Config.paths.privateDir + '../_capitan_/js/'));

		gulp.src(Config.paths.images.dest + '**/*')
			.pipe(gulp.dest(Config.paths.privateDir + '../_capitan_/img/'));

		return gulp.src(Config.paths.fonts.dest + '**/*')
			.pipe(gulp.dest(Config.paths.privateDir + '../_capitan_/fonts/'));
	},
	adjust: function () {
		return gulp.src([
				Config.paths.privateDir + '../_capitan_/**/*.html',
				Config.paths.privateDir + '../_capitan_/**/*.js',
				Config.paths.privateDir + '../_capitan_/**/*.css'
			])
			.pipe(gulpif(Config.paths.liveUrl !== '', replace(Config.paths.liveUrl, './')))
			.pipe(replace(Config.paths.publicRoute, './'))
			.pipe(gulp.dest(Config.paths.privateDir + '../_capitan_'));
	}
};