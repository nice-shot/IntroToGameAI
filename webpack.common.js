const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const games = [
	{
		entry: 'minigame1',
		src: './src/games/minigame1.js',
		name: 'Example A - Game Loop',
		description: 'This is a game thingy...',
	},
	{
		entry: 'minigame2',
		src: './src/games/minigame2.js',
		name: 'Example B - Straight Navigation',
		description: 'Bla bla bli',
	},
]

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