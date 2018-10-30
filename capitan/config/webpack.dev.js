const merge = require('webpack-merge');
const common = require('./webpack.common');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = merge(common, {
	devtool: 'inline-source-map', // source maps provide the initial JS file before compiled by webpack - e.g. for debugging - see: https://webpack.js.org/configuration/devtool/
	plugins: [
		new DashboardPlugin
	]
});