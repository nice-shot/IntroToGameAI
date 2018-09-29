import Phaser from 'phaser'
import TILESET from '../images/castle_tileset.png'
import MAP from '../maps/complex_navigation_map.json'
import EasyStar from 'easystarjs'

import Ninja from '../ninja.js'

let character
let starmap

class SmartNavigation extends Phaser.Scene {
	constructor() {
		super('StupidNavigation')
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


		const simpleMap = []
		for (let y=0; y<map.height; y++) {
			simpleMap.push([])
			for (let x=0; x<map.width; x++) {
				simpleMap[y].push(wallsLayer.hasTileAt(x, y))
			}
		}

		starmap = new EasyStar.js()
		starmap.setGrid(simpleMap)
		starmap.setAcceptableTiles([false])
		// starmap.enableDiagonals()

		Ninja.createAnimations(this)

		character = new Ninja(this, 24, 178)
		this.input.on('pointerdown', pointer => {
			const currentTile = wallsLayer.worldToTileXY(
				character.sprite.x,
				character.sprite.y
			)
			const targetTile = wallsLayer.worldToTileXY(
				pointer.position.x,
				pointer.position.y
			)

			console.log(currentTile)
			console.log(targetTile)
			starmap.findPath(
				currentTile.x,
				currentTile.y,
				targetTile.x,
				targetTile.y,
				path => {
					character.setPath(path.map(
						tile => {
							const worldTile = wallsLayer.tileToWorldXY(tile.x, tile.y)
							worldTile.x += 8
							worldTile.y += 8
							return worldTile
						}
					))
				}
			)

			character.waitingForPath = true
		})
		this.physics.add.collider(wallsLayer, character.sprite)
	}

	update(time, delta) {
		if (character.waitingForPath) {
			starmap.calculate()
		}
		character.update(this)
	}
}


export default SmartNavigation