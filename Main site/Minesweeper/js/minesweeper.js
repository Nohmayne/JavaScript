const FPS = 60;

var canv = document.getElementById('sweepcanv');
var ctx = canv.getContext('2d');

var cw = canv.width;
var ch = canv.height;

document.addEventListener('click', click);

var bannerHeight = 20;
var buffer = 5;
var playArea = {
  x: buffer,
  y: bannerHeight + buffer,
  width: cw - buffer * 2,
  height: ch - buffer * 2 - bannerHeight,
  gw: 30,
  gh: 16,
  bw: 0,
  bh: 0,
};
playArea.bw = playArea.width / playArea.gw;
playArea.bh = playArea.height / playArea.gh;
var bombNum = 99;
var bombsLeft = bombNum;
var grid = [];

while (bombsLeft > 0) {
  for (var i = 0; i < playArea.gh; i++) {
    grid[i] = [];
    for (var j = 0; j < playArea.gw; j++) {
      if (getRandomInt(0, playArea.gw) <= 1) {
        grid[i][j] = newGridObj(
          j * playArea.bw,
          i * playArea.bh,
          'bomb',
          0
        );
        bombsLeft--;
      } else {
        grid[i][j] = newGridObj(
          j * playArea.bw,
          i * playArea.bh,
          'clear',
          0
        );
      }
    }
  }
}

setInterval(update, 1000 / FPS);

function getRandomInt(min, max) {
  return min + (Math.floor(Math.random() * Math.floor(max)));
}

function click(/** @type {KeyboardEvent} */ ev) {
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      cx = ev.pageX - buffer * 2;
      cy = ev.pageY - buffer * 2;
      clement = grid[i][j];
      if (ev.clientX >= clement.x && ev.clientX <= clement.x + playArea.bw) {
        if (ev.clientY >= clement.y && ev.clientY <= clement.y + playArea.bh) {
          clement.clicked = true;
          clement.findSurrounding(grid, i, j, true);
        }
      }
    }
  }
}

function newGridObj(x, y, id, surrounding) {
  return {
    x: x + buffer,
    y: y + buffer + bannerHeight,
    id: id,
    surrounding: surrounding,
    clicked: false,
    draw: function () {
      if (!this.clicked) {
        ctx.strokeStyle = 'Black';
        ctx.lineWidth = 1;
        ctx.strokeRect(this.x, this.y, playArea.bw, playArea.bh);

        ctx.fillStyle = 'Gray';
        ctx.fillRect(this.x, this.y, playArea.bw, playArea.bh);

        ctx.fillStyle = 'Gainsboro';
        ctx.fillRect(this.x + 3, this.y + 3, playArea.bw - 3 * 2, playArea.bh - 3 * 2);
      } else {
        ctx.strokeStyle = 'Black';
        ctx.lineWidth = 1;
        ctx.strokeRect(this.x, this.y, playArea.bw, playArea.bh);

        ctx.fillStyle = 'White';
        ctx.fillRect(this.x, this.y, playArea.bw, playArea.bh);

        ctx.strokeStyle = 'Black';
        switch (this.surrounding) {
          case 1:
            ctx.fillStyle = 'Blue';
            break;
          case 2:
            ctx.fillStyle = 'Green';
            break;
          case 3:
            ctx.fillStyle = 'Red';
            break;
          case 4:
            ctx.fillStyle = 'Purple';
            break;
          case 5:
            ctx.fillStyle = 'Maroon';
            break;
          case 6:
            ctx.fillStyle = 'Cyan';
            break;
          case 7:
            ctx.fillStyle = 'Yellow';
            break;
          case 8:
            ctx.fillStyle = 'Black';
            break;
          default:
            ctx.fillStyle = 'White';
            break;
        }
        if (this.surrounding !== 0 && this.id !== 'bomb') {
          ctx.font = '' + playArea.bw + 'px Helvetica';
          ctx.fillText(this.surrounding, this.x + playArea.bw / 4, this.y + playArea.bh - buffer);
        } else if (this.surrounding !== 0) {
          ctx.font = '' + playArea.bw + 'px Helvetica';
          ctx.fillText('B', this.x + playArea.bw / 4, this.y + playArea.bh - buffer);
        }
      }
    },

    findSurrounding: function (array, index1, index2, search) {
      bReturn = 0;
      for (var i = -1; i < 2; i++) {
        for (var j = -1; j < 2; j++) {
          if (array[index1 - i][index2 - j].id === 'bomb') {
            bReturn++;
          }

          if (search) {
            if (array[index1 - i][index2 - j].surrounding === 0) {
              console.log('0tile found');
            }
          }

        }
      }

      this.surrounding = bReturn;
      console.log(bReturn);
      return bReturn;
    },
  };
}

function chainClear() {

}

function update() {
  ctx.fillStyle = 'White';
  ctx.fillRect(0, 0, cw, ch);

  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      grid[i][j].draw();
    }
  }

}
