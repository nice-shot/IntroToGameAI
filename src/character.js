const Direction = Object.freeze({
	up: 'up',
	down: 'down',
	left: 'left',
	right: 'right',
})

const radToDirection = rad => {
	const angle = rad * (180 / Math.PI)

	if (angle >= 45 && angle <= 135) {
		return Direction.down
	} else if (angle <= -45 && angle >= -135) {
		return Direction.up
	} else if (angle < 45 && angle > -45) {
		return Direction.right
	}

	return Direction.left
}

class Character {
	constructor(name) {
		this.name = name
		this.sprite = null
		this.direction = Direction.down
	}

	preload(scene) {
		const name = this.name
		scene.load.atlas(
			name,
			require('./images/' + name + '.png'),
			require('./sprites/' + name + '_atlas.json')
		)

		return this
	}

	create(scene, xPos, yPos) {
		this.createSprite(scene, xPos, yPos)
		this.createWalkAnimations(scene)
		return this
	}

	update(scene, time, delta) {
		this.updateWalkAnimation(scene)
	}

	createWalkAnimations(scene) {
		const name = this.name
		const anims = scene.anims
		const directions = ['left', 'right', 'front', 'back']

		for (let direction of directions) {
			const moveName = `${name}_${direction}_walk`
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

		return this
	}

	createSprite(scene, xPos, yPos) {
		const name = this.name
		this.sprite = scene.physics.add
			.sprite(xPos, yPos, name, name + '_front')
			.setSize(16, 16)
			.setOffset(0, 15)
			.setCollideWorldBounds(true)

		return this
	}

	updateWalkAnimation() {
		const name = this.name
		const anims = this.sprite.anims

		if (this.sprite.body.speed > 0) {
			// Set movement animation
			this.direction = radToDirection(this.sprite.body.angle)

			switch (this.direction) {
				case Direction.down:
					anims.play(name + '_front_walk', true)
					break
				case Direction.up:
					anims.play(name + '_back_walk', true)
					break
				case Direction.right:
					anims.play(name + '_right_walk', true)
					break
				default:
					anims.play(name + '_left_walk', true)
			}

		} else {
			anims.stop()
			const sprite = this.sprite

			switch (this.direction) {
				case Direction.down:
					sprite.setTexture(name, name + '_front');
					break
				case Direction.up:
					sprite.setTexture(name, name + '_back');
					break
				case Direction.right:
					sprite.setTexture(name, name + '_right');
					break
				default:
					sprite.setTexture(name, name + '_left');
			}
		}
	}
}

export default Character