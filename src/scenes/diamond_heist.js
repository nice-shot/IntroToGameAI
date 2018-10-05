import Phaser from 'phaser'

import MAP from '../maps/fsm_map.json'
import TILESET from '../images/castle_tileset.png'

import ArrowControlledCharacter from '../arrow_controlled_character'
import FSMGuard from '../characters/fsm_guard'

let player = new ArrowControlledCharacter('ninja')
let guard = new FSMGuard('boss')
let patrolStack = [];
let guardCurrentTarget;

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

		const guardPatrol = map.findObject(
			'Objects',
			obj => obj.name === 'GuardPatrol'
		)

		guard.createPatrolRoute([
			{ x: guardPatrol.x, y: guardPatrol.y + guardPatrol.height - 16 },
			{
				x: guardPatrol.x + guardPatrol.width - 16,
				y: guardPatrol.y + guardPatrol.height - 16
			},
			{ x: guardPatrol.x + guardPatrol.width - 16, y: guardPatrol.y},
			{ x: guardPatrol.x, y: guardPatrol.y },
		])

		player.create(this, playerSpawn.x, playerSpawn.y)
		guard.create(this, guardSpawn.x, guardSpawn.y)

		this.physics.add.collider(wallsLayer, player.sprite)
	}

	update(time, delta) {
		player.update(this, time, delta)
		guard.update(this, time, delta)
	}
}

export default DiamondHeist