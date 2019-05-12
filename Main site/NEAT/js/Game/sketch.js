var lanes = [];
var players = [];
var w, h;
var scl;
var p;
var obTimer, delay;
var controller;
var allDead;

function preload() {
	controller = new Controller(1, 0.3);
	controller.init(5, 2);
}

function setup() {
	w = 800;
	h = 600;

	scl = 20;
	obTimer = Date.now();
	delay = 0.5;

	for (var i = 0; i < 3; i++) {
		lanes.push(new Lane(w, h, scl, i));
	}

	for (var j = 0; j < controller.num; j++) {
		players.push(new Player(h, scl, lanes));
	}

	allDead = false;

	createCanvas(w, h);
	background(128);
}

function draw() {
	if (!allDead) {
		// Detect if alive
		allDead = true;
		for (var j = 0; j < lanes.length; j++) {
			lanes[j].show();
		}
		for (var i = 0; i < players.length; i++) {
			if (players[i].alive) {
				allDead = false;

				players[i].update();
				players[i].show();

				var inputs = [];
				inputs.push(players[i].num);
				if (lanes[0].obs[0]) {
					inputs.push(lanes[0].obs[0].x);
				} else {
					inputs.push(h);
				}
				if (lanes[1].obs[0]) {
					inputs.push(lanes[1].obs[0].x);
				} else {
					inputs.push(h);
				}
				if (lanes[2].obs[0]) {
					inputs.push(lanes[2].obs[0].x);
				} else {
					inputs.push(h);
				}
				inputs.push(controller.population.individuals[i].genome.bias);

				controller.population.individuals[i].genome.forward(inputs);
			}
		}
		now = Date.now();
		if ((now - obTimer) / 1000 > delay) {
			lanes[floor(random(0, 3))].addOb();
			obTimer = Date.now();
		}
	} else {
		fill(255);
		stroke(0);
		textSize(scl * 2);
		textAlign(CENTER, CENTER);
		text('GAME OVER', w / 2, h / 2);
	}
}

// function keyPressed() {
// 	switch (keyCode) {
// 		case LEFT_ARROW:
// 			for (var i = 0; i < players.length; i++) {
// 				players[i].moveLeft();
// 			}
// 			break;
// 		case RIGHT_ARROW:
// 			for (var i = 0; i < players.length; i++) {
// 				players[i].moveRight();
// 			}
// 			break;
// 		default:
// 			break;
// 	}
// }
