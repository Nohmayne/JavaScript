class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = w / 20;
    this.h = h / 20;
    this.clist = [
      createVector(255, 0, 0),
      createVector(0, 255, 0),
      createVector(0, 0, 255),
      createVector(255, 255, 0),
      createVector(255, 0, 255),
      createVector(0, 255, 255),
    ];
    this.color = this.clist[floor(random(6))];
    this.state = true;
  }

  break(ball) {
    if (this.state) {
      if (ball.x + ball.w > this.x - this.w / 2 && ball.x - ball.w < this.x + this.w / 2) {
        if (ball.y + ball.w > this.y - this.h / 2 && ball.y - ball.w < this.y - this.h / 2) {
          this.state = false;
          if (ball.vel.y > 0) {
            ball.vel.y = -ball.vel.y;
          }
        } else if (ball.y - ball.w < this.y + this.h / 2 && ball.y + ball.w > this.y - this.h / 2) {
          this.state = false;
          if (ball.vel.y < 0) {
            ball.vel.y = -ball.vel.y;
          }
        }
      }

      if (ball.y + ball.w > this.y - this.h / 2 && ball.y - ball.w < this.y + this.h / 2) {
        if (ball.x + ball.w > this.x - this.w / 2 && ball.x - ball.w < this.x - this.w / 2) {
          this.state = false;
          if (ball.vel.x > 0) {
            ball.vel.x = -ball.vel.x;
          }
        } else if (ball.x - ball.w < this.x + this.w / 2 && ball.x + ball.w > this.x + this.w / 2) {
          this.state = false;
          if (ball.vel.x < 0) {
            ball.vel.x = -ball.vel.x;
          }
        }
      }
    }
  }

  show() {
    if (this.state) {
      noFill();
      stroke(this.color.x, this.color.y, this.color.z);
      strokeWeight(5);
      rectMode(CENTER);
      rect(this.x, this.y, this.w, this.h);
    }
  }
}
