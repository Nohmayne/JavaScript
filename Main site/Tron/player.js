class Player {
	constructor(x, y, w, sw, sh, color) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.sw = sw;
		this.sh = sh;
		this.c = color;
		this.dir = 0;
		this.speed = this.w + 1;
		this.trail = [];
		this.alive = true;
	}

	show() {
		strokeWeight(this.w);
		if (this.alive) {
			stroke(this.c);
		} else {
			stroke('#FF0000');
		}
		point(this.x, this.y);
		for (var i = 0; i < this.trail.length - 1; i++) {
			line(this.trail[i].x, this.trail[i].y, this.trail[i + 1].x, this.trail[i + 1].y);
		}
	}

	update(other) {
		if (this.alive) {
			this.trail.push({
				x: this.x,
				y: this.y
			});
			switch (this.dir) {
				case 0:
					this.y -= this.speed;
					break;
				case 1:
					this.x += this.speed;
					break;
				case 2:
					this.y += this.speed;
					break;
				case 3:
					this.x -= this.speed;
					break;
				default:
					break;
			}
			for (let i = 0; i < this.trail.length; i++) {
				let point = this.trail[i];
				if (this.x <= point.x + this.w && this.x >= point.x - this.w) {
					if (this.y <= point.y + this.w && this.y >= point.y - this.w) {
						this.alive = false;
					}
				}
			}
			for (let i = 0; i < other.trail.length; i++) {
				let point = other.trail[i];
				if (this.x <= point.x + this.w && this.x >= point.x - this.w) {
					if (this.y <= point.y + this.w && this.y >= point.y - this.w) {
						this.alive = false;
					}
				}
			}
			if (this.x < 0 || this.x > this.sw || this.y < 0 || this.y > this.sh) {
				this.alive = false;
			}
		}
	}
}
