const { Dice } = require('./dice.js');

const snakeBite = (pos) => {
  const snakes = {
    27: 1,
    21: 9,
    17: 4,
    19: 7
  }
  return snakes[pos];
};

const climbLadder = (pos) => {
  const ladders = {
    11: 26,
    3: 22,
    5: 8,
    20: 29
  }
  return ladders[pos];
};

const nextPos = (pos) => snakeBite(pos) || climbLadder(pos) || pos;

const getPosition = (pos, face) => {
  const newPos = pos + face;
  return isValidPos(newPos) ? nextPos(newPos) : pos;
};

const isValidPos = (pos) => pos <= 30;

const play = (req, res) => {
  const dice = new Dice();
  const turnStats = dice.roll();

  const { currentPosition } = req.player;
  turnStats.prevPos = currentPosition || 1;
  turnStats.currPos = getPosition(currentPosition, turnStats.face);
  req.player.currentPosition = turnStats.currPos;
  res.json(turnStats);
};

module.exports = { play };
