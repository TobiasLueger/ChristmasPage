
/**
 * Gulpfile
 *
 * Tasks:
 * npm start = start workflow
 * npm start build = ready for production
 * */
const gulp = require('gulp');

/**
 * load tasks
 */
const scriptsTask = require('./gulp/tasks/scripts');
const styleTask = require('./gulp/tasks/styles');
const contrastStyleTask = require('./gulp/tasks/contrastStyles');
const templateTask = require('./gulp/tasks/templates');
const watchTask = require('./gulp/tasks/watch');
const cleanTask = require('./gulp/tasks/clean');
const zipTask = require('./gulp/tasks/zip');
const exportTask = require('./gulp/tasks/export');
const serverTask = require('./gulp/tasks/server');
const copyTask = require('./gulp/tasks/copy');
const styleGuideTask = require('./gulp/tasks/styleguide');

/////////////////////////////////////////////////
// Tasks
/////////////////////////////////////////////////

/**
 * Description: default
 *
 * start workflow
 * */

gulp.task(
	'default',
	gulp.series(
		cleanTask.publicFiles,
		gulp.parallel(
			scriptsTask,
			styleTask,
			templateTask,
			copyTask.img,
			copyTask.fonts,
		),
		serverTask.serve,
		watchTask,
	),
);


/**
 * Description: build
 *
 * compile files ready for deployment
 * */

gulp.task(
	'build',
	gulp.series(
		cleanTask.publicFiles,
		gulp.parallel(
			scriptsTask,
			styleTask,
			templateTask,
			copyTask.img,
			copyTask.fonts,
		),
		contrastStyleTask,
		function (done) {
			// force build task to terminate
			done();
			process.exit(0);
		}
	),
);

/**
 * creates zip
 */
gulp.task(
	'zip',
	gulp.series(
		zipTask.copy,
		zipTask.adjust,
		zipTask.create,
		cleanTask.zipFiles
	)
);

/**
 * prepare for export
 */
gulp.task(
	'export',
	gulp.series(
		exportTask.copy,
		exportTask.adjust,
		function (done) {
			// force build task to terminate
			done();
			process.exit(0);
		}
	)
);

/**
 * creates styleguide
 */
gulp.task(
	'styleguide',
	gulp.series(
		styleGuideTask
	)
);
