/**
 * Description: styles
 *
 * compile sass to css
 * add browser optimizations
 * sum up css files to main.css
 * create source maps
 * */

const kss = require('kss');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const serverTask = require('./server');
let Config = require('../config');

module.exports = function styleguide() {
	gulp.src(Config.paths.privateDir + 'styleguide/styleguide.scss')
		.pipe(sass())
		.pipe(postcss([autoprefixer()]))
		.pipe(concat('styleguide.css'))
		.pipe(gulp.dest(Config.paths.privateDir + 'styleguide/dist/'))
		.pipe(serverTask.instance.stream(
			{match: '**/*.css'}
		));

	return kss({
		source: Config.paths.privateDir,
		destination: Config.paths.privateDir + 'styleguide/dist/',
		markup: true,
		title: 'Capitan Styleguide',
		css: [
			Config.paths.publicRoute + 'css/main.css',
			'styleguide.css'
		],
		js: [
			//Config.paths.publicRoute + 'js/main.js'
		],
		mask: [
			'*.scss'
		],
		builder: Config.paths.privateDir + 'styleguide/builder/',
		homepage: 'styleguide/homepage.md'
	});
};
