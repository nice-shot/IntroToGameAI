const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const games = require('./src/game_list')

module.exports = {
	entry: games.reduce((entries, game) => {
		entries[game.entry] = game.src
		return entries
	}, {}),
	plugins: [
		new CleanWebpackPlugin(['./dist']),
		new CopyWebpackPlugin([
			'public',
		]),
		new HtmlWebpackPlugin({
			inject: false,
			template: './src/templates/index.html',
			templateParameters: {
				games: games,
				title: 'Intro to AI in Games - Examples',
			},
		}),
		...games.map(game => (
			new HtmlWebpackPlugin({
				inject: false,
				template: './src/templates/game_page.html',
				templateParameters: game,
				filename: game.entry + '.html',
			})
		)),
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