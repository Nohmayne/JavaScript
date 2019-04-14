class Player {
	constructor(h, scl, lanes) {
		this.h = h;
		this.scl = scl;
		this.lanes = lanes;
		this.num = 1;

		this.x = this.lanes[this.num].x;
		this.y = this.h - this.scl * 3;
		this.w = this.lanes[0].w;

		this.alive = true;
	}

	moveLeft() {
		if (this.num > 0) {
			this.num--;
		}
	}

	moveRight() {
		if (this.num < 2) {
			this.num++;
		}
	}

	show() {
		fill('#FFF');
		noStroke();
		ellipseMode(CORNER);
		ellipse(this.x, this.y, this.w);
	}

	update() {
		this.x = this.lanes[this.num].x;

		for (var i = 0; i < this.lanes.length; i++) {
			if (this.lanes[i].num == this.num) {
				var curLane = this.lanes[i];
				console.log(curLane);
				for (var j = 0; j < curLane.obs.length; j++) {
					if (
						curLane.obs[j].y + curLane.obs[j].w / 2 > this.y + this.w / 2 &&
						curLane.obs[j].y - curLane.obs[j].w / 2 < this.y - this.w / 2
					) {
						this.alive = false;
						console.log('dead');
					}
				}
			}
		}
	}
}
