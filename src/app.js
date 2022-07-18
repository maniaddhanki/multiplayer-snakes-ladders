const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const { play, validatePlayer, gameStatus } = require('./handlers/gameHandler.js');
const { injectGame } = require('./handlers/injectGame.js');
const { joinHandler, showjoiningPage, validateRequest } = require('./handlers/joinHandler.js');
const { authenticatePlayer } = require('./handlers/authenticatePlayer.js');

const createApp = ({ root = './public', game, keys }, sessions = {}) => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(), cookieSession({
    name: 'sessionId', keys
  }));
  app.use(injectGame(game));
  app.get('/join', showjoiningPage);
  app.post('/join', validateRequest, joinHandler);
  app.get('/status', gameStatus);
  app.use(authenticatePlayer);
  app.use(morgan('tiny'));
  app.use(express.static(root));
  app.get('/roll', validatePlayer, play);
  return app;
};

module.exports = { createApp };
