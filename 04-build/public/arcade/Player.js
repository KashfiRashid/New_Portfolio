class Player extends Character {
  constructor(pos, v, hp, w, h) {
    super(pos, v, hp, w, h);
    this.w = w;
    this.h = h;
    this.hp = hp;
    this.maxHp = hp;
    this.isAlive = true;
    this.projectiles = [];
    this.angle = 0;
    this.deathText = null;
    this.fireCooldown = 0;
    this.damageCoolDown = 0; // invulnerability frames after a hit
    this.bulletDamage = 1;   // up to 3, raised by rare power-ups
    this.bulletCount = 1;    // up to 3 shots fired at once
  }

  // the ship turns to face the way it is actually moving (no mouse aim)
  faceHeading() {
    if (this.v.mag() > 0.35) {
      let target = atan2(this.v.y, this.v.x) + HALF_PI;
      let diff = atan2(sin(target - this.angle), cos(target - this.angle));
      this.angle += diff * 0.25;
    }
  }

  update() {
    super.update();      // pos += v, v *= damp, clamp to screen
    this.v.mult(this.damp); // second damp = the heavy glide / inertia
    this.faceHeading();
    if (this.damageCoolDown > 0) this.damageCoolDown--;

    // bullets
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      let b = this.projectiles[i];
      b.update();
      b.drawMe();
      for (let j = 0; j < enemies.length; j++) {
        if (b.isAlive && b.hit(enemies[j])) {
          enemies[j].decreaseHealth(b.dmg);
          b.isAlive = false;
        }
      }
      if (!b.isAlive) this.projectiles.splice(i, 1);
    }

    this.drawHealthBar();
  }

  // keep the ship on screen instead of wrapping (more intuitive)
  checkWalls() {
    this.pos.x = constrain(this.pos.x, this.w / 2, width - this.w / 2);
    this.pos.y = constrain(this.pos.y, this.h / 2, height - this.h / 2);
  }

  drawCharacter() {
    let s = this.v.mag(); // current speed drives the thruster size
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);

    // twin engine flames behind the hull, reacting to thrust
    let flame = this.h * (0.3 + 0.55 * constrain(s / 6, 0, 1)) * random(0.85, 1.15);
    noStroke();
    for (let sx of [-this.w * 0.2, this.w * 0.2]) {
      fill(255, 140, 45, 200);
      triangle(sx - 5, this.h * 0.42, sx + 5, this.h * 0.42, sx, this.h * 0.42 + flame);
      fill(255, 232, 150, 230);
      triangle(sx - 2.4, this.h * 0.42, sx + 2.4, this.h * 0.42, sx, this.h * 0.42 + flame * 0.55);
    }

    // main hull, with a soft rim light
    stroke(180, 210, 240, 130);
    strokeWeight(1.2);
    fill(118, 138, 165);
    beginShape();
    vertex(0, -this.h * 0.58); // nose
    vertex(this.w * 0.16, -this.h * 0.1);
    vertex(this.w * 0.5, this.h * 0.4); // right wing tip
    vertex(this.w * 0.16, this.h * 0.3);
    vertex(0, this.h * 0.45); // tail notch
    vertex(-this.w * 0.16, this.h * 0.3);
    vertex(-this.w * 0.5, this.h * 0.4); // left wing tip
    vertex(-this.w * 0.16, -this.h * 0.1);
    endShape(CLOSE);

    // central spine highlight
    noStroke();
    fill(165, 184, 208);
    beginShape();
    vertex(0, -this.h * 0.52);
    vertex(this.w * 0.1, this.h * 0.08);
    vertex(0, this.h * 0.38);
    vertex(-this.w * 0.1, this.h * 0.08);
    endShape(CLOSE);

    // engine nacelles (the pink accent, kept from the original)
    fill(200, 30, 110);
    ellipse(-this.w * 0.22, this.h * 0.3, this.w * 0.14, this.h * 0.26);
    ellipse(this.w * 0.22, this.h * 0.3, this.w * 0.14, this.h * 0.26);

    // cockpit canopy + glint
    fill(90, 210, 255, 235);
    ellipse(0, -this.h * 0.12, this.w * 0.17, this.h * 0.32);
    fill(225, 250, 255, 210);
    ellipse(-this.w * 0.03, -this.h * 0.18, this.w * 0.05, this.h * 0.1);
    pop();

    // shield shimmer while invulnerable (cleaner than blinking out)
    if (this.damageCoolDown > 0) {
      push();
      translate(this.pos.x, this.pos.y);
      noFill();
      stroke(90, 200, 255, 110 + 80 * sin(frameCount * 0.5));
      strokeWeight(2);
      ellipse(0, 0, this.w * 1.7, this.h * 1.7);
      pop();
    }
  }

  accelerate(a) {
    this.v.add(a);
  }

  tryFire() {
    if (!this.isAlive) return;
    if (this.fireCooldown <= 0) {
      this.fire();
      this.fireCooldown = FIRE_RATE;
    }
  }

  tickCooldown() {
    if (this.fireCooldown > 0) this.fireCooldown--;
  }

  fire() {
    let n = this.bulletCount;
    let spread = radians(9);
    for (let i = 0; i < n; i++) {
      let off = n === 1 ? 0 : map(i, 0, n - 1, -spread, spread); // small fan for multishot
      let vel = createVector(0, -16).rotate(this.angle + off);
      let p = new Projectile(createVector(this.pos.x, this.pos.y), vel, this.angle + off, false);
      p.dmg = this.bulletDamage;
      this.projectiles.push(p);
    }
  }

  decreaseHealth(n) {
    if (this.damageCoolDown > 0) return; // invulnerable right now
    this.hp -= n;
    this.damageCoolDown = 45;
    spawnExplosion(this.pos.x, this.pos.y, 54, color(255, 90, 90));
    spawnPopup(this.pos.x, this.pos.y - 30, "-" + n, color(255, 90, 90), 34);
    if (this.hp <= 0) {
      this.hp = 0;
      this.isAlive = false;
    }
  }

  drawHealthBar() {
    push();
    noStroke();
    rectMode(CORNER);
    textAlign(LEFT, TOP);
    fill(255, 255, 255, 45);
    rect(14, 14, 100, 14, 3);
    let pct = max(0, this.hp) / this.maxHp;
    fill(lerpColor(color(230, 60, 60), color(90, 220, 120), pct));
    rect(14, 14, 100 * pct, 14, 3);
    fill(220);
    textSize(11);
    text("HP", 14, 32);
    // upgrade indicators
    fill(255, 175, 70);
    text("DMG x" + this.bulletDamage, 124, 14);
    fill(120, 210, 255);
    text("GUNS x" + this.bulletCount, 124, 28);
    pop();
  }
}
// end Player.js
