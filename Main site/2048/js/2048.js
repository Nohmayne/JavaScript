var w = screen.availHeight;

var board = [];
var bw;
var scl;
var buffer = 5;

function setup() {
  createCanvas(w, w);

  bw = 4;
  scl = w / bw;
  for (var i = 0; i < bw; i++) {
    board.push([]);
    for (var j = 0; j < bw; j++) {
      board[i].push(createPiece(j, i, 0));
    }
  }

  v1 = floor(random(0, bw));
  v2 = floor(random(0, bw));
  board[v1][v2] = createPiece(v2, v1, 2);

  console.log(board);
}

function draw() {
  background(200);
  for (var i = 0; i < bw; i++) {
    for (var j = 0; j < bw; j++) {
      if (board[i][j].v > 0) {
        stroke(100);
        strokeWeight(buffer);
        fill(150);
        rect((i * scl) + buffer, (j * scl) + buffer, scl - buffer * 2, scl - buffer * 2);
      }
    }
  }
}

function keyPressed() {
  for (var i = 0; i < bw; i++) {
    for (var j = 0; j < bw; j++) {
      if (board[i][j].v > 0) {
        while (board[i][j].rx)
      }
    }
  }
}

function createPiece(relx, rely, value) {
  return {
    v: value,
    rx: relx,
    ry: rely,
  };
}
