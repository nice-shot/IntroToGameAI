import Phaser from 'phaser'
import Character from '../character'

import MAP from '../maps/stupid_navigation_map.json'
import TILESET from '../images/castle_tileset.png'

let player = new Character('ninja')
let cursors

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

		cursors = this.input.keyboard.createCursorKeys();

	}

	update(time, delta) {
		const speed = 100

		// Stop moving
		player.sprite.body.setVelocity(0)

		// Horizontal movement
		if (cursors.left.isDown) {
			player.sprite.body.setVelocityX(-100);
		} else if (cursors.right.isDown) {
			player.sprite.body.setVelocityX(100);
		}

		// Vertical movement
		if (cursors.up.isDown) {
			player.sprite.body.setVelocityY(-100);
		} else if (cursors.down.isDown) {
			player.sprite.body.setVelocityY(100);
		}

		// Avoid speed boost in diagonals
		player.sprite.body.velocity.normalize().scale(speed)

		player.update(this, time, delta)
	}
}

export default DiamondHeist