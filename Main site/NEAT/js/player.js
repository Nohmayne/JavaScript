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
		stroke(0);
		strokeWeight(2);
		ellipseMode(CORNER);
		ellipse(this.x, this.y, this.w);
	}

	update() {
		this.x = this.lanes[this.num].x;

		for (var i = 0; i < this.lanes.length; i++) {
			var curlane = this.lanes[i];

			for (var j = 0; j < curlane.obs.length; j++) {
				var curob = curlane.obs[j];

				if (curob.lane.num == this.num) {
					if (curob.y - curob.w / 2 < this.y + this.w / 2 && curob.y + curob.w / 2 > this.y - this.w / 2) {
						this.alive = false;
					}
				}
			}
		}
	}
}
