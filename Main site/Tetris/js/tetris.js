// Base global constants
const FPS = 60;

// Canvas vars
/** @type {HTMLCanvasElement}*/
var canv = document.getElementById("tcanvas");
var ctx = canv.getContext("2d");

var cw = canv.width;
var ch = canv.height;

// Program vars
var playing = false;

var bw = cw / 3;
var bh = ch;
var bpw = bw / 10;
var bph = bh / 20;

var ptypes = [
  "O",
  "I",
  "T",
  "S",
  "Z",
  "J",
  "L"
];
var pieces = [newPiece(5, 0, ptypes[Math.floor(Math.random() * ptypes.length)])];
pieces[0].setup();
var currentPiece = 0;

var board = [];
var lineClear = [];

var fcounter = FPS;
var fdrop = false;

var rmoved = false;
var lmoved = false;

// Debug vars
var grid = false;

// Set up board
for (var i = 0; i < 20; i++) {
  board[i] = [];
  for (var j = 0; j < 10; j++) {
    board[i][j] = {
      x: (j * bpw) + (cw / 3),
      y: i * bph,
      filled: false,
      color: "Black"
    };
  }
}
// console.log(board);

// Keyboard event handling
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// Run update() at FPS
setInterval(update, 1000 / FPS);

// Functions
function keyDown( /** @type {KeyboardEvent} */ ev) {
  switch (ev.code) {
    // Game
    case "Space":
      if (!playing) {
        playing = true;
      }
      break;
    case "Escape":
      if (playing) {
        playing = false;
      }
      break;
    case "ArrowLeft":
      if (!pieces[currentPiece].locked) {
        move = true;
      } else {
        move = false;
      }
      for (var i = 0; i < pieces[currentPiece].bps.length; i++) {
        if (pieces[currentPiece].bps[i].x === 0) {
          move = false;
        }
      }
      if (move && !lmoved) {
        for (var j = 0; j < pieces[currentPiece].bps.length; j++) {
          pieces[currentPiece].bps[j].x -= 1;
          lmoved = true;
        }
      }
      break;
    case "ArrowRight":
      if (!pieces[currentPiece].locked) {
        move = true;
      } else {
        move = false;
      }
      for (var q = 0; q < pieces[currentPiece].bps.length; q++) {
        if (pieces[currentPiece].bps[q].x === board[0].length - 1) {
          move = false;
        }
      }
      if (move && !rmoved) {
        for (var r = 0; r < pieces[currentPiece].bps.length; r++) {
          pieces[currentPiece].bps[r].x += 1;
          rmoved = true;
        }
      }
      break;
    case "ArrowDown":
      fdrop = true;
      break;
      // Debug
    case "KeyG":
      grid = !grid;
      break;
  }
}

function keyUp( /** @type {KeyboardEvent} */ ev) {
  switch (ev.code) {
    case "ArrowLeft":
      lmoved = false;
      break;
    case "ArrowRight":
      rmoved = false;
      break;
    case "ArrowDown":
      fdrop = false;
      break;
  }
}

