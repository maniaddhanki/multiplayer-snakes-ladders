const registerPlayer = (name, id, playerIndex) => {
  const tokenColors = ['red', 'black', 'blue'];
  return { name, currPos: 0, id, color: tokenColors[playerIndex] };
};

class Game {
  #board;
  #players;
  #currPlayerIndex;

  constructor(board) {
    this.#board = board;
    this.#players = [];
    this.#currPlayerIndex = 0
  }

  #rollDice() {
    return Math.ceil(Math.random() * 6);
  }

  #updatePlayerPosition(player, newPos) {
    player.currPos = newPos;
  }

  #isOver() {
    return this.#players.some(player =>
      this.#board.isTargetReached(player.currPos));
  }

  #updateCurrPlayer() {
    const newIndex = this.#currPlayerIndex + 1;
    this.#currPlayerIndex = newIndex < this.#players.length ? newIndex : 0;
  }

  #getCurrentPlayer() {
    const currPlayer = this.#players[this.#currPlayerIndex];
    return currPlayer;
  }

  addPlayer(name, id) {
    const playerIndex = this.#players.length;
    const player = registerPlayer(name, id, playerIndex);
    this.#players.push(player);
  }

  validateTurn(id) {
    const currPlayer = this.#getCurrentPlayer();
    return currPlayer.id === id;
  }

  status() {
    const positions = this.#players.map(player => {
      const { name, currPos, color } = player;
      return { name, currPos, color };
    });
    const currPlayer = this.#getCurrentPlayer();
    return { positions, currPlayer };
  }

  play() {
    const player = this.#getCurrentPlayer();
    const diceValue = this.#rollDice();
    const currPos = player.currPos;
    const newPos = this.#board.getPosition(currPos, diceValue);
    this.#updatePlayerPosition(player, newPos);
    const gameOver = this.#isOver();
    console.log(this.#players);
    this.#updateCurrPlayer();
    return { diceValue, player, gameOver };
  }
}

module.exports = { Game };
