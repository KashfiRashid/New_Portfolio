class BossEnemy extends Character {
  constructor(pos, v, h, w, hp, n, r) {
    super(pos, v, h, w, hp);
    this.bodyChunks = n;
    this.segment = [];
    this.projectiles = [];
    this.stage = 1;
    this.eHP = hp;
    this.maxHP = hp;
    this.isAlive = true;
    this.patrolY = pos.y;
    this.spawnTime = 0;
    this.leaving = false;
    this.roundTint = 1;
    this.fireCooldown = 70;
    this.fireRate = 72;
    this.speed = max(abs(v.x), 3); // horizontal chase cap
    this.descend = 2;              // downward dive speed

    for (let i = 0; i < this.bodyChunks; i++) {
      this.segment.push(createVector(this.pos.x - this.w * i, this.pos.y));
    }
  }

  update() {
    this.patrol();
    this.fire();
    this.updateStates();

    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      this.projectiles[i].update();
      this.projectiles[i].drawMe();
      if (!this.projectiles[i].isAlive) this.projectiles.splice(i, 1);
    }
  }

  // sweep back and forth near the top, bobbing, with a trailing body
  patrol() {
    if (!this.leaving) {
      // caterpillar dive: ease toward the player's x while steadily descending,
      // then wrap back to the top for another pass
      let dx = player.pos.x - this.pos.x;
      this.pos.x += constrain(dx * 0.08, -this.speed, this.speed);
      this.pos.x = constrain(this.pos.x, this.w, width - this.w);
      this.pos.y += this.descend;
      if (this.pos.y - this.h > height) this.pos.y = -this.h * 3;
    }
    this.segment[0] = createVector(this.pos.x, this.pos.y);
    for (let i = 1; i < this.bodyChunks; i++) {
      let d = p5.Vector.sub(this.segment[i - 1], this.segment[i]);
      d.setMag(this.w);
      this.segment[i] = p5.Vector.sub(this.segment[i - 1], d);
    }
  }

  bossColors() {
    let palette = [
      [70, 120, 86, 150, 200, 100],
      [150, 70, 70, 210, 120, 110],
      [110, 80, 165, 170, 130, 220],
      [70, 110, 170, 120, 180, 230],
    ];
    return palette[this.roundTint % palette.length];
  }

  drawHead(x, y, w, h, head, dark, lite) {
    push();
    translate(x, y);
    let enraged = this.stage >= 2;
    // head glow
    noStroke();
    fill(red(head), green(head), blue(head), 40);
    ellipse(0, 0, w * 1.9, h * 1.9);
    // horns
    fill(dark);
    triangle(-w * 0.42, -h * 0.3, -w * 0.16, -h * 0.08, -w * 0.04, -h * 0.55);
    triangle(w * 0.42, -h * 0.3, w * 0.16, -h * 0.08, w * 0.04, -h * 0.55);
    // skull
    fill(dark); ellipse(0, 0, w * 1.14, h * 1.14);
    fill(head); ellipse(0, 0, w, h);
    // brow ridge
    fill(red(head) * 0.65, green(head) * 0.65, blue(head) * 0.65);
    arc(0, -h * 0.04, w * 0.96, h * 0.82, PI, TWO_PI);
    // eyes track the player
    let ea = atan2(player.pos.y - this.pos.y, player.pos.x - this.pos.x);
    let ex = cos(ea), ey = sin(ea);
    let es = w / 3;
    for (let sgn = -1; sgn <= 1; sgn += 2) {
      let bx = sgn * w * 0.26;
      if (enraged) fill(255, 80, 70, 150); else fill(255, 225, 120, 130);
      ellipse(bx, h * 0.08, es * 1.35, es * 1.35);
      fill(255, 240, 205);
      ellipse(bx, h * 0.08, es, es);
      fill(10);
      ellipse(bx + ex * es * 0.22, h * 0.08 + ey * es * 0.22, es * 0.45, es * 0.55);
    }
    // fangs
    fill(lite);
    triangle(-w * 0.18, h * 0.42, -w * 0.05, h * 0.42, -w * 0.12, h * 0.7);
    triangle(w * 0.18, h * 0.42, w * 0.05, h * 0.42, w * 0.12, h * 0.7);
    pop();
  }

  drawCharacter() {
    let c = this.bossColors();
    let head = color(c[0], c[1], c[2]);
    let body = color(c[3], c[4], c[5]);
    let dark = color(c[3] * 0.4, c[4] * 0.4, c[5] * 0.4);
    let lite = color(min(255, c[3] + 80), min(255, c[4] + 80), min(255, c[5] + 80));

    // projectiles sit under the body
    for (let i = 0; i < this.projectiles.length; i++) this.projectiles[i].drawMe();

    push();
    noStroke();
    // draw tail -> head so the head sits on top, body tapers toward the tail
    for (let i = this.bodyChunks - 1; i >= 0; i--) {
      let x = this.segment[i].x;
      let y = this.segment[i].y - (i * this.h) / 12;
      let taper = map(i, 0, this.bodyChunks - 1, 1.0, 0.5);
      let w = this.w * taper, h = this.h * taper;

      // soft aura
      fill(red(body), green(body), blue(body), 26);
      ellipse(x, y, w * 1.6, h * 1.6);

      if (i > 0) {
        // back spike on alternating segments
        if (i % 2 === 1) {
          fill(lite);
          triangle(x, y - h * 0.85, x - w * 0.18, y - h * 0.18, x + w * 0.18, y - h * 0.18);
        }
        fill(dark); ellipse(x, y, w, h);                                  // scale ring
        fill(body); ellipse(x, y, w * 0.82, h * 0.82);                    // body
        fill(red(lite), green(lite), blue(lite), 180);                    // gloss
        ellipse(x - w * 0.16, y - h * 0.18, w * 0.34, h * 0.28);
      } else {
        this.drawHead(x, y, w, h, head, dark, lite);
      }
    }
    pop();

    // health bar above the head
    push();
    noStroke();
    rectMode(CENTER);
    fill(255, 255, 255, 50);
    rect(this.pos.x, this.pos.y - this.h, this.maxHP, 6, 2);
    fill(255, 70, 70);
    rect(this.pos.x - (this.maxHP - max(0, this.eHP)) / 2, this.pos.y - this.h, max(0, this.eHP), 6, 2);
    pop();
  }

  fire() {
    if (this.leaving) return;
    this.fireCooldown--;
    if (this.fireCooldown <= 0) {
      let angle = atan2(player.pos.y - this.pos.y, player.pos.x - this.pos.x);
      let dir = createVector(player.pos.x - this.pos.x, player.pos.y - this.pos.y).normalize();
      let vel = dir.mult(9);
      this.projectiles.push(new Projectile(createVector(this.pos.x, this.pos.y), vel, angle, true));
      this.fireCooldown = this.stage == 2 ? floor(this.fireRate * 0.55) : this.fireRate;
    }
  }

  intersects(p) {
    for (let i = 0; i < this.bodyChunks; i++) {
      let sx = this.segment[i].x;
      let sy = this.segment[i].y - (i * this.w) / 12;
      let d = dist(p.pos.x, p.pos.y, sx, sy);
      if (d < (p.w || 6) / 2 + this.w / 2) return true;
    }
    return false;
  }

  handleCollision(p) {
    let angle = atan2(this.pos.y - p.pos.y, this.pos.x - p.pos.x);
    let speed = max(p.v.mag(), 4);
    p.v.set(speed * cos(angle + PI), speed * sin(angle + PI));
    p.decreaseHealth(bossBodyDmg());
    if (!p.isAlive) {
      let deathMessage = [
        "You became a space snack!",
        "SHhhh-Liii-Thheeer!",
        "MMmm... YUMMY Metals!",
        "Space Slither: 1 - You: 0",
        "You were too slow!",
      ];
      p.deathText = random(deathMessage);
    }
  }

  decreaseHealth(n) {
    this.eHP -= n;
    if (this.eHP <= 0) this.isAlive = false;
  }

  updateStates() {
    if (this.eHP <= this.maxHP / 2) this.stage = 2; // enrage: faster fire
  }
}
