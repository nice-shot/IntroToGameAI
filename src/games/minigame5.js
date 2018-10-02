import loadGame from '../load_game'
import DiamondHeist from '../scenes/diamond_heist'

const game = loadGame({
	scene: [DiamondHeist],
	width: 304,
	height: 272,
	zoom: 2,
})