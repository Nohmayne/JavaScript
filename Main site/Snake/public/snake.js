class Snake {
  constructor() {
    this.length = 0;
    this.alive = true;
    this.direction = 'N';
    this.pieces = [];
  }

  setPieces() {
    this.pieces[0] = {
      x: width / 2,
      y: height / 2,
      d: 'N',
    };
  }

  turn(direction) {
    if (this.direction != direction) {
      this.direction = direction;
    }
  }
}
