const { Dice } = require('./dice.js');

const play = (req, res) => {
  const dice = new Dice();
  const turnStats = dice.roll();

  const { currentPosition } = req.player;
  turnStats.prevPos = currentPosition || 1;
  turnStats.currPos = currentPosition + turnStats.face;
  req.player.currentPosition = turnStats.currPos;
  res.json(turnStats);
};

module.exports = { play };
