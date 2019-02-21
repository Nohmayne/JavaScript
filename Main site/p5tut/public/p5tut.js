var x;
var y;

var pSize = 10;
var paths = [];
var capture = false;
var curPath = 0;

var socket;
var data;

function setup() {
  x = 1000;
  y = 1000;

  socket = io.connect('localhost:3000');
  socket.on('cPaths', otherPath);
  socket.on('cClear', cClear);
  socket.on('cUndo', cUndo);

  createCanvas(x, y);
  background(255);
}

function otherPath(data) {
  for (var i = 0; i < data.paths.length; i++) {
    for (var j = 0; j < data.paths[i].length - 1; j++) {
      strokeWeight(pSize);
      fill(180, 80, 80);
      line(data.paths[i][j].x, data.paths[i][j].y, data.paths[i][j + 1].x, data.paths[i][j + 1].y);
    }
  }
}

function cClear(data) {
  paths = [];
  data.paths = [];
  curPath = 0;
  clear();
  background(255);
}

function cUndo(data) {
  paths.pop();
  data.paths.pop();
  curPath--;
  if (curPath < 0) {
    curPath = 0;
  }
}

function draw() {
  if (capture) {
    paths[curPath].aPoint(mouseX, mouseY, pSize);
  }

  spaths = [];

  for (var i = 0; i < paths.length; i++) {
    paths[i].show();
    spaths.push(paths[i].points);
  }

  data = {
    paths: spaths,
  };
  socket.emit('Paths', data);
}

function mousePressed() {
  pushPath = new Path();
  paths.push(pushPath);
  capture = true;
}

function mouseReleased() {
  capture = false;
  curPath++;
}

function keyTyped() {
  if (key == 'z' || key == 'Z') {
    paths.pop();
    curPath = paths.length - 1;

    socket.emit('Undo', data);
  }

  if (key == 'c' || key == 'C') {
    paths = [];
    curPath = 0;
    clear();
    background(255);
    socket.emit('Clear', data);
  }
}
