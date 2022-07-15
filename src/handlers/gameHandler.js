const play = (req, res) => {
  const turnResult = req.game.play();
  res.json(turnResult);
};

module.exports = { play };
