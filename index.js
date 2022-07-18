const { createApp } = require('./src/app.js');
const { initGame } = require('./src/initGame.js');
const fs = require('fs');

const keys = fs.readFileSync('./src/keys.json');
const app = createApp({ root: 'public', game: initGame(), keys: JSON.parse(keys) }, {});

app.listen(8888, () => console.log('listening on 8888'));
