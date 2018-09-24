window.onload = () => {

	let player;
	let cursors;

	class GameLoopExample extends Phaser.Scene {
		constructor() {
			super({ key: 'GameLoopExample' });
		}

		preload(){
			this.load.atlas('boss', 'assets/boss.png', 'assets/boss-atlas.json');
			this.load.atlas('ninja', 'assets/ninja.png', 'assets/ninja-atlas.json');
		}

		create() {
			player = this.physics.add
				.sprite(200, 200, 'ninja', 'ninja_front')
				.setSize(30, 40)
				.setOffset(0, 24)
			;

			cursors = this.input.keyboard.createCursorKeys();

		}

		update(time, delta) {
			const speed = 175;

			// Stop any previous movement from the last frame
			player.body.setVelocity(0);

			// Horizontal movement
			if (cursors.left.isDown) {
				player.body.setVelocityX(-speed);
			} else if (cursors.right.isDown) {
				player.body.setVelocityX(speed);
			}

			// Vertical movement
			if (cursors.up.isDown) {
				player.body.setVelocityY(-speed);
			} else if (cursors.down.isDown) {
				player.body.setVelocityY(speed);
			}
		}
	}

	const config = {
		width: 400,
		height: 400,
		pixelArt: true,
		canvas: document.getElementById('game-loop-example'),
		scene: [GameLoopExample],
		physics: {
			default: "arcade",
			arcade: {
				gravityY: 0
			}
		}
	}


	const gameLoopGame = new Phaser.Game(config);
}