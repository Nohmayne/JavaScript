// Set basic global constants for canvas
const FPS = 60;
const TWO_PI = Math.PI * 2;

// Set canvas variables
/** @type {HTMLCanvasElement} */
var canv = document.getElementById("fouriertf");
var ctx = canv.getContext("2d");

const cw = canv.width;
const ch = canv.height;

// Setup input
document.addEventListener("keydown", keyDown);

// Set program variables
var cnum = 50;
const crad = 80;
const prad = 3;
var angle = Math.PI / 2;

var trace = [];

// Loop update
setInterval(update, 1000 / FPS);

function keyDown(/** @type {KeyboardEvent} */ ev) {
  if (ev.code === "Space") {
    cnum += 1;
  }
}

function update() {
  // Draw background
  ctx.fillStyle = "Gainsboro";
  ctx.fillRect(0, 0, cw, ch);

  // Draw circles
  for (var i = 0; i < cnum; i++) {
    // Draw first circle and arm
    if (i === 0) {
      // Define circle variables
      var cx = crad * 2;
      var cy = ch / 2;

      var px = cx + crad * Math.cos(angle);
      var py = cy + crad * Math.sin(angle);

      // Draw circle
      ctx.strokeStyle = "Black";
      ctx.beginPath();
      ctx.arc(cx, cy, crad, 0, TWO_PI);
      ctx.stroke();

      // Draw arm
      ctx.strokeStyle = "Black";
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(px, py);
      ctx.stroke();

      // Draw point on arm
      ctx.fillStyle = "Black";
      ctx.beginPath();
      ctx.arc(px, py, prad, 0, TWO_PI);
      ctx.fill();
    } else { // Draw other circles
      // Set new circle coordinates
      cx = px;
      cy = py;

      px = cx + (crad / (i * 3)) * Math.cos(angle * (i * 3) + 1);
      py = cy + (crad / (i * 3)) * Math.sin(angle * (i * 3) + 1);

      // Draw new circles
      ctx.strokeStyle = "Black";
      ctx.beginPath();
      ctx.arc(cx, cy, crad / (i * 4), 0, TWO_PI);
      ctx.stroke();

      // Draw new arm
      ctx.strokeStyle = "Black";
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(px, py);
      ctx.stroke();

      // Draw new point
      ctx.fillStyle = "Black";
      ctx.beginPath();
      ctx.arc(px, py, prad, 0, TWO_PI);
      ctx.fill();
    }
  }

  // Draw arm
  ctx.strokeStyle = "Black";
  ctx.beginPath();
  ctx.moveTo(px, py);
  ctx.lineTo(crad * 4, py);
  ctx.stroke();

  // Draw trace point
  ctx.fillStyle = "Black";
  ctx.beginPath();
  ctx.arc(crad * 4, py, prad, 0, TWO_PI);
  ctx.fill();

  // Add last point to trace
  trace.unshift({x:crad * 4,y:py});

  // Shift all points in trace over by one
  ctx.strokeStyle = "Black";
  ctx.beginPath();
  ctx.moveTo(trace[0].x, trace[0].y);
  for (var j = 1; j < trace.length; j++) {
    trace[j].x += 0.5;
    ctx.lineTo(trace[j].x, trace[j].y);
  }
  trace[0].x += 0.5;
  ctx.stroke();

  angle -= 0.01;

}
