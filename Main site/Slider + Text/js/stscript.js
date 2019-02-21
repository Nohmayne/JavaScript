const FPS = 60;

var canv = document.getElementById('stcanvas');
var ctx = canv.getContext('2d');

var cw = canv.width;
var ch = canv.height;

var rw = 25;
var rh = 25;
var wSlide = document.getElementById('range1');
var hSlide = document.getElementById('range2');

setInterval(update, 1000 / FPS);

function update() {
  ctx.fillStyle = 'Gainsboro';
  ctx.fillRect(0, 0, cw, ch);

  ctx.fillStyle = 'White';
  ctx.fillRect(0, 0, rw, rh);

  rw = wSlide.value;
  rh = hSlide.value;
}
