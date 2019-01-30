// Define global constants
const FPS = 60;

// Define canvas variables
/** @type {HTMLCanvasElement} */
var canv = document.getElementById("tetriscanv");
var ctx = canv.getContext("2d");

var cw = canv.width;
var ch = canv.height;

// Program variables
var width = cw / 3;
var height = ch;

var pieces = [];

var spawn = true;

var clrs = [
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "Purple",
  "Magenta"
];

// Run update at FPS
setInterval(update, 1000 / FPS);

// Functions

// Piece constructor
function Piece(context, x, y, type, orientation, colors) {
  // Define piece variables from args
  this.ctx = context;
  this.x = x;
  this.y = y;
  this.type = type;
  this.ont = orientation;
  this.clrs = colors;
  this.clr = "";

  // Define native piece variables
  this.pw = width / 10;
  this.ph = ch / 20;

  this.piecelets = [];

  this.getColor = function () {
    this.clr = this.clrs[Math.random(this.clrs.length - 1)];
  }

  // Set up piecelets
  this.setPiecelets = function () {
    console.log("Setting Piecelets");
    if (this.type === "Square") {
      this.piecelets = [
        {x:this.x,y:this.y},
        {x:this.x+pw,y:this.y},
        {x:this.x+pw,y:this.y+ph},
        {x:this.x,y:this.y+py}
      ];
    }
  }

  // Piece draw function
  this.draw = function () {
    console.log("Drawing Piece");
    if (this.type === "Square") {
      this.ctx.fillStyle = this.getColor()
      this.ctx.strokeStyle = "Black";
      this.ctx.lineWidth = 1;
      for (pcl in this.piecelets) {
        this.ctx.fillRect(pcl.x, pcl.y, pw, ph);
        this.ctx.strokeRect(pcl.x, pcl.y, pw, ph);
      }
    }
  }
}

// Runs at FPS
function update() {
  // Draw background
  ctx.fillStyle = "Black";
  ctx.fillRect(0, 0, cw, ch);

  // Draw border
  ctx.strokeStyle = "White";
  ctx.lineWidth = 10;
  ctx.strokeRect(0, 0, cw, ch);
  ctx.strokeRect(width, 0, width, height);

  // Create pieces if necessary
  if (spawn) {
    var temPiece = Piece(ctx, cw / 2, ch / 2, "Square", 0, clrs);
    pieces.push(temPiece);

    spawn = false;
  }

  // Iterate through pieces Array
  for (var i = 0; i < pieces.length; i++) {
    // Set local var
    piece = pieces[i];

    // Set up pieces
    console.log(piece);
    piece.setPiecelets();

    // Draw piece
    console.log("Drawing pieces in UPDATE");
    piece.draw();
  }
}
