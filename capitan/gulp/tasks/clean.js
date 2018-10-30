/**
 * Description: clean
 *
 * */
const del = require('del');
let Config = require('../config');

module.exports = {
	publicFiles: function (done) {
		del(
			[
				//Config.paths.scripts.dest, // Enable recreate path
				Config.paths.styles.dest + 'main.css',
				Config.paths.templates.clean
			],
			{
				// has to be forced if outside of current cwd
				force: true
			}
		);
		done();
	},
	zipFiles: function (done) {
		del(
			Config.paths.publicDir + 'zip',
			{ force: true }
		);
		done();
	}
};
