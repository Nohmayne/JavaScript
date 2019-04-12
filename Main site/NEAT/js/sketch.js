var lanes = []
var w, h;
var scl;
var p;

function setup() {
    w = 800;
    h = 600

    scl = 20;

    for (i = 0; i < 3; i++) {
        lanes.push(new Lane(w, h, scl, i));
    }
    p = new Player(h, scl, lanes)

    createCanvas(w, h);
    background(255);
}

function draw() {
    for (i = 0; i < lanes.length; i++) {
        lanes[i].show();
    }
    
    p.show()
    p.update()
}

function keyPressed() {
    switch(keyCode) {
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