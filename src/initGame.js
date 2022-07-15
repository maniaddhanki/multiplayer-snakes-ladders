const { Board } = require('./board.js');
const { Game } = require('./game.js');

const snakes = () => {
  return {
    27: 1,
    21: 9,
    17: 4,
    19: 7
  }
};

const ladders = () => {
  return {
    11: 26,
    3: 22,
    5: 8,
    20: 29
  }
};

const player = () => {
  return {
    name: 'mani',
    color: 'black',
    currentPosition: 0
  };
}

const initGame = () => {
  const target = 30;
  const board = new Board(snakes(), ladders(), target);
  const game = new Game(board, player());
  return game;
};

module.exports = { initGame };
