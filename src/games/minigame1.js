import loadGame from '../load_game'
import GameLoop from '../scenes/simple_sneak'

const game = loadGame({
	scene: [GameLoop],
	width: 240,
	height: 256,
	zoom: 2,
})