class Enemy extends Character{
  constructor(pos, v, hp, w, h){
    super(pos,v,hp,w,h)
    this.hp = hp;
    this.maxHp = hp;
    this.w = w;
    this.h = h;
    this.n = int(random(9, 13));
    this.isAlive = true;
    // computed once so the rock keeps a stable shape while it tumbles
    this.rot = random(TWO_PI);
    this.spin = random(-0.012, 0.012);
    this.shape = [];
    for (let i = 0; i < this.n; i++) this.shape.push(random(0.74, 1.0));
    this.craters = [];
    let nc = int(random(2, 4));
    for (let i = 0; i < nc; i++) this.craters.push({ a: random(TWO_PI), d: random(0.12, 0.5), s: random(0.1, 0.22) });
    this.grey = random() < 0.45; // grey rock vs rusty brown rock
  }
  
  rockShape(rx, ry) {
    let ang = TWO_PI / this.n;
    beginShape();
    for (let i = 0; i < this.n; i++) {
      let m = this.shape[i];
      vertex(cos(i * ang) * rx * m, sin(i * ang) * ry * m);
    }
    endShape(CLOSE);
  }

  drawCharacter() {
    let rx = this.w / 2, ry = this.h / 2;
    let dark, mid, lite;
    if (this.grey) { dark = color(64, 66, 74); mid = color(108, 110, 120); lite = color(158, 160, 172); }
    else { dark = color(86, 54, 32); mid = color(150, 92, 46); lite = color(200, 138, 78); }

    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.rot);
    noStroke();

    // main rock body
    fill(mid);
    this.rockShape(rx, ry);
    // lit side, nudged toward the top-left
    fill(lite);
    push(); translate(-rx * 0.16, -ry * 0.16); this.rockShape(rx * 0.8, ry * 0.8); pop();
    // shaded core
    fill(dark);
    push(); translate(rx * 0.2, ry * 0.22); this.rockShape(rx * 0.46, ry * 0.46); pop();
    // craters
    for (let c of this.craters) {
      let cx = cos(c.a) * c.d * rx, cy = sin(c.a) * c.d * ry;
      fill(dark); ellipse(cx, cy, c.s * this.w, c.s * this.h);
      fill(lite); ellipse(cx - c.s * rx * 0.35, cy - c.s * ry * 0.35, c.s * this.w * 0.5, c.s * this.h * 0.5);
    }
    // rim light
    noFill(); stroke(red(lite), green(lite), blue(lite), 140); strokeWeight(1.5);
    this.rockShape(rx, ry);
    pop();

    // slim health bar, only once the rock has been chipped
    if (this.hp < this.maxHp) {
      push();
      translate(this.pos.x, this.pos.y);
      noStroke();
      rectMode(CENTER);
      fill(255, 255, 255, 45);
      rect(0, ry + 12, this.w * 0.7, 5, 2);
      fill(255, 90, 90);
      rect(0, ry + 12, this.w * 0.7 * (this.hp / this.maxHp), 5, 2);
      pop();
    }
  }
  
  update(){
    this.moveMe();
    this.checkWalls();
  }
  
  moveMe(){
    this.pos.add(this.v);
    this.rot += this.spin;
  }
  
   checkWalls(){
    // Left
    if(this.pos.x + this.w/2 < 0){
      this.pos.x = width + this.w/2;
      this.pos.y = random(this.h/2, height - this.h/2);
      this.v.x = random(-8,8);
      this.v.y = random(-8,8);
    }
    // Right
    if(this.pos.x - this.w/2 > width){
      this.pos.x = - this.w/2;
      this.pos.y = random(this.h/2, height - this.h/2);
      this.v.x = random(-8,8);
      this.v.y = random(-8,8);
    }
    // Top
    if(this.pos.y + this.h/2 < 0){
      this.pos.y = height + this.h/2;
      this.pos.x = random(-this.w/2, width - this.w/2);
      this.v.y = random(-8,8);
      this.v.x = random(-8,8);
    }
    // Bottom
    if(this.pos.y - this.h/2 > height){
      this.pos.y = - this.h/2;
      this.pos.x = random(-this.w/2, width - this.w/2);
      this.v.y = random(-8,8);
      this.v.x = random(-8,8);
    }
  }
  
  kill(i) {
    enemies.splice(i, 1);
    score += 1;
  }
  
    handleCollision(other, isPlayer) {
    if( // For other meteors
      abs(this.pos.x - other.pos.x) < (this.w + other.w) /2 &&
      abs(this.pos.y - other.pos.y) < (this.h + other.h) /2
      )
    {
      let angle = atan2(this.pos.y - other.pos.y, this.pos.x - other.pos.x);
      let avgSpeed = (this.v.mag() + other.v.mag()) /2;

      this.v.set(avgSpeed * cos(angle), avgSpeed * sin(angle));
      other.v.set(avgSpeed * cos(angle - PI), avgSpeed * sin(angle - PI));

      if (isPlayer) {
        other.decreaseHealth(meteorDmg());
        if(!other.isAlive){
          let deathText = [
            "You crashed into a meteor!",
            "Dust is all that remains of you!",
            "You got vapourized in to the void!",
            "Mayday! Mayday! Mayd...",
            "Ka-boom!"
            ];
          other.deathText = random(deathText);
          console.log("You crashed into a meteor!");
        }
      }
    }
  }
  
   decreaseHealth(n) {
    this.hp -= n;
    this.h *= 0.8;
    this.w *= 0.8;
    if (this.hp <= 0) {
      this.isAlive = false;
      console.log("Meteor Destroyed!")
    }
  }
}

//     rotateAndDie() {
//       if (!this.isRotating) {
//         this.isRotating = true;
//         this.rotationStartTime = millis();
//         setTimeout(() => {
//           this.isRotating = false;
//           this.killed(character);
//         }, this.rotationDuration);
//       }
//     }
// }