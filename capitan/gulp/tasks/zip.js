/**
 * Description: Copy files
 *
 * */

const gulp = require('gulp');
const zip = require('gulp-zip');
const gulpif = require('gulp-if');
const replace = require('gulp-replace');
const Config = require('../config');

module.exports = {
	copy: function () {
		gulp.src(Config.paths.templates.dest + '*.html')
			.pipe(gulp.dest(Config.paths.publicDir + 'zip/'));

		gulp.src(Config.paths.styles.dest + '**/*')
			.pipe(gulp.dest(Config.paths.publicDir + 'zip/css/'));

		gulp.src(Config.paths.scripts.dest + '**/*')
			.pipe(gulp.dest(Config.paths.publicDir + 'zip/js/'));

		gulp.src(Config.paths.images.dest + '**/*')
			.pipe(gulp.dest(Config.paths.publicDir + 'zip/img/'));

		return gulp.src(Config.paths.fonts.dest + '**/*')
			.pipe(gulp.dest(Config.paths.publicDir + 'zip/fonts/'));
	},
	adjust: function () {
		return gulp.src([
			Config.paths.publicDir + 'zip/**/*.html',
			Config.paths.publicDir + 'zip/**/*.js',
			Config.paths.publicDir + 'zip/**/*.css'
		])
			.pipe(replace(Config.paths.publicRoute, './'))
			.pipe(gulpif(Config.paths.liveUrl !== '', replace(Config.paths.liveUrl, './')))
			.pipe(gulp.dest(Config.paths.publicDir + 'zip/'));
	},
	create: function () {
		return gulp.src('**/*', {cwd: Config.paths.publicDir + 'zip/'})
			.pipe(zip('capitan.zip'))
			.pipe(gulp.dest(Config.paths.publicDir));
	}
};