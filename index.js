const { createApp } = require('./src/app.js');
const { initGame } = require('./src/initGame.js');

const app = createApp({ root: 'public', game: initGame() }, {});

app.listen(8888, () => console.log('listening on 8888'));
