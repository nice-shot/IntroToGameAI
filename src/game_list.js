const ARROW_CONTROLS = 'Arrow Keys - Move'
const MOUSE_CONTROLS = 'Click to move'

const NAVIGATION_GOAL = 'Navigate through the map'

const STANDARD_CREDITS = [
	'Art assets from open source project <a href="https://github.com/Tuxemon/Tuxemon">Tuxemon</a>.',
	'Game engine: <a href="https://phaser.io/">Phaser 3</a>',
]

const EASYSTAR_CREDIT = 'Pathfinding using <a href="https://easystarjs.com/">EasyStar</a>'

module.exports = [
	{
		entry: 'minigame1',
		src: './src/games/minigame1.js',
		name: 'Example A - Game Loop',
		controls: ARROW_CONTROLS,
		goal: 'Walk back and forth to the other edge of the screen to score points. '
			+ 'Avoid getting detected by the guard.',
		credits: STANDARD_CREDITS,
	},
	{
		entry: 'minigame2',
		src: './src/games/minigame2.js',
		name: 'Example B-1 - Simple Navigation',
		controls: MOUSE_CONTROLS,
		goal: NAVIGATION_GOAL,
		credits: STANDARD_CREDITS,
	},
	{
		entry: 'minigame3',
		src: './src/games/minigame3.js',
		name: 'Example B-2 - Simple Navigation | Complex Path',
		controls: MOUSE_CONTROLS,
		goal: NAVIGATION_GOAL,
		credits: STANDARD_CREDITS,
	},
	{
		entry: 'minigame4',
		src: './src/games/minigame4.js',
		name: 'Example B-3 - A* Navigation',
		controls: MOUSE_CONTROLS,
		goal: NAVIGATION_GOAL,
		credits: [...STANDARD_CREDITS, EASYSTAR_CREDIT],
	},
]
