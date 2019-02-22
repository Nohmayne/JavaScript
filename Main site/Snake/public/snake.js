class Snake {
  constructor(scl) {
    this.x = 0;
    this.y = 0;
    this.scl = scl;

    this.xspeed = 1;
    this.yspeed = 0;

    this.dead = false;

    this.tail = [];
    this.length = 0;
  }

  update() {
    if (!this.dead) {
      this.tail[this.length] = createVector(this.x, this.y);
      for (var i = 0; i < this.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }

      this.x += this.xspeed * scl;
      this.y += this.yspeed * scl;
    }
  }

  show() {
    if (!this.dead) {
      fill(255);
    } else {
      fill(255, 80, 80);
    }

    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }

    rect(this.x, this.y, scl, scl);
  }

  death() {
    if (this.x < 0) {
      this.dead = true;
      this.x += scl;
    }

    if (this.x + scl > width) {
      this.dead = true;
      this.x -= scl;
    }

    if (this.y < 0) {
      this.dead = true;
      this.y += scl;
    }

    if (this.y + scl > height) {
      this.dead = true;
      this.y -= scl;
    }
  }

  eat(food) {
    if (this.x == food.x && this.y == food.y) {
      food.newLocation();
      this.length++;
    }
  }

  turn(direction) {
    this.xspeed = direction.x;
    this.yspeed = direction.y;
  }
}
