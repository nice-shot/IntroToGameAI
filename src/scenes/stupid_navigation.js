import Phaser from 'phaser'
import TILESET from '../images/castle_tileset.png'

import Ninja from '../ninja.js'

let character;

function stupidNavigationFactory(MAP) {
	class StupidNavigation extends Phaser.Scene {
		constructor() {
			super({ key: 'StupidNavigation' })
		}

		preload() {
			this.load.image("tileset", TILESET)
			this.load.tilemapTiledJSON("map", MAP)
			Ninja.preload(this);
		}

		create() {
			const map = this.make.tilemap({ key: "map" })
			const tileset = map.addTilesetImage("Castle", "tileset")
			const floorLayer = map.createStaticLayer('Floor', tileset, 0, 0)
			const wallsLayer = map.createStaticLayer('Walls', tileset, 0, 0)
				.setCollisionBetween(1, 999)
			const aboveLayer = map.createStaticLayer('Above', tileset, 0, 0)
				.setDepth(30)

			Ninja.createAnimations(this)

			character = new Ninja(this, 24, 178)
			this.input.on('pointerdown', pointer => {
				character.setMoveTo(pointer.position)
			})
			this.physics.add.collider(wallsLayer, character.sprite)
		}

		update(time, delta) {
			character.update(this)
		}
	}

	return StupidNavigation
}


export default stupidNavigationFactory