const express = require('express');
const { play } = require('./handlers/gameHandler.js');
const { injectPlayer } = require('./handlers/injectPlayer.js');

const createApp = ({ root = './public' }, sessions = {}) => {
  const app = express();
  app.use(express.static(root), injectPlayer);
  app.get('/roll', play);
  return app;
};

module.exports = { createApp };
