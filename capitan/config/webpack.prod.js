const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
	plugins: [
		new UglifyJSPlugin({
			sourceMap: false,
			cache: true,
			uglifyOptions: {
				compress: {
					drop_console: true
				}
			}
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		})
	],
});
