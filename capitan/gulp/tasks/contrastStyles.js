/**
 * Description: styles
 *
 * compile sass to css
 * add browser optimizations
 * sum up css files to main.css
 * create source maps
 * */

const gulp = require('gulp');
const concat = require('gulp-concat');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const postcssHighContrastPlugin = require('postcss-high-contrast');
let Config = require('../config');

module.exports = function contrastStyles() {
	return gulp
		.src(Config.paths.publicDir + 'css/main.css')
		.pipe(postcss([
			postcssHighContrastPlugin({
				aggressiveHC: false, // Will append properties even if they do not exist
				aggressiveHCDefaultSelectorList: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'th', 'td'],
				aggressiveHCCustomSelectorList: ['div', 'span'],

				backgroundColor: '#fff',
				altBgColor: '#aaa',

				textColor: '#000',

				buttonSelector: ['button'],
				buttonColor: '#fff',
				buttonBackgroundColor: '#000',
				buttonBorderColor: 'none',

				linkSelectors:  ['a'],
				linkColor: '#3FAC9A',
				linkHoverColor: '#00C0A1',

				borderColor: '#000',
				disableShadow: true,

				customSelectors: [''],
				customSelectorColor: '#000',
				customSelectorBackgroundColor: '#fff',
				customSelectorBorderdColor: '#000',

				selectorsBlackList: ['.switch__slider:before','ol.list>li:before','.form input[type="radio"] + label:after','.form input[type="radio"] + label:hover:after'],

				imageFilter: 'grayscale(100%) contrast(120%)',
				imageSelectors: ['img'],

				removeCSSProps: true, //remove css props not needed for contrast (only keep whitelisted props)
				CSSPropsWhiteList: ['background', 'background-color', 'color', 'border', 'border-top', 'border-bottom',
					'border-left', 'border-right', 'border-color', 'border-top-color', 'border-right-color',
					'border-bottom-color', 'border-left-color', 'box-shadow', 'filter', 'text-shadow']
			}),
			cssnano({
				reduceIdents: false, // Set to false to prevent animation names to be renamed: https://github.com/ben-eb/gulp-cssnano/issues/52
				discardComments: {
					removeAll: true
				}
			})
		]))
		.pipe(concat('contrast.css'))
		.pipe(gulp.dest(Config.paths.styles.dest));
};
