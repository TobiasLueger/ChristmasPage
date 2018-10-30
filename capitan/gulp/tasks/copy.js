/**
 * Description: Copy files
 *
 * */

const gulp = require('gulp');
let Config = require('../config');

module.exports = {
	svg: function copySvg() {
		return gulp
			.src(Config.paths.svg.srcCopy)
			.pipe(gulp.dest(Config.paths.svg.dest));
	},
	fonts: function copyFonts() {
		return gulp
			.src(Config.paths.fonts.src)
			.pipe(gulp.dest(Config.paths.fonts.dest));
	},
	img: function copyImg() {
		return gulp
			.src(Config.paths.images.src)
			.pipe(gulp.dest(Config.paths.images.dest));
	}
};