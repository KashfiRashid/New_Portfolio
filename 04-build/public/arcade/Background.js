class Stars {
  constructor(pos) {
    this.pos = pos;
    this.depth = random(0.2, 1);           // far (0) -> near (1): drives size, speed, brightness
    this.n = int(random(4, 8));            // number of rays
    this.baseLength = 2 + this.depth * 8;  // nearer stars are larger
    this.rectSize = max(1, this.baseLength * 0.4);
    this.speed = 0.2 + this.depth * 1.0;   // parallax drift speed
    this.tw = random(TWO_PI);              // twinkle phase
    this.tspeed = random(0.02, 0.06);
    this.col = this.pickColor();           // chosen once, not recomputed every frame
  }

  pickColor() {
    let palette = [
      [255, 244, 234], // white
      [155, 176, 255], // blue
      [255, 210, 161], // warm
      [73, 214, 255],  // cyan
      [255, 223, 120], // gold
    ];
    let p = palette[int(random(palette.length))];
    return color(p[0], p[1], p[2]);
  }

  update() {
    // steady downward drift = the ship flying forward; wrap back to the top
    this.pos.y += this.speed;
    if (this.pos.y > height + 12) {
      this.pos.y = -12;
      this.pos.x = random(width);
    }
    this.tw += this.tspeed;
  }

  drawMe() {
    let tw = 0.6 + 0.4 * sin(this.tw);     // twinkle factor 0.2..1
    let len = this.baseLength * tw;
    let a = 90 + 165 * this.depth * tw;    // depth + twinkle -> brightness
    push();
    translate(this.pos.x, this.pos.y);
    stroke(red(this.col), green(this.col), blue(this.col), a);
    strokeWeight(0.4 + this.depth * 1.1);
    fill(red(this.col), green(this.col), blue(this.col), a);
    push();
    rotate(QUARTER_PI);
    rectMode(CENTER);
    rect(0, 0, this.rectSize * tw, this.rectSize * tw);
    pop();
    let ang = TWO_PI / this.n;
    for (let i = 0; i < this.n; i++) {
      rotate(ang);
      line(-len, 0, len, 0);
    }
    pop();
  }
}
// end Background.js
