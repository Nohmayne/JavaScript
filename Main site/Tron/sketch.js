let p1, p2;
let w, h;
let state;

function setup() {
	w = 800;
	h = 600;

	state = 0;

	createCanvas(w, h);
	background(0);

	p1 = new Player(w / 3 * 2, h / 2, 2, w, h, '#3B3');
	p2 = new Player(w / 3, h / 2, 2, w, h, '#33B');
}

function draw() {
	if (state == 0) {
		textAlign(CENTER, CENTER);
		fill(255);
		textSize(143);
		text('Tron', w / 2, h / 2);
		textSize(54);
		text('press any key to start', w / 2, h / 2 + 143);
	} else if (state == 1) {
		p1.update(p2);
		p1.show();
		p2.update(p1);
		p2.show();

		if (p1.alive && !p2.alive && !over) {
			alert('Green wins!');
			over = true;
		} else if (p2.alive && !p1.alive && !over) {
			alert('Blue wins!');
			over = true;
		}
	}
}

function keyPressed() {
	if (state == 0) {
		background(0);
		state = 1;
	} else if (state == 1) {
		switch (keyCode) {
			case UP_ARROW:
				p1.dir = 0;
				break;
			case RIGHT_ARROW:
				p1.dir = 1;
				break;
			case DOWN_ARROW:
				p1.dir = 2;
				break;
			case LEFT_ARROW:
				p1.dir = 3;
				break;
			default:
				break;
		}
		switch (key) {
			case 'w':
				p2.dir = 0;
				break;
			case 'd':
				p2.dir = 1;
				break;
			case 's':
				p2.dir = 2;
				break;
			case 'a':
				p2.dir = 3;
				break;
			default:
				break;
		}
	}
}
