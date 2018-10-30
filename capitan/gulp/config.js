// get the base theme paths
const baseTheme = require('../src/themes/base/theme');
const util = require('gulp-util');
let Config = {
	paths: {},
	themeName: 'base'
};

Config.paths = baseTheme.paths;

// check if the theme argument has been set
if (util.env.theme && util.env.theme.length) {
	// get theme data, e.g. themes/themeName/theme.js
	const targetTheme = require('../src/themes/' + util.env.theme + '/theme');

	// check if theme data is valid
	if (targetTheme) {
		// set paths to theme paths
		Config.paths = targetTheme.paths;
		Config.themeName = util.env.theme;
	}
}

module.exports = Config;