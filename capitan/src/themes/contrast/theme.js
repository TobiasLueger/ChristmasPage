const path = require('path');
// set the public dir
const publicDir = path.join(process.cwd(), '../', 'Resources/Public/');
// set the private dir
const privateDir = path.join(process.cwd(), 'src/');
// set public route inside project for local development
const publicRoute = '/Resources/Public/';
// set public route of server environment
const liveUrl = '/typo3conf/ext/';

exports.paths = {
	privateDir: privateDir,
	publicDir: publicDir,
	liveUrl: liveUrl,
	scripts: {
		src: [
			//privateDir + 'js/function/**/*.js',
			//privateDir + 'js/handle/**/*.js',
			//privateDir + 'js/util/**/*.js',
			privateDir + 'js/global.js',
			privateDir + 'components/**/*.js'
		],
		dest: publicDir + 'js/',
		watch: [
			privateDir + 'js/**/*.js',
			privateDir + 'components/**/*.js'
		],
		vendor: [
			privateDir + 'js/libs/vendor/jquery/*.js',
			privateDir + 'js/libs/vendor/**/*.js'
		]
	},
	templates: {
		componentsDir: privateDir + 'components',
		components: privateDir + 'components/**/*.hbs',
		srcDir: privateDir + 'templates',
		dest: privateDir + 'templates/',
		helpers: privateDir + 'templates/hbs-helpers.js',
		partials: privateDir + 'templates/partials/**/*.hbs',
		views: privateDir + 'templates/views/**/*.hbs',
		clean: privateDir + 'templates/*.html'
	},
	styles: {
		dest: publicDir + 'css/',
		srcDir: [
			privateDir + 'sass/',
			privateDir + 'components/'
		],
		src: privateDir + 'sass/main.scss',
		partials: privateDir + 'sass/partials/*.scss',
		components: privateDir + 'components/**/*.scss',
		themeFiles: privateDir + 'themes/**/*.scss'
	},
	images: {
		src: privateDir + 'img/**',
		dest: publicDir + 'img/'
	},
	svg: {
		srcDir: privateDir + 'svg/',
		src: privateDir + 'svg/**/*.svg',
		srcCopy: privateDir + 'svg/**/*.svg',
		dest: publicDir + 'svg/'
	},
	fonts: {
		src: privateDir + 'fonts/**/*',
		dest: publicDir + 'fonts'
	},
	routes: {
		[publicRoute]: publicDir,
		[liveUrl]: publicDir
	},
	publicRoute: publicRoute
};