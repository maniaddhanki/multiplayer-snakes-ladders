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

  #isOver() {
    return this.#board.isTargetReached(this.#player.currentPosition);
  }

  play() {
    const diceValue = this.#rollDice();
    const currPos = this.#player.currentPosition;
    const newPos = this.#board.getPosition(currPos, diceValue);
    this.#updatePlayerPosition(newPos);
    const gameOver = this.#isOver();
    return { diceValue, currPos, newPos, gameOver };
  }
}

module.exports = { Game };
