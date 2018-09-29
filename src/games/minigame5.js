import loadGame from '../load_game'
import DiamondHeist from '../scenes/diamond_heist'

const game = loadGame({
	scene: [DiamondHeist],
	width: 240,
	height: 240,
	zoom: 2,
})