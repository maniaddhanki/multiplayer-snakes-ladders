class Game {
  #board;
  #player;

  constructor(board, player) {
    this.#board = board;
    this.#player = player;
  }

  #rollDice() {
    return Math.ceil(Math.random() * 6);
  }

  #updatePlayerPosition(newPos) {
    this.#player.currentPosition = newPos;
  }

  play() {
    const diceValue = this.#rollDice();
    const currPos = this.#player.currentPosition;
    const newPos = this.#board.getPosition(currPos, diceValue);
    this.#updatePlayerPosition(newPos);
    return { diceValue, currPos, newPos };
  }
}

module.exports = { Game };
