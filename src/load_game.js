import Phaser from 'phaser'

const baseConfig = {
	mode: Phaser.AUTO,
	pixelArt: true,
	parent: 'game-container',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
		}
	},
}

export default (newConfig) => {
	// Combines the given config with the old one
	return new Phaser.Game({...baseConfig, ...newConfig})
}