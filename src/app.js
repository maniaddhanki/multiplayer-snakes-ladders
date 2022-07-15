const express = require('express');
const { play } = require('./handlers/gameHandler.js');
const { injectGame } = require('./handlers/injectGame.js');

const createApp = ({ root = './public', game }, sessions = {}) => {
  const app = express();
  app.use(express.static(root), injectGame(game));
  app.get('/roll', play);
  return app;
};

module.exports = { createApp };
