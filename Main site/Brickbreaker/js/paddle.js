class Paddle {
  constructor () {
    this.w = 200;
    this.h = 10;
    this.x = w / 2;
    this.y = h - (this.h * 2);
    this.lex = 0;
    this.vel = 0;
  }

  update() {
    this.lex = this.x;
    this.x = mouseX;
    this.vel = this.x - this.lex;
  }

  show() {
    noFill();
    strokeWeight(5);
    stroke('#33ccff');
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
  }
}
