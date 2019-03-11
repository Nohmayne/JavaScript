var width;
var height;

var scl = 15;
var s;
var splu = new Array(0);
var f;

function setup() {
  width = 1280;
  height = 720;

  s1 = new Snake(scl);
  s2 = new Snake(scl);
  splu[0] = s1;
  splu[1] = s2;
  f = new Food();

  createCanvas(width, height);
  frameRate(10);
  background(57);
}

function draw() {
  background(57);
  f.show();
  for (var i = 0; i < splu.length; i++) {
    splu[i].update();
    splu[i].eat(f);
    splu[i].death();
    splu[i].show();
  }
}

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      if (s1.yspeed != 1) {
        s1.turn(createVector(0, -1));
      }

      break;
    case DOWN_ARROW:
      if (s1.yspeed != -1) {
        s1.turn(createVector(0, 1));
      }

      break;
    case LEFT_ARROW:
      if (s1.xspeed != 1) {
        s1.turn(createVector(-1, 0));
      }

      break;
    case RIGHT_ARROW:
      if (s1.xspeed != -1) {
        s1.turn(createVector(1, 0));
      }

      break;
  }

  switch (key) {
    case 'a':
      if (s2.xspeed != 1) {
        s2.turn(createVector(-1, 0));
      }

      break;
    case 'w':
      if (s2.yspeed != 1) {
        s2.turn(createVector(0, -1));
      }

      break;
    case 's':
      if (s2.yspeed != -1) {
        s2.turn(createVector(0, 1));
      }

      break;
    case 'd':
      if (s2.xspeed != -1) {
        s2.turn(createVector(1, 0));
      }

      break;
    default:
      break;
  }
}

function mouseClicked() {
  f.newLocation();
  s1.length++;
}
