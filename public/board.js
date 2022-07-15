const numbersInRange = (start, end) => {
  const numbers = [];
  for (let number = start; number <= end; number++) {
    numbers.push(number);
  }
  return numbers;
};

class Board {
  #snakes;
  #ladders;
  #target
  constructor(snakes, ladders, target) {
    this.#snakes = snakes;
    this.#ladders = ladders;
    this.#target = target;
  }

  #getPath(position, nextPosition) {
    const snakeTail = this.#snakes[nextPosition];
    const ladderHead = this.#ladders[nextPosition];
    const extraMove = snakeTail || ladderHead;
    const path = numbersInRange(position, nextPosition);

    if (extraMove) {
      path.push(extraMove);
    }
    return path;
  }

  #isValidMove(nextPosition) {
    return nextPosition <= this.#target;
  }

  nextMove(position, diceFace) {
    let path = [];

    const nextPosition = position + diceFace;
    if (this.#isValidMove(nextPosition)) {
      path = this.#getPath(position, nextPosition);
    }
    return path;
  }
}
