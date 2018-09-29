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

		for (let direction of directions) {
			const moveName = `${name.toLowerCase()}_${direction}_walk`
			anims.create({
				key: moveName,
				frames: anims.generateFrameNames(
					name,
					{ prefix: moveName + '.', start: 0, end: 3, zeroPad: 3}
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
		this.waitingForPath = false
		this.path = []
	}

	setMoveTo(position) {
		this.moveTo = position.clone()
		console.log('Moving to:')
		console.log(this.moveTo)
	}

	setPath(path) {
		this.waitingForPath = false
		this.path = path
		this.path.reverse()
		this.setMoveTo(this.path.pop())
		console.log('Got path')
		console.log(path)
	}

	checkPath() {
		const Equal = Phaser.Math.Fuzzy.Equal
		if (!Equal(this.moveTo.x, this.sprite.x, 1)
			|| !Equal(this.moveTo.y, this.sprite.y, 1)) {
			return false
		}

		if (this.path && this.path.length > 0) {
			this.setMoveTo(this.path.pop())
			return false
		}

		this.sprite.anims.stop()
		return true

	}

	update(scene) {
		this.sprite.setVelocity(0)
		if (this.checkPath()) {
			return
		}

		scene.physics.moveTo(
			this.sprite,
			this.moveTo.x,
			this.moveTo.y,
			100,
		)

		const name = Ninja.name.toLowerCase()
		const angle = this.sprite.body.angle * (180 / Math.PI)

		if (angle >= 45 && angle <= 135) {
			this.sprite.anims.play(name + '_front_walk', true)
		} else if (angle <= -45 && angle >= -135) {
			this.sprite.anims.play(name + '_back_walk', true)
		} else if (angle < 45 && angle > -45) {
			this.sprite.anims.play(name + '_right_walk', true)
		} else {
			this.sprite.anims.play(name + '_left_walk', true)
		}
	}
}

export default Ninja