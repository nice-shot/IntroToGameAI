import Phaser from 'phaser'
import ArrowControlledCharacter from '../arrow_controlled_character'

import MAP from '../maps/stupid_navigation_map.json'
import TILESET from '../images/castle_tileset.png'

let player = new ArrowControlledCharacter('ninja')

class DiamondHeist extends Phaser.Scene {
	constructor() {
		super('DiamondHeist')
	}

	preload() {
		player.preload(this)
		this.load.image("tiles", TILESET);
		this.load.tilemapTiledJSON("map", MAP);
	}

	create() {
		const map = this.make.tilemap({ key: 'map' })
		const tileset = map.addTilesetImage("Castle", "tiles")

		const floorLayer = map.createStaticLayer('Floor', tileset, 0, 0)
		const wallsLayer = map.createStaticLayer('Walls', tileset, 0, 0)
			.setCollisionBetween(1, 999)

		player.create(this, 120, 120)

		this.physics.add.collider(wallsLayer, player.sprite)
	}

	update(time, delta) {
		player.update(this, time, delta)
	}
}

export default DiamondHeist