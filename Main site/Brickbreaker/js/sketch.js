var w = screen.availWidth;
var h;

var p;
var b;
var bricks = [];

function setup() {
  h = screen.availHeight - (screen.availHeight / 5);

  p = new Paddle();
  b = new Ball();

  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 20; j++) {
      bricks.push(new Brick((w / 40) + (w / 20) * j, (h / 40) + (h / 20) * i));
    }
  }

  createCanvas(w, h);
}

function draw() {
  background(0);
  if (!b.death()) {
    for (var i = 0; i < bricks.length; i++) {
      bricks[i].break(b);
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
    rect(w / 2, h / 2, 400, 200);

    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(75);
    text('Game Over', w / 2, h / 2);
  }
}
