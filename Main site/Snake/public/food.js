class Food {
  constructor() {
    this.x = this.pickLocation().x;
    this.y = this.pickLocation().y;
  }

  pickLocation() {
    var x = floor(random(width / scl));
    var y = floor(random(height / scl));
    return {
      x: x * scl,
      y: y * scl,
    };
  }

  newLocation() {
    this.x = this.pickLocation().x;
    this.y = this.pickLocation().y;
  }

  show() {
    fill(255, 80, 80);
    rect(this.x, this.y, scl, scl);
  }
}
