const express = require('express');
const { injectSession } = require('./handlers/sessionHandler.js');
const { play, validatePlayer, gameStatus } = require('./handlers/gameHandler.js');
const { injectGame } = require('./handlers/injectGame.js');
const { joinHandler, showjoiningPage, validateRequest } = require('./handlers/joinHandler.js');
const { injectCookie } = require('./handlers/cookiesHandler.js');
const { authenticatePlayer } = require('./handlers/authenticatePlayer.js');

const logRequest = (req, res, next) => {
  console.log(req.method, req.url);
  next();
};

const createApp = ({ root = './public', game }, sessions = {}) => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(injectCookie, injectSession(sessions), injectGame(game));
  app.get('/join', showjoiningPage);
  app.post('/join', validateRequest, joinHandler(sessions));
  app.get('/game-state', gameStatus);
  app.use(authenticatePlayer);
  app.use(logRequest);
  app.use(express.static(root));
  app.get('/roll', validatePlayer, play);
  return app;
};

module.exports = { createApp };
