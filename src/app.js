const express = require('express');
const { rollDice } = require('./handlers/diceHandler.js');

const createApp = ({ root = './public' }, sessions = {}) => {
  const app = express();
  app.use(express.static(root));
  app.get('/roll', rollDice);
  return app;
};

module.exports = { createApp };
