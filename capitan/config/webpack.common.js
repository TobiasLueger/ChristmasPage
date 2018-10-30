const webpack = require('webpack');
const path = require('path');
const util = require('gulp-util');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const production = Boolean(util.env.production);
let Config = require('../gulp/config');

module.exports = {
	entry: {
		main: Config.paths.privateDir + 'js/global.js'
	},
	output: {
		filename: '[name].js',
		chunkFilename: '[name].bundle.js'
	},
	externals: [
		{
			"window": "window" // needed for scripts that require the window object - tell webpack that the window object will be present inside the users environment - https://webpack.js.org/configuration/externals/
		}
	],
	module: {
		// noParse: /(js\/libs\/vendor).+?(.js)$/, // tells webpack to not parse these files - regex for vendor files
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)|((js\/libs\/vendor).+?(.js)$)/,
				use: {
					// options are defined inside .babelrc
					loader: 'babel-loader?cacheDirectory'
				}
			},
			{
				test: /\.modernizrrc.js$/,
				use: [ 'modernizr-loader' ]
			},
			{
				test: /\.modernizrrc(\.json)?$/,
				use: [ 'modernizr-loader', 'json-loader' ]
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'url-loader'
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
						options: {
							minimize: production,
							sourceMap: false
						}
					},
					{
						loader: 'css-loader',
						options: {
							minimize: production,
							sourceMap: false
						}
					},
					{
						loader: "sass-loader" // TODO: split betwenn dev and production - generate separate CSS files when importing SASS? --> https://github.com/webpack-contrib/sass-loader#in-production
					}
				]
			},
			{
				test: /\.scss/,
				use: [
					{
						loader: 'style-loader',
						options: {
							minimize: production,
							sourceMap: false
						}
					},
					{
						loader: 'css-loader',
						options: {
							minimize: production,
							sourceMap: false
						}
					},
					{
						loader: "sass-loader"
					}
				]
			}
		]
	},
	resolve: {
		alias: {
			modernizr$: path.resolve(__dirname, "../.modernizrrc")
		}
	},
	plugins: [
		// https://webpack.js.org/plugins/provide-plugin/ - make jquery available globally
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		}),
		// https://webpack.js.org/plugins/define-plugin/ - define global constants
		new webpack.DefinePlugin({
			CAPITAN: {
				Vars: {
					folderPath: "'" + Config.paths.liveUrl + "'",
					currentBreakpoint: '"xs"',
					currentOrientation: '"portrait"',
					breakpoints: {
						'xs': 320,
						'sm': 480,
						'md': 768,
						'lg': 992,
						'xl': 1200
					}
				},
				// CSS components script namespace
				Component: {},
				// functions must return something
				Function: {},
				// everything that has to do with event handling
				Handle: {},
				// Should be used for scripts that have nothing to do with components, e.g. placeholder polyfills, plugins, etc.
				Util: {}
			}
		}),
		new ExtractTextPlugin({
			filename: "[name].[contenthash].css",
			allChunks: true,
			disable: !production
		})
	]
};