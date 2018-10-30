/**
 * Description: watch
 *
 * defines a watcher with paths and files to observe
 * */

const gulp = require('gulp');
const del = require('del');
const scriptsTask = require('./scripts');
const styleTask = require('./styles');
const templateTask = require('./templates');
const serverTask = require('./server');
const styleGuideTask = require('./styleguide');
const copyTask = require('./copy');
const Config = require('../config');
const fileWatcher = gulp.watch(Config.paths.privateDir + 'assets/**/*');

module.exports = watch = () => {
	// template watcher
	gulp.watch(Config.paths.templates.components, gulp.series(templateTask, serverTask.reload));
	gulp.watch(Config.paths.templates.partials, gulp.series(templateTask, serverTask.reload));
	gulp.watch(Config.paths.templates.views, gulp.series(templateTask, serverTask.reload));

	// image watcher
	gulp.watch(Config.paths.images.src, gulp.series(copyTask.img, serverTask.reload));

	// style watcher
	gulp.watch(Config.paths.styles.src, styleTask);
	gulp.watch(Config.paths.styles.partials, styleTask);
	gulp.watch(Config.paths.styles.themeFiles, styleTask);
	gulp.watch(Config.paths.styles.components, styleTask);

	// styleguide watcher
	gulp.watch(Config.paths.privateDir + 'styleguide/builder/*hbs', styleGuideTask);
	gulp.watch(Config.paths.privateDir + 'styleguide/*scss', styleGuideTask);

	// script watcher
	gulp.watch(Config.paths.scripts.watch, scriptsTask);

	// watch if assets are added
	gulp.watch(Config.paths.privateDir + 'assets/**/*', function(event) {
		console.log(event);
	});

	fileWatcher
	.on('add', (path, stats) => {
		console.log('File ' + path + ' was changed');
		// gulp
		// 	.src(path)
		// 	.pipe(gulp.dest(Config.paths.images.dest));
	})
	.on('change', (path, stats) => {
		console.log('File ' + path + ' was changed');
	})
	.on('unlink', (path, stats) => {
		console.log('File ' + path + ' was deleted');
	});
};