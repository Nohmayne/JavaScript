// Set global constants
const FPS = 60;

// Set up base canvas variables
/** @type {HTMLCanvasElement} */
var canv = document.getElementById("svcanvas");
var ctx = canv.getContext("2d");

// Set canv vars used in program
var cw = canv.width;
var ch = canv.height;

// Add event listener
document.addEventListener("keydown", keyDown);

// Define program variables
var type = "Selection";

var clw = 10;
var clnum = cw / clw;
var clh = ch / clnum;
var values = [];
for (var i = 0; i < clnum; i++) {
  values.push(i * clh);
}
var sorting = false;
var index = 0;
var focus = values.length;

if (type === "Selection") {
  var highest = 0;
}

// Run update at FPS
setInterval(update, 1000 / FPS);

// Runs on key press
function keyDown(/** @type {KeyboardEvent} */ ev) {
  switch (ev.code) {
    case "KeyR": // Randomize array
      values.sort(function(a, b){return 0.5 - Math.random()});
      var index = 0;
      var focus = values.length;
      break;
    case "Space":
      sorting = !sorting;
      var index = 0;
      var focus = values.length;
      break;
  }
}

// Does basically everything
function update() {
  // Draw background
  ctx.fillStyle = "Black";
  ctx.fillRect(0, 0, cw, ch);

  // Draw cols
  ctx.fillStyle = "White";
  ctx.strokeStyle = "Black";
  for (var i = 0; i < values.length; i++) {
    ctx.fillRect(i * clw + 1, ch - values[i], clw, values[i]);
    ctx.strokeRect(i * clw + 1, ch -values[i], clw, values[i]);
  }

  // Do 5 times per frame
  for (var i = 0; i < 5; i++) {
    if (type === "Bubble") {
      // Sort and Draw
      ctx.strokeStyle = "Black";
      if (sorting && index < focus) {
        if (values[index] > values[index + 1]) {
          var temp = values[index];
          values[index] = values[index + 1];
          values[index + 1] = temp;

          ctx.fillStyle = "Red";
          ctx.fillRect(index * clw + 1, ch - values[index], clw, values[index]);
          ctx.strokeRect(index * clw + 1, ch - values[index], clw, values[index]);

        }
        index++;
      } else if (sorting) {
        index = 0;
        focus--;
        if (focus <= 0) {
          sorting = false;
        }
      }
    } else if (type === "Selection") {
      // Sort and Draw
      ctx.strokeStyle = "Black";
      if (sorting && index < focus - 1) {
        if (values[index] > values[highest]) {
          highest = index;

        }
        index++;
      } else if (sorting) {
        var temp = values[highest];
        values[highest] = values[focus - 1];
        values[focus - 1] = temp;

        index = 0;
        focus--;
        if (focus <= 0) {
          sorting = false;
        }
      }
      ctx.fillStyle = "Red";
      ctx.fillRect(index * clw + 1, ch - values[index], clw, values[index]);
      ctx.strokeRect(index * clw + 1, ch - values[index], clw, values[index]);
      ctx.fillStyle = "Green";
      ctx.fillRect(highest * clw + 1, ch - values[highest], clw, values[highest]);
      ctx.strokeRect(highest * clw + 1, ch - values[highest], clw, values[highest]);

      console.log(highest);
    }
  }
}
