var width;
var height;

var scl = 15;
var s;
var f;

function setup() {
  width = 800;
  height = 600;

  s = new Snake(scl);
  f = new Food();

  createCanvas(width, height);
  frameRate(10);
  background(57);
}

function draw() {
  background(57);
  f.show();
  s.update();
  s.eat(f);
  s.death();
  s.show();
}

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      s.turn(createVector(0, -1));
      break;
    case DOWN_ARROW:
      s.turn(createVector(0, 1));
      break;
    case LEFT_ARROW:
      s.turn(createVector(-1, 0));
      break;
    case RIGHT_ARROW:
      s.turn(createVector(1, 0));
      break;
    default:
      break;
  }
}

function mouseClicked() {
  f.newLocation();
}
