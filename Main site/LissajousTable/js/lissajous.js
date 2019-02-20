// Global constants
const FPS = 60;
const TWO_PI = Math.PI * 2;
const HALF_PI = Math.PI / 2;

// Set canvas and context variables
/** @type {HTMLCanvasElement} */
var canv = document.getElementById('ljtbl');
var ctx = canv.getContext('2d');

// Set basic global constants
//canv.width = screen.availWidth;
//canv.height = screen.availHeight;
const cw = canv.width;
const ch = canv.height;

// Set lissajous variables
var radius = 40;
var diameter = 2 * radius;
var padding = 10;
var angle = 0;
var prad = 5;
var lsj = [];
var trace = true;

// Set lsj to a list of nulls
for (var r = 0; (r + 1) < ch / diameter; r++) {
  lsj.push([]);
  for (var q = 0; (q + 1) < cw / diameter; q++) {
    lsj[r].push({points:[]});
  }
}

// Set misc. variables
var grd = ctx.createLinearGradient(0, 0, cw, ch);
grd.addColorStop(0, 'DeepPink');
grd.addColorStop(1, 'DarkOrange');

// Run update at fps
setInterval(update, 1000 / FPS);

// Update the screen
function update() {
  // Fill the background with black
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, cw, ch);

  // Set storage vars for re-use in stroking lissajous's
  var tcircs = 0;
  var lcircs = 0;
  var tcposs = [];
  var lcposs = [];

  // Draw top circles, points, and lines
  for (var i = 0; (i + 1) < cw / diameter; i++) {
    // Stroke circles and add to tcircs
    ctx.strokeStyle = 'white';
    circx = (i + 1.5) * diameter + padding;
    circy = radius + padding;
    ctx.beginPath();
    ctx.arc(circx, circy, radius - padding, 0, TWO_PI);
    ctx.stroke();
    tcircs += 1;
    ctx.closePath();

    // Fill point based on circle pos and angle
    ctx.fillStyle = 'white';
    px = circx + (radius - padding) * Math.cos(angle * (i + 1));
    py = circy + (radius - padding) * Math.sin(angle * (i + 1));
    ctx.beginPath();
    ctx.arc(px, py, prad, 0, TWO_PI);
    ctx.fill();
    ctx.closePath();

    // Stroke line based on point X
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(px, 0);
    ctx.lineTo(px, ch);
    ctx.stroke();
    ctx.closePath();

    // Add appropriate vars to tcposs
    tcposs[i] = px;
  }

  // Draw left circles, points, and lines
  for (var j = 0; (j + 1) < ch / diameter; j++) {
    // Stroke circles and add to lcircs
    ctx.strokeStyle = 'white';
    circx = radius + padding;
    circy = (j + 1.5) * diameter + padding;
    ctx.beginPath();
    ctx.arc(circx, circy, radius - padding, 0, TWO_PI);
    ctx.stroke();
    lcircs += 1;
    ctx.closePath();

    // Fill point based on circle pos and angle
    ctx.fillStyle = 'white';
    px = circx + (radius - padding) * Math.cos(angle * (j + 1));
    py = circy + (radius - padding) * Math.sin(angle * (j + 1));
    ctx.beginPath();
    ctx.arc(px, py, prad, 0, TWO_PI);
    ctx.fill();
    ctx.closePath();

    // Stroke line based on point Y
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(0, py);
    ctx.lineTo(cw, py);
    ctx.stroke();
    ctx.closePath();

    // Add appropriate vars to lcposs
    lcposs[j] = py;
  }

  // Draw points of intersection and strokes of lissajous's
  for (var k = 0; k < lcircs; k++) {
    for (var h = 0; h < tcircs; h++) {
      // Stop adding points if trace is false
      if (trace) {
        lsj[k][h].points.push({x:tcposs[h],y:lcposs[k]});
      }

      ///* COMMENTS IF STARTING TRACE = FALSE
      // Stroke lisajous
      ctx.beginPath()
      ctx.strokeStyle = grd;
      ctx.moveTo(lsj[k][h].points[0].x, lsj[k][h].points[0].y);
      for (var u = 1; u < lsj[k][h].points.length; u++) {
        ctx.lineTo(lsj[k][h].points[u].x, lsj[k][h].points[u].y)
      }
      ctx.stroke();
      ctx.closePath();
      //*/ // COMMENTS IF STARTING TRACE = FALSE

      // Draw points
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(tcposs[h], lcposs[k], prad, 0, TWO_PI);
      ctx.fill();
      ctx.closePath();
    }
  }

  // Decrease angle
  if (Math.abs(angle) < TWO_PI) { // After one full rotation...
    angle -= 0.01;
  } else if (TWO_PI <= Math.abs(angle) < TWO_PI * 2) { // ... stop tracing ...
    trace = false;
    angle -= 0.01;
  } else { // ... then set to 0.
    angle = 0;

    // Reset lsj
    lsj = [];
    for (var b = 0; (b + 1) < ch / diameter; b++) {
      lsj.push([])
      for (var p = 0; (p + 1) < cw / diameter; p++) {
        lsj[b].push({points:[]})
      }
    }
  }
}
