const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	entry: {
		src: './simple_sneak.js',
	},
	plugins: [
		new CleanWebpackPlugin(['./dist']),
		new CopyWebpackPlugin([
			'public',
		]),
	],
	output: {
		filename: 'js/[name].js',
		path: path.resolve(__dirname, 'dist'),
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
			name: 'extras',
		}
	}
}