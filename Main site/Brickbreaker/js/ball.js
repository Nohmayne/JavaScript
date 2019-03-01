class Ball {
  constructor() {
    this.x = w / 2;
    this.y = h / 2;
    this.w = 25;
    this.vel = createVector(-5, -2);
  }

  update() {
    this.x += this.vel.x;
    this.y += this.vel.y;
  }

  bounce() {
    if (this.x - (this.w / 2) < 0) {
      this.vel.x = -this.vel.x;
      this.x = this.w / 2;
    } else if (this.x + (this.w / 2) > w) {
      this.vel.x = -this.vel.x;
      this.x = w - this.w / 2;
    }

    if (this.y - (this.w / 2) < 0) {
      this.vel.y = -this.vel.y;
      this.y = this.w / 2;
    }

    if (this.x > p.x - p.w / 2 && this.x < p.x + p.w / 2) {
      if (this.y + (this.w / 2) < p.y + p.h / 2 && this.y + (this.w / 2) > p.y - p.h) {
        if (this.vel.x > 0) {
          this.vel.x--;
        } else if (this.vel.x < 0) {
          this.vel.x++;
        }

        this.vel.y = -this.vel.y;
        this.y -= this.w / 2;
        this.vel.x -= p.vel / 8;
      }
    }
  }

  death() {
    if (this.y + (this.w / 2) > w) {
      return true;
    } else {
      return false;
    }
  }

  show() {
    noFill();
    strokeWeight(5);
    stroke(255);
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.w);
  }
}
