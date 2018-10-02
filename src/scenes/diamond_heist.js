import Phaser from 'phaser'
import ArrowControlledCharacter from '../arrow_controlled_character'

import MAP from '../maps/fsm_map.json'
import TILESET from '../images/castle_tileset.png'
import Character from '../character';

let player = new ArrowControlledCharacter('ninja')
let guard = new Character('boss')

class DiamondHeist extends Phaser.Scene {
	constructor() {
		super('DiamondHeist')
	}

	preload() {
		player.preload(this)
		guard.preload(this)
		this.load.image('tiles', TILESET);
		this.load.tilemapTiledJSON('map', MAP);
	}

	create() {
		const map = this.make.tilemap({ key: 'map' })
		const tileset = map.addTilesetImage('tileset', 'tiles')

		const floorLayer = map.createStaticLayer('Floor', tileset, 0, 0)
		const wallsLayer = map.createStaticLayer('Walls', tileset, 0, 0)
			.setCollisionBetween(1, 999)
		const marksLayer = map.createStaticLayer('AreasOfInterest', tileset, 0, 0)
			.setAlpha(0.7)

		const playerSpawn = map.findObject(
			'Objects',
			obj => obj.name === 'NinjaPosition'
		)

		const guardSpawn = map.findObject(
			'Objects',
			obj => obj.name === 'GuardPosition'
		)

		player.create(this, playerSpawn.x, playerSpawn.y)
		guard.create(this, guardSpawn.x, guardSpawn.y)

		this.physics.add.collider(wallsLayer, player.sprite)
		this.physics.add.collider(wallsLayer, guard.sprite)
	}

	update(time, delta) {
		player.update(this, time, delta)
	}
}

export default DiamondHeist