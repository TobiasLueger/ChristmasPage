/**
 * Description: templates
 *
 * compile handlebars- to html-templates
 * */

const gulp = require('gulp');
const glob = require('glob');
const sassExtract = require('sass-extract');
const helpers = require('../../src/templates/helpers/hbs-helpers');
const handlebars = require('gulp-compile-handlebars');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
let Config = require('../config');

function extractSassToHelpers() {
	const rendered = sassExtract.renderSync({
		file: Config.paths.privateDir + 'sass/partials/_variables.scss'
	});

	let themeRendered = null;

	if (Config.themeName) {
		themeRendered = sassExtract.renderSync({
			file: Config.paths.privateDir + 'themes/' + Config.themeName + '/partials/_variables.scss'
		});
	}

	Object.assign(helpers, {
		iconRender: (items, options) => {
			let out = '';

			// if a theme is provided - use vars from theme
			items = themeRendered !== null ? themeRendered.vars.global['$icons'].value : rendered.vars.global['$icons'].value;

			for (let icon in items) {
				out += '<li class="util-icon util-icon--before util-icon--' + icon +'"><span>' + icon + '</span></li>';
			}

			return out;
		}
	});

	Object.assign(helpers, {
		colorRender: (items, options) => {
			let out = '';

			// if a theme is provided - use vars from theme
			items = themeRendered !== null ? themeRendered.vars.global['$colors'].value : rendered.vars.global['$colors'].value;

			for (let color in items) {
				out += '<div class="col-xs-6 col-md-4 col-lg-2"><div style="background-color: ' + items[color].value.hex + '" class="util-color-tile">' + items[color].value.hex + '</div><p>' + color + '</p></div>';
			}

			return out;
		}
	});

	Object.assign(helpers, {
		breakpointRender: (items, options) => {
			let out = '';

			items = rendered.vars.global['$grid-breakpoints'].value;

			for (let breakpoint in items) {
				out +=  '<li><span>' + breakpoint + '</span><span>' + items[breakpoint].value + '</span></li>';
			}

			return out;
		}
	});
}

const getDirectoriesFromGlob = (path, existingArray) => {
	const fileArray = existingArray || [];

	glob.sync(path)
		.forEach(filePath =>
			fileArray.push(filePath.substring(0, filePath.lastIndexOf('/'))));

	return fileArray;
};

module.exports = function templates() {
	const localPartials = [
		Config.paths.templates.srcDir + '/partials/layouts',
		Config.paths.templates.srcDir + '/partials/includes',
	];

	// assign sass variables to helpers, to display them in the frontend
	extractSassToHelpers();

	const options = {
		ignorePartials: true,
		batch: getDirectoriesFromGlob(
			Config.paths.templates.componentsDir + '/**/*.hbs',
			localPartials,
		),
		helpers,
	};

	return gulp
		.src(Config.paths.templates.views)
		.pipe(plumber())
		.pipe(handlebars('', options))
		.pipe(rename((path) => {
			// eslint-disable-next-line no-param-reassign
			path.extname = '.html';
		}))
		.pipe(gulp.dest(Config.paths.templates.dest));
};
