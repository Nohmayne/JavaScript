class Player {
    constructor(h, scl, lanes) {
        this.h = h;
        this.scl = scl;
        this.lanes = lanes;
        this.num = 1;

        this.x = this.lanes[this.num].x;
        this.y = this.h - this.scl * 3;
        this.w = this.lanes[0].w;
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
        this.x = this.lanes[this.num].x
    }
}