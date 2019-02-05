const FPS = 30; //fps
const PLAYER_SIZE = 0.1; //player size as fraction of canvas height
const MOVEMENT_SPEED = 0.2; //movement speed in pixels per second XX as fraction of canvas widths per second
const JUMP_SPEED = 14; //jump speed measured relatively

/** @type {HTMLCanvasElement} */
var canv = document.getElementById('gameCanvas');
var ctx = canv.getContext('2d');

//set up player
var player = {
  x: (canv.width / 2) - ((canv.height * PLAYER_SIZE) / 2),
  y: canv.height - (canv.height * PLAYER_SIZE),
  moving: false,
  jumping: false,
  motion: {
    x: 0,
    y: 0,
  },
};

//initiate level variables
var groundLevel = canv.height; //y coord of gl
var levelNum = 0;
var obstacles = [];
var keyed = false;

//set up event handlers
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// set up game loop
setInterval(update, 1000 / FPS);

function keyDown(/** @type {KeyboardEvent} */ ev) {
  switch (ev.code) {
    case 'KeyA': //start move left
      player.moving = true;
      player.motion.x = (canv.width * (-MOVEMENT_SPEED)) / FPS;
      break;
    case 'KeyD': //start move right
      player.moving = true;
      player.motion.x = (canv.width * (MOVEMENT_SPEED)) / FPS;
      break;
    case 'KeyW': //init jump
      player.jumping = true;
      if (!document.getElementById('jump')) {
        var lst = document.createElement('LI');
        var jText = document.createTextNode('W / SPACE = JUMP');
        lst.appendChild(jText);
        lst.setAttribute('id', 'jump');
        document.getElementById('controls').appendChild(lst);
      }

      break;
    case 'Space':
      player.jumping = true;
      if (!document.getElementById('jump')) {
        var lst = document.createElement('LI');
        var jText = document.createTextNode('W / SPACE = JUMP');
        lst.appendChild(jText);
        lst.setAttribute('id', 'jump');
        document.getElementById('controls').appendChild(lst);
      }

      break;
  }
}

function keyUp(/** @type {KeyboardEvent} */ ev) {
  switch (ev.code) {
    case 'KeyA': //start move left
      player.moving = false;
      break;
    case 'KeyD': //start move right
      player.moving = false;
      break;
    case 'KeyW': //stop jump
      player.jumping = false;
      break;
    case 'Space':
      player.jumping = false;
      break;
  }
}

function newObstacle(x, y, size, key) {
  var obstacle = {
    x: x,
    y: y,
    w: size,
    key: key,
  };
  return obstacle;
}

function update() {
  //draw background
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canv.width, canv.height);

  //update player pos
  player.x += player.motion.x;
  player.y -= player.motion.y;

  //glide to a stop
  if (!player.moving) {
    if (player.motion.x > 0) {
      player.motion.x -= MOVEMENT_SPEED * 4;
    } else if (player.motion.x < 0) {
      player.motion.x += MOVEMENT_SPEED * 4;
    }

    if (-MOVEMENT_SPEED * 4 < player.motion.x && player.motion.x < MOVEMENT_SPEED * 4) {
      player.motion.x = 0;
    }
  }

  //handle jumping
  if (player.jumping && player.y === groundLevel - (canv.height * PLAYER_SIZE)) {
    player.motion.y = JUMP_SPEED;
  } else if (player.y < groundLevel - (canv.height * PLAYER_SIZE)) {
    if (player.motion.y > -JUMP_SPEED) {
      if (player.jumping && player.motion.y > 0) {
        player.motion.y -= 0.6;
      } else {
        player.motion.y -= 1;
      }
    }
  } else if (player.y >= groundLevel - (canv.height * PLAYER_SIZE)) {
    player.motion.y = 0;
    player.y = groundLevel - (canv.height * PLAYER_SIZE);
  }

  //switch levels if necessary
  if ((player.x + (canv.height * PLAYER_SIZE) / 2) >= canv.width) {
    if (keyed === true) {
      levelNum += 1;
    }

    keyed = false;
    player.x = 0;
  } else if (player.x <= 0) {
    levelNum -= 1;
    keyed = true;
    player.x = canv.width - (canv.height * PLAYER_SIZE) / 2;
  }

  //draw different levels
  switch (levelNum) {
    case 0:
      obstacles = [];
      keyed = true;
      break;
    case 1:

      //create obstacles
      obstacles = [];
      obstacles.push(newObstacle(canv.width / 2, canv.height - 75, 75, true));

      //loop through each item in obstacles
      for (var i = 0; i < obstacles.length; i++) {
        //draw obstacles
        if (keyed) {
          ctx.fillStyle = 'gold';
        } else {
          ctx.fillStyle = 'white';
        }

        ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].w, obstacles[i].w);

        //handle player collision
        if ((player.x + (canv.height * PLAYER_SIZE) / 2) > obstacles[i].x && player.x < (obstacles[i].x + obstacles[i].w)) {
          if (player.y + (canv.height * PLAYER_SIZE) <= obstacles[i].y) {
            groundLevel = obstacles[i].y;
          } else {
            groundLevel = canv.height;
          }
        } else {
          groundLevel = canv.height;
        }
      }

      //key for next level
      if (groundLevel !== canv.height && keyed !== true) {
        keyed = true;
      } else if (keyed !== true) {
        keyed = false;
      }

      break;
    case 2:

      //create obstacles
      obstacles = [];
      obstacles.push(newObstacle(canv.width / 2 - 100, canv.height - 200, 75, true));
      obstacles.push(newObstacle(canv.width / 2, canv.height - 75, 75, false));

      //loop through each item in obstacles
      for (var i = 0; i < obstacles.length; i++) {

        //handle player collision
        if ((player.x + (canv.height * PLAYER_SIZE) / 2) > obstacles[i].x && player.x < (obstacles[i].x + obstacles[i].w)) {
          if (player.y + (canv.height * PLAYER_SIZE) <= obstacles[i].y) {
            if (groundLevel > obstacles[i].y) {
              groundLevel = obstacles[i].y;
            }
          } else {
            if (groundLevel >= obstacles[i].y) {
              groundLevel = canv.height;
            }
          }
        } else {
          if (groundLevel >= obstacles[i].y) {
            groundLevel = canv.height;
          }
        }

        //test for keyed
        if (obstacles[i].key) {
          if (groundLevel === obstacles[i].y && !keyed) {
            ctx.fillStyle = 'gold';
            keyed = true;
          } else if (!keyed && groundLevel !== obstacles[i].y) {
            ctx.fillStyle = 'white';
            keyed = false;
          } else if (keyed) {
            ctx.fillStyle = 'gold';
          }
        } else if (!keyed) {
          keyed = false;
          ctx.fillStyle = 'white';
        } else {
          ctx.fillStyle = 'white';
        }

        //draw
        ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].w, obstacles[i].w);

      }

      break;
  }

  //draw level number
  ctx.fillStyle = 'white';
  ctx.font = '24px Thasadith';
  ctx.fillText(String(levelNum + 1), 20, 34, 100);

  //draw player
  ctx.fillStyle = 'maroon';
  ctx.fillRect(player.x, player.y, (canv.height * PLAYER_SIZE) / 2, (canv.height * PLAYER_SIZE));

  // DEBUG:
  console.log(groundLevel);

}
