class Obstacle {
    constructor(h, scl, lane) {
        this.h = h;
        this.scl = scl;
        this.lane = lane;

        this.x = this.lane.x;
        this.y = -this.scl;
        this.w = this.lane.w;

        this.vel = int(this.scl / 10);
    }

    show() {
        fill('#FFF');
        noStroke();
        ellipseMode(CORNER);
        ellipse(this.x, this.y, this.w);
    }
}