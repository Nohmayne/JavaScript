class Obstacle {
	constructor(h, scl, lane) {
		this.h = h;
		this.scl = scl;
		this.lane = lane;

		this.x = this.lane.x;
		this.y = -this.scl;
		this.w = this.lane.w;

		this.vel = int(this.scl / 2);

		this.dead = false;
	}

	show() {
		fill('#FFF');
		stroke(0);
		strokeWeight(3);
		ellipseMode(CORNER);
		ellipse(this.x, this.y, this.w);
	}

	update() {
		this.y += this.vel;

		if (this.y - this.w > this.lane.h) {
			this.dead = true;
		}
	}
}