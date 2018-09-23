const fs = require('fs');
const path = require('path');
const marked = require('marked');
const handlebars = require('handlebars');

const markdown = fs.readFileSync(path.join(__dirname, 'intro_to_game_ai.md'), 'utf-8');
const template = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf-8');

console.log(handlebars.compile(template)({body: marked(markdown)}));
