const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const games = [
	{
		entry: 'minigame1',
		src: './src/games/minigame1.js',
		name: 'Example A - Game Loop',
		controls: 'Arrow Keys - Move',
		goal: 'Walk back and forth to the other edge of the screen to score points. '
			+ 'Avoid getting detected by the guard.',
		credits: [
			'Art assets from open source project <a href="https://github.com/Tuxemon/Tuxemon">Tuxemon</a>.',
			'Game engine: <a href="https://phaser.io/">Phaser 3</a>',
		],
	},
	{
		entry: 'minigame2',
		src: './src/games/minigame2.js',
		name: 'Example B - Straight Navigation',
		controls: 'Click to move',
		goal: '---',
		credits: [
			'Art assets from open source project <a href="https://github.com/Tuxemon/Tuxemon">Tuxemon</a>.',
			'Game engine: <a href="https://phaser.io/">Phaser 3</a>',
		],
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