class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = w / 20;
    this.h = h / 20;
    this.color = createVector(
      floor(random(0, 255)),
      floor(random(0, 255)),
      floor(random(0, 255))
    );
  }

  show() {
    noFill();
    stroke(this.color.x, this.color.y, this.color.z);
    strokeWeight(5);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
  }
}
