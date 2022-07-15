const injectGame = (game) => {
  return (req, res, next) => {
    req.game = game;
    next();
  }
}

module.exports = { injectGame };
