import Character from './character'

class ArrowControlledCharacter extends Character {
	constructor(name) {
		super(name)
		this.cursors = null
	}

	create(scene, xPos, yPos) {
		super.create(scene, xPos, yPos)
		this.cursors = scene.input.keyboard.createCursorKeys();
	}

	update(scene, time, delta) {
		const speed = 100
		const cursors = this.cursors

		// Stop moving
		this.sprite.body.setVelocity(0)

		// Horizontal movement
		if (cursors.left.isDown) {
			this.sprite.body.setVelocityX(-speed);
		} else if (cursors.right.isDown) {
			this.sprite.body.setVelocityX(speed);
		}

		// Vertical movement
		if (cursors.up.isDown) {
			this.sprite.body.setVelocityY(-speed);
		} else if (cursors.down.isDown) {
			this.sprite.body.setVelocityY(speed);
		}

		// Avoid speed boost in diagonals
		this.sprite.body.velocity.normalize().scale(speed)

		// Change the animations and sprites only AFTER movement
		super.update(scene, time, delta)
	}
}

export default ArrowControlledCharacter