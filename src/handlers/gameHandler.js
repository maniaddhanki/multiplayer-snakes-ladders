const validatePlayer = (req, res, next) => {
  const game = req.game;
  const { sessionId } = req.session;
  if (game.validateTurn(sessionId)) {
    next();
  }
  res.end();
};

const gameStatus = (req, res) => {
  res.json(req.game.status());
};

const play = (req, res) => {
  const turnResult = req.game.play();
  res.json(turnResult);
};

module.exports = { play, validatePlayer, gameStatus };
