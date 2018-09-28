import loadGame from '../load_game'
import StupidNavigation from '../scenes/stupid_navigation'

const game = loadGame({
	scene: [StupidNavigation],
	width: 240,
	height: 240,
	zoom: 2,
})