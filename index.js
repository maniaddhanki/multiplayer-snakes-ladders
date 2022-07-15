const { createApp } = require('./src/app.js');

const app = createApp({ root: 'public' }, {});

app.listen(8888, () => console.log('listening on 8888'));
