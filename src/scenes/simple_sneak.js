import Phaser from 'phaser'

import NINJA_IMG from '../images/ninja.png'
import GUARD_IMG from '../images/boss.png'
import FLOORS_IMG from '../images/Interior_Floors_by_George.png'
import WALLS_IMG from '../images/Interior_Walls_by_George.png'
import NINJA_ATLAS from '../sprites/ninja_atlas.json'
import GUARD_ATLAS from '../sprites/boss_atlas.json'
import ROOM_MAP from '../maps/gameloop_map.json'

// let controls;
let player
let cursors
let guard
let guardMovingUp = false
let seenPlayer = false
let gameOverText
let restartBtn
let score = 0
let scoreText
let targetRight = true


class GameLoop extends Phaser.Scene {
	constructor() {
		super('GameLoop')
	}

	preload() {
		this.load.atlas("ninja", NINJA_IMG, NINJA_ATLAS);
		this.load.atlas("guard", GUARD_IMG, GUARD_ATLAS);
		this.load.image("floors", FLOORS_IMG);
		this.load.image("walls", WALLS_IMG);
		this.load.tilemapTiledJSON("map", ROOM_MAP);
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

		const playerSpawn = map.findObject('Objects', obj => obj.name === 'PlayerSpawn');
		const guardSpawn = map.findObject('Objects', obj => obj.name === 'GuardSpawn');

		// Characters

		player = this.physics.add
			.sprite(playerSpawn.x, playerSpawn.y, "ninja", "ninja_front")
			.setSize(16, 16)
			.setOffset(0, 15)
			.setCollideWorldBounds(true)
		;

		guard = this.physics.add
			.sprite(guardSpawn.x, guardSpawn.y, "guard", "boss_front")
			.setSize(16, 16)
			.setOffset(0, 15)
			.setCollideWorldBounds(true)
		;


		this.physics.add.collider(player, wallsLayer);
		this.physics.add.collider(player, guard);


		// UI

		const { width, height } = this.sys.canvas;

		gameOverText = this.add
			.text(width / 2, height / 2, 'Game Over', {
				fill: 'red',
				backgroundColor: 'rgba(0, 0, 0, .5)',
			})
			.setOrigin()
			.setVisible(false)
		;

		restartBtn = this.add
			.text(5, 16, 'Restart', {
				fill: 'white',
				backgroundColor: 'rgba(0, 0, 0, 0.6)',
			})
			.setInteractive()
			.on('pointerdown', () => {
				guardMovingUp = false;
				seenPlayer = false;
				score = 0;
				targetRight = true;
				scoreText.setText(score);
				gameOverText.setVisible(false);
				player.setPosition(playerSpawn.x, playerSpawn.y);
				guard.setPosition(guardSpawn.x, guardSpawn.y);
			})
		;

		scoreText = this.add
			.text(width - 5, 16, score, {
				fill: '#0f0',
				backgroundColor: 'rgba(0, 0, 0, 0.6)',
				align: 'right',
			})
			.setOrigin(1, 0)
		;

		// Animations
		const anims = this.anims;

		// Player animation
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

		// Guard animation
		anims.create({
			key: 'guard_front_walk',
			frames: anims.generateFrameNames('guard', { prefix: 'boss_front_walk.', start: 0, end: 3, zeroPad: 3 }),
			frameRate: 5,
			repeat: -1
		});

		anims.create({
			key: 'guard_back_walk',
			frames: anims.generateFrameNames('guard', { prefix: 'boss_back_walk.', start: 0, end: 3, zeroPad: 3 }),
			frameRate: 5,
			repeat: -1
		})


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

	updatePlayerMovement() {
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

	updateGuardMovement() {
		const speed = 90;
		const GUARD_TOP = 15;
		const GUARD_BOTTOM = 140;
		const VIEW_START = 100;
		const VIEW_END = 145;

		guard.body.setVelocity(0);

		// Check if seen the player
		if (!guardMovingUp) {
			if (player.x > VIEW_START && player.x < VIEW_END) {
				seenPlayer = true;
				return;
			}
		}


		// Change direction when reaching end of route
		if (guard.y <= GUARD_TOP || guard.y >= GUARD_BOTTOM) {
			guardMovingUp = !guardMovingUp;
		}

		// TODO: Add pause before changing direction
		if (guardMovingUp) {
			guard.body.setVelocityY(-speed);
			guard.anims.play('guard_back_walk', true);
		} else {
			guard.body.setVelocityY(speed);
			guard.anims.play('guard_front_walk', true);
		}
	}

	calculateScore() {
		// Where the player needs to go
		const TARGETS = [30, 210];

		if ((targetRight && player.x >= TARGETS[1])
			|| (!targetRight && player.x <= TARGETS[0])) {
			targetRight = !targetRight;
			score++;
			scoreText.setText(score);
		}
	}

	update(time, delta) {
		if (seenPlayer) {
			guard.anims.stop();
			player.anims.stop();
			player.body.setVelocity(0);
			gameOverText.setVisible(true);
			return;
		}
		this.updatePlayerMovement();
		this.updateGuardMovement();
		this.calculateScore();
	}
}

export default GameLoop
