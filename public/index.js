/**
 * Author: Michael Hadley, mikewesthad.com
 * Asset Credits:
 *  - Subtle Patterns
 */

// let controls;
let player;
let cursors;

class GameLoop extends Phaser.Scene {
	constructor() {
		super({ key: 'GameLoop' });
	}

	preload() {
		this.load.atlas("ninja", "assets/ninja.png", "assets/ninja-atlas.json");
		this.load.image("floors", "assets/Interior_Floors_by_George.png");
		this.load.image("walls", "assets/Interior_Walls_by_George.png");
		this.load.tilemapTiledJSON("map", "assets/gameloop_map.json");
	}

	create() {
		// Setting up the map

		const map = this.make.tilemap({ key: 'map' });

		const floorTileset = map.addTilesetImage('Interior_Floors_by_George', 'floors');
		const wallsTileset = map.addTilesetImage('Interior_Walls_by_George', 'walls');

		const floorLayer = map.createStaticLayer('Floor', floorTileset, 0, 0);
		const wallsLayer = map.createStaticLayer('Walls', wallsTileset, 0, 0);

		wallsLayer.setCollisionBetween(1, 999);
		// aboveLayer.setDepth(10); // Show above player

		const spawnPoint = map.findObject('Objects', obj => obj.name === 'SpawnPosition');

		// Setting player

		player = this.physics.add
			.sprite(spawnPoint.x, spawnPoint.y, "ninja", "ninja_front")
			.setSize(16, 16)
			.setOffset(0, 15)
			.setCollideWorldBounds(true)
		;

		this.physics.add.collider(player, wallsLayer);

		const anims = this.anims;

		// Player animations
		anims.create({
			key: 'ninja_left_walk',
			frames: anims.generateFrameNames("ninja", { prefix: 'ninja_left_walk.', start: 0, end: 3, zeroPad: 3 }),
			frameRate: 10,
			repeat: -1
		});
		anims.create({
			key: 'ninja_right_walk',
			frames: anims.generateFrameNames("ninja", { prefix: 'ninja_right_walk.', start: 0, end: 3, zeroPad: 3 }),
			frameRate: 10,
			repeat: -1
		});
		anims.create({
			key: 'ninja_front_walk',
			frames: anims.generateFrameNames("ninja", { prefix: 'ninja_front_walk.', start: 0, end: 3, zeroPad: 3 }),
			frameRate: 10,
			repeat: -1
		});
		anims.create({
			key: 'ninja_back_walk',
			frames: anims.generateFrameNames("ninja", { prefix: 'ninja_back_walk.', start: 0, end: 3, zeroPad: 3 }),
			frameRate: 10,
			repeat: -1
		});

		// Camera setup

		// const camera = this.cameras.main;
		// camera.startFollow(player);
		// camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

		// Controls
		cursors = this.input.keyboard.createCursorKeys();

		// this.add
		// 	.text(16, 16, 'Arrow keys to move\nPress "D" to show hitboxes', {
		// 		font: '18px monospace',
		// 		fill: '#ffffff',
		// 		padding: { x: 20, y: 10 },
		// 		backgroundColor: '#000000'
		// 	})
		// 	.setScrollFactor(0)
		// 	.setDepth(30)
		// ;

		// Debug graphics

		// this.input.keyboard.once('keydown_D', event => {
		// 	this.physics.world.createDebugGraphic();

		// 	const graphics = this.add.graphics().setAlpha(0.75);
		// 	worldLayer.renderDebug(graphics, {
		// 		tileColor: null,
		// 		collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
		// 		faceColor: new Phaser.Display.Color(40, 39, 37, 255)
		// 	});
		// });


	}

	update(time, delta) {
		const speed = 175;
		const prevVelocity = player.body.velocity.clone();

		// Stop moving
		player.body.setVelocity(0);

		// Horizontal movement
		if (cursors.left.isDown) {
			player.body.setVelocityX(-100);
		} else if (cursors.right.isDown) {
			player.body.setVelocityX(100);
		}

		// Vertical movement
		if (cursors.up.isDown) {
			player.body.setVelocityY(-100);
		} else if (cursors.down.isDown) {
			player.body.setVelocityY(100);
		}

		player.body.velocity.normalize().scale(speed)

		// Update animation
		if (cursors.left.isDown) {
			player.anims.play('ninja_left_walk', true);
		} else if (cursors.right.isDown) {
			player.anims.play('ninja_right_walk', true);
		} else if (cursors.up.isDown) {
			player.anims.play('ninja_back_walk', true);
		} else if (cursors.down.isDown) {
			player.anims.play('ninja_front_walk', true);
		} else {
			player.anims.stop();

			// Pick idle frame to stop
			if (prevVelocity.x < 0) {
				player.setTexture('ninja', 'ninja_left');
			} else if (prevVelocity.x > 0) {
				player.setTexture('ninja', 'ninja_right');
			} else if (prevVelocity.y < 0) {
				player.setTexture('ninja', 'ninja_back');
			} else if (prevVelocity.y > 0) {
				player.setTexture('ninja', 'ninja_front');
			}

		}
	}
}

const config = {
	type: Phaser.AUTO,
	width: 240,
	height: 256,
	zoom: 2,
	pixelArt: true,
	backgroundColor: '#222222',
	parent: 'game-container',
	scene: [GameLoop],
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 }
		}
	}
};

const game = new Phaser.Game(config);