function newPiece(relx, rely, type) {
  return {
    x: relx,
    y: rely,
    type: type,
    locked: false,
    color: "White",
    bps: [],
    // Set up piece
    setup: function() {
      switch (this.type) {
        case "O":
          this.color = "#ffee00";
          this.bps.push({
            x: this.x,
            y: this.y
          });
          this.bps.push({
            x: this.x + 1,
            y: this.y
          });
          this.bps.push({
            x: this.x,
            y: this.y + 1
          });
          this.bps.push({
            x: this.x + 1,
            y: this.y + 1
          });
          break;
        case "I":
          this.color = "#00ffff";
          this.bps.push({
            x: this.x,
            y: this.y
          });
          this.bps.push({
            x: this.x,
            y: this.y + 1
          });
          this.bps.push({
            x: this.x,
            y: this.y + 2
          });
          this.bps.push({
            x: this.x,
            y: this.y + 3
          });
          break;
        case "T":
          this.color = "#ab00ff";
          this.bps.push({
            x: this.x,
            y: this.y
          });
          this.bps.push({
            x: this.x - 1,
            y: this.y + 1
          });
          this.bps.push({
            x: this.x,
            y: this.y + 1
          });
          this.bps.push({
            x: this.x + 1,
            y: this.y + 1
          });
          break;
        case "S":
          this.color = "#00ff00";
          this.bps.push({
            x: this.x,
            y: this.y
          });
          this.bps.push({
            x: this.x + 1,
            y: this.y
          });
          this.bps.push({
            x: this.x,
            y: this.y + 1
          });
          this.bps.push({
            x: this.x - 1,
            y: this.y + 1
          });
          break;
        case "Z":
          this.color = "#ff1010";
          this.bps.push({
            x: this.x,
            y: this.y
          });
          this.bps.push({
            x: this.x - 1,
            y: this.y
          });
          this.bps.push({
            x: this.x,
            y: this.y + 1
          });
          this.bps.push({
            x: this.x + 1,
            y: this.y + 1
          });
          break;
        case "J":
          this.color = "#2040ff";
          this.bps.push({
            x: this.x,
            y: this.y + 1
          });
          this.bps.push({
            x: this.x - 1,
            y: this.y + 1
          });
          this.bps.push({
            x: this.x + 1,
            y: this.y + 1
          });
          this.bps.push({
            x: this.x - 1,
            y: this.y
          });
          break;
        case "L":
          this.color = "#ff7700";
          this.bps.push({
            x: this.x,
            y: this.y + 1
          });
          this.bps.push({
            x: this.x - 1,
            y: this.y + 1
          });
          this.bps.push({
            x: this.x + 1,
            y: this.y + 1
          });
          this.bps.push({
            x: this.x + 1,
            y: this.y
          });
      }
    },
    // Draw piece
    draw: function() {
      ctx.fillStyle = this.color;
      ctx.strokeStyle = "Black";
      ctx.lineWidth = 2;
      for (var i = 0; i < this.bps.length; i++) {
        // Draw piece and outlines
        ctx.fillRect(
          board[this.bps[i].y][this.bps[i].x].x,
          board[this.bps[i].y][this.bps[i].x].y,
          bpw,
          bph
        );
        ctx.strokeRect(
          board[this.bps[i].y][this.bps[i].x].x,
          board[this.bps[i].y][this.bps[i].x].y,
          bpw,
          bph
        );
        // Check if piece is at bottom & lock
        if (this.bps[i].y === board.length - 1 && !this.locked) {
          this.locked = true;
          currentPiece++;
          for (var r = 0; r < board.length; r++) {
            if (evalLine(r)) {
              clearLine(r);
            }
          }
          // console.log("Locking piece of type " + this.type + " at index " + (currentPiece - 1) + "...");
        } else {
          for (var j = 0; j < pieces.length; j++) {
            for (var q = 0; q < pieces[j].bps.length; q++) {
              if (!this.locked && j !== currentPiece) {
                if (this.bps[i].y === pieces[j].bps[q].y - 1) {
                  if (this.bps[i].x === pieces[j].bps[q].x) {
                    this.locked = true;
                    currentPiece++;
                    for (var p = 0; p < board.length; p++) {
                      if (evalLine(p)) {
                        clearLine(p);
                      }
                    }
                  }
                }
                if (this.bps[i].x === pieces[j].bps[q].x - 1) {
                  if (this.bps[i].y === pieces[j].bps[q].y) {
                    rmoved = true;
                    console.log("rmoved being set to true");
                  }
                } else if (this.bps[i].x === pieces[j].bps[q].x + 1) {
                  if (this.bps[i].y === pieces[j].bps[q].y) {
                    lmoved = true;
                    console.log("lmoved being set to true");
                  }
                }
              }
            }
          }
        }
      }
      // console.log(this.type);
    }
  };
}

function evalLine(lineNum) {
  lineClear = [];
  add = false;
  for (var i = 0; i < board[lineNum].length; i++) {
    for (var j = 0; j < pieces.length; j++) {
      for (var q = 0; q < pieces[j].bps.length; q++) {
        if (board[lineNum][i] === board[pieces[j].bps[q].y][pieces[j].bps[q].x]) {
          add = true;
        }
      }
    }
    lineClear[i] = add;
    add = false;
  }
  clear = true;
  for (var r = 0; r < lineClear.length; r++) {
    if (!lineClear[r]) {
      clear = false;
    }
  }
  return clear;
}

function clearLine(lineNum) {
  // console.log("clearing line " + lineNum);

}

function update() {
  // Fill background
  ctx.fillStyle = "Black";
  ctx.fillRect(0, 0, cw, ch);

  // Check if the game is in session
  if (!playing) {
    // Draw title text
    ctx.fillStyle = "White";
    ctx.font = "108px VT323";
    ctx.textAlign = "center";
    ctx.fillText("Tetris", cw / 2, ch / 2);
  } else {
    // Draw board outline
    ctx.strokeStyle = "White";
    ctx.lineWidth = 5;
    ctx.strokeRect((cw / 3) - 2.5, 0, bw + 2.5, bh);

    // Set current piece

    // Iterate through pieces
    for (var i = 0; i < pieces.length; i++) {
      // Draw piece
      pieces[i].draw();
    }
    // Move every piece down if it is time
    if (fcounter === 0) {
      if (currentPiece < pieces.length) {
        for (var r = 0; r < pieces[currentPiece].bps.length; r++) {
          if (!pieces[currentPiece].locked) {
            pieces[currentPiece].bps[r].y += 1;
          }
        }
      } else {
        pieces.push(newPiece(5, 0, ptypes[Math.floor(Math.random() * ptypes.length)]));
        // console.log("Pushing new piece...")
        // console.log("New piece is type " + pieces[currentPiece].type + " at index " + currentPiece + ".");
        // console.log("Setting up piece...")
        pieces[currentPiece].setup();
        rmoved = false;
        lmoved = false;
      }
    }

    // DEBUG: Outline grid parts
    if (grid) {
      for (var q = 0; q < board.length; q++) {
        for (var j = 0; j < board[q].length; j++) {
          xpos = board[q][j].x;
          ypos = board[q][j].y;

          ctx.strokeStyle = "White";
          ctx.lineWidth = 1;
          ctx.strokeRect(xpos, ypos, bpw, bph);
        }
      }
    }

    // Decrease fall counter if not 0
    if (fcounter <= 0) {
      fcounter = FPS;
    } else {
      if (fdrop) {
        fcounter -= 10;
      } else {
        fcounter -= 1;
      }
    }
  }
}
