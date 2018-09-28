const path = require('path');

module.exports = {
	entry: './src/simple_sneak.js',
	output:	{
		filename: 'main.js',
		path: path.resolve(__dirname, 'public'),
	}
};

