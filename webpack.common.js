const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	entry: {
		minigame1: './src/simple_sneak.js',
		minigame2: './src/stupid_navigation.js',
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
		},
	},
	module: {
		rules: [
			{
				test: /\.png$/,
				use: [
					{
						loader: 'file-loader',
						options: { outputPath: 'images/' },
					},
				],
			},
		],
	},
}