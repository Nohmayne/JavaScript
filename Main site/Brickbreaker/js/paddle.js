class Paddle {
  constructor () {
    this.w = 200;
    this.h = 10;
    this.x = w / 2;
    this.y = h - (this.h * 2);
    this.lex = 0;
    this.vel = 0;
    this.clist = [
      createVector(255, 0, 0),
      createVector(0, 255, 0),
      createVector(0, 0, 255),
      createVector(255, 255, 0),
      createVector(255, 0, 255),
      createVector(0, 255, 255),
    ];
    this.color = this.clist[5];
  }

  update() {
    this.lex = this.x;
    this.x = mouseX;
    this.vel = this.x - this.lex;
  }

  change() {
    this.color = this.clist[floor(random(6))];
  }

  show() {
    noFill();
    strokeWeight(5);
    stroke(this.color.x, this.color.y, this.color.z);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
  }
}
