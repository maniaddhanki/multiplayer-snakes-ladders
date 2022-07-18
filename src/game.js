const registerPlayer = (name, playerIndex) => {
  const tokenColors = ['black', 'blue', 'red'];
  return { name, currPos: 0, id: playerIndex, color: tokenColors[playerIndex] };
};

class Game {
  #board;
  #players;
  #currPlayerIndex;
  #gameOver;

  constructor(board) {
    this.#board = board;
    this.#players = [];
    this.#currPlayerIndex = 0;
    this.#gameOver = false;
  }

  #rollDice() {
    return Math.ceil(Math.random() * 6);
  }

  #updatePlayerPosition(player, newPos) {
    player.currPos = newPos;
  }

  #updateGameStatus() {
    const result = this.#players.some(player =>
      this.#board.isTargetReached(player.currPos));
    this.#gameOver = result;
  }

  #updateCurrPlayer() {
    const newIndex = this.#currPlayerIndex + 1;
    this.#currPlayerIndex = newIndex < this.#players.length ? newIndex : 0;
  }

  #getCurrentPlayer() {
    const currPlayer = this.#players[this.#currPlayerIndex];
    return currPlayer;
  }

  addPlayer(name) {
    const playerIndex = this.#players.length;
    const player = registerPlayer(name, playerIndex);
    this.#players.push(player);
    return playerIndex;
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
    return { positions, currPlayer, gameOver: this.#gameOver };
  }

  play() {
    const player = this.#getCurrentPlayer();
    const diceValue = this.#rollDice();
    const currPos = player.currPos;
    const newPos = this.#board.getPosition(currPos, diceValue);
    this.#updatePlayerPosition(player, newPos);
    this.#updateGameStatus();
    this.#updateCurrPlayer();
    return { diceValue, player, gameOver: this.#gameOver };
  }
}

module.exports = { Game };
