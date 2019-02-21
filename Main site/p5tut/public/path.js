class Path {
  constructor() {
    this.points = [];
  }

  aPoint(x, y, size) {
    this.points.push({
      x: x,
      y: y,
      size: size,
      draw: function (nx, ny) {
        fill(0);
        strokeWeight(pSize);
        line(this.x, this.y, nx, ny);
      },
    });
  }

  show() {
    for (var i = 0; i < this.points.length - 1; i++) {
      this.points[i].draw(this.points[i + 1].x, this.points[i + 1].y);
    }
  }
}
