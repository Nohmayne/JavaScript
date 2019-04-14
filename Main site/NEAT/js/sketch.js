var lanes = [];
var w, h;
var scl;
var p;
var obTimer, delay;

function setup() {
	w = 800;
	h = 600;

	scl = 20;
	obTimer = Date.now();
	delay = 0.5;
	console.log(obTimer);

	for (var i = 0; i < 3; i++) {
		lanes.push(new Lane(w, h, scl, i));
	}
	p = new Player(h, scl, lanes);

	createCanvas(w, h);
	background(255);
}

function draw() {
	if (p.alive) {
		for (var i = 0; i < lanes.length; i++) {
			lanes[i].show();
		}

		p.show();
		p.update();

		now = Date.now();
		if ((now - obTimer) / 1000 > delay) {
			lanes[floor(random(0, 3))].addOb();
			obTimer = Date.now();
		}
	} else {
		textSize(scl);
		textAlign(CENTER, CENTER);
		text('GAME OVER', w / 2, h / 2);
	}
}

function keyPressed() {
	switch (keyCode) {
		case LEFT_ARROW:
			p.moveLeft();
			break;
		case RIGHT_ARROW:
			p.moveRight();
			break;
		default:
			break;
	}
}