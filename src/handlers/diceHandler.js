const { Dice } = require('./dice.js');

const rollDice = (req, res) => {
  const dice = new Dice();
  const roll = dice.roll();
  res.json(roll);
};

module.exports = { rollDice };
