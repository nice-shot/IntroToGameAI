import Phaser from 'phaser';

import SPRITESHEET from './images/ninja.png'
import ATLAS from './sprites/ninja_atlas.json'

class Ninja {
	static preload(scene) {
		scene.load.atlas(Ninja.name, SPRITESHEET, ATLAS)
	}

	static createAnimations(scene) {
		const anims = scene.anims
		const name = Ninja.name
		const directions = ['left', 'right', 'front', 'back']

		for (let direction in directions) {
			const moveName = `${name.toLowerCase()}_${direction}_walk`
			anims.create({
				key: moveName,
				frames: anims.generateFrameNames(
					name,
					{ prefix: moveName, start: 0, end: 3, zeroPad: 3}
				),
				frameRate: 10,
				repeat: -1,
			})
		}
	}

	constructor(scene, xPos, yPos) {
		const name = Ninja.name;

		this.sprite = scene.physics.add
			.sprite(xPos, yPos, name, name.toLowerCase() + '_front')
			.setSize(16, 16)
			.setOffset(0, 15)
			.setCollideWorldBounds(true)

		this.moveTo = new Phaser.Math.Vector2(xPos, yPos)
	}

	setMoveTo(position) {
		this.moveTo = position.clone()
		console.log('Moving to:')
		console.log(this.moveTo)
	}

	update(scene) {
		this.sprite.setVelocity(0)
		const Equal = Phaser.Math.Fuzzy.Equal
		if (Equal(this.moveTo.x, this.sprite.x, 1)
			&& Equal(this.moveTo.y, this.sprite.y, 1)) {
			return
		}
		scene.physics.moveTo(
			this.sprite,
			this.moveTo.x,
			this.moveTo.y,
			100,
		)
		// this.sprite.setPosition(position.lerp(this.moveTo, 0.5))
		// console.log(scene);
	}
}

export default Ninja