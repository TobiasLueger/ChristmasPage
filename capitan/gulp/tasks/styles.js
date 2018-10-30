/**
 * Description: styles
 *
 * compile sass to css
 * add browser optimizations
 * sum up css files to main.css
 * create source maps
 * */

const gulp = require('gulp');
const util = require('gulp-util');
const concat = require('gulp-concat');
const serverTask = require('./server');
const production = Boolean(util.env.production);
const gulpif = require('gulp-if');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
let Config = require('../config');

module.exports = function styles() {
	// autoprefixer browserList is defined in package.json -
	// https://github.com/ai/browserslist
	const plugins = [
		autoprefixer({ grid: true })
	];
	let includePaths = [];

	if (Config.themeName) {
		includePaths = [
			// use include paths to load scss files depending on provided theme
			Config.paths.privateDir + 'themes/' + Config.themeName + '/'
		]
	}

	if (production) {
		plugins.push(cssnano({
			reduceIdents: false, // Set to false to prevent animation names to be renamed: https://github.com/ben-eb/gulp-cssnano/issues/52
			discardComments: {
				removeAll: true
			}
		}));
	}

	return gulp
		.src(Config.paths.styles.src)
		.pipe(plumber())
		.pipe(gulpif(!production, sourcemaps.init()))
		.pipe(sass({
			includePaths: includePaths
		}))
		.pipe(postcss(plugins))
		.pipe(concat('main.css'))
		.pipe(gulpif(!production, sourcemaps.write('./')))
		.pipe(gulp.dest(Config.paths.styles.dest))
		.pipe(serverTask.instance.stream(
			{match: '**/*.css'}
		));
};
