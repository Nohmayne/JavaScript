const FPS = 60;

var canv = document.getElementById('sweepcanv');
var ctx = canv.getContext('2d');

var cw = canv.width;
var ch = canv.height;

document.addEventListener('click', click);
document.addEventListener('keydown', keyDown);
document.addEventListener('mousemove', mouseMove)

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
var bombNum = 100;
var bPosp = [];
var grid = [];

var mousePos = {
  x: 0,
  y: 0,
};

for (var i = 0; i < playArea.gh; i++) {
  grid[i] = [];
  for (var j = 0; j < playArea.gw; j++) {
    grid[i][j] = newGridObj(
      j * playArea.bw,
      i * playArea.bh,
      'clear',
      0
    );
  }
}

for (var b = 0; b < bombNum; b++) {
  placed = false;
  nPos = {
    x: getRandomInt(0, playArea.gw - 1),
    y: getRandomInt(0, playArea.gh - 1),
  };
  filled = false;
  for (var n = 0; n < bPosp.length; n++) {
    if (bPosp[n] === nPos) {
      filled = true;
    }
  }

  if (!filled) {
    grid[nPos.y][nPos.x] = [];
    grid[nPos.y][nPos.x] = newGridObj(
      nPos.x * playArea.bw,
      nPos.y * playArea.bh,
      'bomb',
      0
    );
    bPosp.push(nPos);
    placed = true;
  }

  if (!placed) {
    b--;
  }
}

for (var p = 0; p < grid.length; p++) {
  for (var q = 0; q < grid[p].length; q++) {
    grid[p][q].findSurrounding(grid, p, q);
  }
}

setInterval(update, 1000 / FPS);

function getRandomInt(min, max) {
  return min + (Math.floor(Math.random() * Math.floor(max)));
}

function mouseMove(ev) {
  mousePos.x = ev.clientX;
  mousePos.y = ev.clientY;
}

function click(ev) {
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      clement = grid[i][j];
      if (mousePos.x >= clement.x && mousePos.x <= clement.x + playArea.bw) {
        if (mousePos.y >= clement.y && mousePos.y <= clement.y + playArea.bh) {
          if (!clement.flagged) {
            clement.clicked = true;
            if (clement.surrounding === 0) {
              clement.clearSurrounding(grid, i, j);
            }
          }
        }
      }
    }
  }
}

function keyDown(ev) {
  switch (ev.code) {
    case 'KeyF':
      for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
          clement = grid[i][j];
          if (mousePos.x >= clement.x && mousePos.x <= clement.x + playArea.bw) {
            if (mousePos.y >= clement.y && mousePos.y <= clement.y + playArea.bh) {
              if (!clement.clicked) {
                clement.flagged = !clement.flagged;
              }
            }
          }
        }
      }

      break;
    default:
      break;
  }
}

function newGridObj(x, y, id, surrounding) {
  return {
    x: x + buffer,
    y: y + buffer + bannerHeight,
    id: id,
    surrounding: surrounding,
    clicked: false,
    flagged: false,
    draw: function () {
      if (!this.clicked) {
        ctx.strokeStyle = 'Black';
        ctx.lineWidth = 1;
        ctx.strokeRect(this.x, this.y, playArea.bw, playArea.bh);

        ctx.fillStyle = 'Gray';
        ctx.fillRect(this.x, this.y, playArea.bw, playArea.bh);

        ctx.fillStyle = 'Gainsboro';
        ctx.fillRect(this.x + 3, this.y + 3, playArea.bw - 3 * 2, playArea.bh - 3 * 2);

        if (this.flagged) {
          ctx.fillStyle = 'Red';
          ctx.font = '' + playArea.bw + 'px Helvetica';
          ctx.fillText('F', this.x + playArea.bw / 4, this.y + playArea.bh - buffer);
        }
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
          case 9:
            ctx.fillStyle = '#08FA3B';
            break;
          default:
            ctx.fillStyle = 'White';
            break;
        }
        if (this.surrounding !== 0 && this.id !== 'bomb') {
          ctx.font = '' + playArea.bw + 'px Helvetica';
          ctx.fillText(this.surrounding, this.x + playArea.bw / 4, this.y + playArea.bh - buffer);
        } else if (this.surrounding !== 0) {
          ctx.fillStyle = 'White';
          ctx.font = '' + playArea.bw + 'px Helvetica';
          ctx.fillText('B', this.x + playArea.bw / 4, this.y + playArea.bh - buffer);
        }
      }
    },

    findSurrounding: function (array, index1, index2) {
      bReturn = 0;
      for (var i = -1; i < 2; i++) {
        for (var j = -1; j < 2; j++) { //TODO: Fix negative indexing
          if (index1 - i >= 0 && index2 - j >= 0) {
            if (index1 - i < array.length && index2 - j < array[index1 - i].length) {
              if (array[index1 - i][index2 - j].id === 'bomb') {
                bReturn++;
              }
            }
          }
        }
      }

      this.surrounding = bReturn;
      return bReturn;
    },

    clearSurrounding: function (array, index1, index2) {
      for (var i = -1; i < 2; i++) {
        for (var j = -1; j < 2; j++) {
          if (index1 - i >= 0 && index2 - j >= 0) {
            if (index1 - i < array.length && index2 - j < array[index1 - i].length) {
              if (array[index1 - i][index2 - j].surrounding === 0 &&
                array[index1 - i][index2 - j].clicked === false) {
                console.log('Clearing at ' + (index1 - i) + ', ' + (index2 - j));
                array[index1 - i][index2 - j].clicked = true;
                this.clearSurrounding(array, index1 - i, index2 - j);
              }

              array[index1 - i][index2 - j].clicked = true;
            }
          }
        }
      }
    },
  };
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
