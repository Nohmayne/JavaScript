// Define global constants
const FPS = 60;
const PI = Math.PI;
const TWO_PI = PI * 2;

// Define essential canvas variables
/** @type {HTMLCanvasElement} */
var canv = document.getElementById("expcanv");
var ctx = canv.getContext("2d");

var cw = canv.width;
var ch = canv.height;

// Define program variables
var rx = cw / 2;
var ry = ch / 4;
var rrad = 80;
var prad = 15;

var grd = ctx.createLinearGradient(0, 0, cw, ch);
grd.addColorStop(0, "DeepPink");
grd.addColorStop(1, "DarkOrange");

var angles = [PI / 4, 3 * PI / 4, 5 * PI / 4, 7 * PI / 4];
var gAngle = 0;

// Run update at FPS
setInterval(update, 1000 / FPS);

function update() {
  // Set background
  ctx.fillStyle = "Gainsboro";
  ctx.fillRect(0, 0, cw, ch);

  for (var i = 0; i < angles.length; i++) {
    // Define rect point
    var p1 = {
      x:rx + rrad * Math.cos(angles[i]),
      y:ry + rrad * Math.sin(angles[i]),
    }
    if (i !== angles.length - 1) {
      var p2 = {
        x:rx + rrad * Math.cos(angles[i+1]),
        y:ry + rrad * Math.sin(angles[i+1]),
      }
    } else {
      var p2 = {
        x:rx + rrad * Math.cos(angles[0]),
        y:ry + rrad * Math.sin(angles[0]),
      }
    }

    // Draw lines between points
    ctx.strokeStyle = "Black";
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();

    // Draw rect point
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(p1.x, p1.y, prad, 0, TWO_PI);
    ctx.fill();

    // Decrease angle
    angles[i] -= 0.01;
  }

  // Rotate rect around center
  rx = (cw / 2) + (ch / 4) * Math.cos(gAngle);
  ry = (ch / 2) + (ch / 4) * Math.sin(gAngle);

  // Decrease gAngle
  gAngle -= 0.01;

}
