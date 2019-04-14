class Lane {
	constructor(w, h, scl, num) {
		this.scl = scl;
		this.h = h;
		this.w = w / this.scl;
		this.x = w / 2 - this.w / 2;
		this.y = 0;
		this.c = '#00F';

		this.num = num;
		if (this.num == 0) {
			this.x -= this.w;
			this.c = '#F00';
		} else if (this.num == 2) {
			this.x += this.w;
			this.c = '#0F0';
		} else if (this.num != 1) {
			console.error("Invalid 'num' in Lane constructor");
		}

		this.obs = [];
	}

	show() {
		fill(this.c);
		noStroke();
		rect(this.x, this.y, this.w, this.h);
		for (var i = 0; i < this.obs.length; i++) {
			this.obs[i].update();
			this.obs[i].show();
		}
	}

	addOb() {
		this.obs.push(new Obstacle(this.h, this.scl, this));
	}
}
