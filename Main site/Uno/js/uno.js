var FPS = 60;

var canv = document.getElementById('unocanv');
var ctx = canv.getContext('2d');

var cw = canv.width;
var ch = canv.height;

setInterval(update, 1000 / FPS);

function update() {
  ctx.fillStyle = '#2E4053';
  ctx.fillRect(0, 0, cw, ch);

}

function newHand(cards, possible) {
  hand = [];
  for (var i = 0; i < cards; i++) {
    hand.push(possible[randint(0, possible.length)]);
  }
}
