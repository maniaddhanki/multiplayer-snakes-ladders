class Board {
  #snakes;
  #ladders;
  #target
  constructor(snakes, ladders, target) {
    this.#snakes = snakes;
    this.#ladders = ladders;
    this.#target = target;
  }

  #snakeBite(position) {
    return this.#snakes[position];
  }

  #climbLadder(position) {
    return this.#ladders[position];
  }

  #isValidMove(nextPosition) {
    return nextPosition <= this.#target;
  }

  #next(position) {
    return this.#snakeBite(position) || this.#climbLadder(position) || position;
  }

  getPosition(currPos, diceFace) {
    const newPos = currPos + diceFace;
    return this.#isValidMove(newPos) ? this.#next(newPos) : currPos;
  }

  isTargetReached(position) {
    return position === this.#target;
  }
}

module.exports = { Board };
