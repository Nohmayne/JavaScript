var w = screen.availWidth;
var h;

var p;
var b;
var bricks = [];

function setup() {
  h = screen.availHeight - (screen.availHeight / 5);

  p = new Paddle();
  b = new Ball();

  bricks.push(new Brick(w / 2, h / 2));

  createCanvas(w, h);
}

function draw() {
  background(0);
  if (!b.death()) {
    for (var i = 0; i < bricks.length; i++) {
      bricks[i].show();
    }

    b.bounce();
    b.update();
    b.show();

    p.update();
    p.show();
  } else {
    noFill();
    strokeWeight(5);
    stroke(255);
    rectMode(CENTER);
    rect(w / 2, h / 2, 200, 100);
  }
}
