import loadGame from '../load_game'
import map from '../maps/complex_navigation_map.json'
import SmartNavigation from '../scenes/smart_navigation'

const game = loadGame({
	scene: [SmartNavigation],
	width: 240,
	height: 240,
	zoom: 2,
})