import loadGame from '../load_game'
import map from '../maps/complex_navigation_map.json'
import stupidNavigationFactory from '../scenes/stupid_navigation'

const game = loadGame({
	scene: [stupidNavigationFactory(map)],
	width: 240,
	height: 240,
	zoom: 2,
})