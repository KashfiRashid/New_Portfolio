// Clicker Forge arcade - "The Last Stand" endless space shooter.
// Reworked from a beat-the-boss game into an endless survival run:
// meteors spawn forever and ramp up, a boss sweeps in every round (tougher
// each time), and you survive until your HP hits zero. Score climbs the
// whole way. Controls: WASD / Arrows move, mouse aims, click or Space shoots.

let player;
let acc = 5;                 // movement acceleration (glide / inertia)
let enemies = [];            // meteors only
let boss = null;             // current boss, or null between rounds
let explosions = [];         // hit / kill bursts
let popups = [];             // floating damage numbers
let pickups = [];            // floating HP pickups
let level = 1;
let pickupTimer = 600;
let powerTimer = 1600;       // rare weapon power-ups
let flickerLine = "";
let fsBtn = null;            // fullscreen chip hit-box on the intro
let deathParts = [];         // ship debris during the death animation
let deathTimer = 70;
let deathStarted = false;
let endStarted = false;      // end scene begins after the death animation

let time = 0;                // frames since the run started
let score = 0;
let highScore = 0;
let gameEnds = false;
let l = 100;                 // game-over reveal counter
let gameState = -1;          // -1 start screen, 0 playing
let scoreReported = false;

let round = 0;               // bosses seen so far
let nextBossFrame = 1100;    // time (frames) the next boss arrives
let meteorTimer = 0;
let survivalTick = 0;

let backgroundStars = [];
let sNum = 90;

let sScreen, wScreen;

const BOSS_DURATION = 1320;  // ~22s on screen before it retreats
const BOSS_GAP = 720;        // ~12s between bosses
const FIRE_RATE = 9;         // frames between player shots
const MOVE_SPEED = 6;        // direct player speed
const LEVEL_TIME = 1080;     // ~18s per level
// contact / hit damage grows with level (capped) so late game stays a threat
const METEOR_DMG_BASE = 8;
const BOSS_BULLET_DMG_BASE = 6;
const BOSS_BODY_DMG_BASE = 16;
function meteorDmg() { return floor(min(METEOR_DMG_BASE + level * 1.3, 22)); }
function bossBulletDmg() { return floor(min(BOSS_BULLET_DMG_BASE + level * 0.8, 16)); }
function bossBodyDmg() { return floor(min(BOSS_BODY_DMG_BASE + level * 1.2, 30)); }
const FLICKER_LINES = [
  "You crashed into a meteor!",
  "Dust is all that remains of you!",
  "You got vapourized in to the void!",
  "Mayday! Mayday! Mayd...",
  "Ka-boom!",
  "You became a space snack!",
  "SHhhh-Liii-Thheeer!",
  "MMmm... YUMMY Metals!",
  "Space Slither: 1 - You: 0",
  "You were too slow!",
];

function setup() {
  createCanvas(800, 800);
  generatePlayer();
  for (let i = 0; i < 4; i++) spawnMeteor();
  nextBossFrame = 1100;
  upAcc = createVector(0, -acc);
  downAcc = createVector(0, acc);
  leftAcc = createVector(-acc, 0);
  rightAcc = createVector(acc, 0);
  try { highScore = Number(localStorage.getItem('arcade.highscore')) || 0; } catch (e) {}
}

function preload() {
  wScreen = loadImage("FILES/Winner.gif");
  sScreen = loadImage("FILES/Intro.png");
}

function draw() {
  background(8);
  time++;
  drawBackground();

  if (gameState == 0) gameOn();

  updateExplosions();
  updatePopups();
  if (gameState == 0) displayScore();

  // death sequence: blow the ship apart first, THEN run the end scene
  if (gameState == 0 && !player.isAlive && !endStarted) {
    if (!deathStarted) killPlayer();
    updateDeathParts();
    let flash = map(deathTimer, 70, 52, 220, 0, true); // white blast flash, then fades
    if (flash > 0) { push(); noStroke(); rectMode(CORNER); fill(255, 255, 255, flash); rect(0, 0, width, height); pop(); }
    deathTimer--;
    if (deathTimer <= 0) endStarted = true;
  }

  if (endStarted) endScene();

  if (gameEnds && l < 0) noLoop();

  if (gameState == -1) drawStartOverlay();
  if (gameEnds && gameState == 0 && endStarted) drawRestartPrompt();

  if (fullscreen()) drawFsHint(); // visible ESC reminder while fullscreen
}

function gameOn() {
  if (!player.isAlive) return; // endScene takes over

  // level progression (start at 1, rises over time)
  let newLevel = 1 + floor(time / LEVEL_TIME);
  if (newLevel > level) {
    level = newLevel;
    spawnPopup(width / 2, height * 0.4, "LEVEL " + level, color(120, 200, 255), 50);
  }

  // thrust with inertia; the ship faces wherever it is gliding
  if (up) player.accelerate(upAcc);
  if (down) player.accelerate(downAcc);
  if (left) player.accelerate(leftAcc);
  if (right) player.accelerate(rightAcc);
  player.update();
  player.drawCharacter();

  // shoot (hold space or mouse)
  if (keyIsDown(32) || mouseIsPressed) player.tryFire();
  player.tickCooldown();

  manageMeteors();
  manageBoss();
  managePickups();

  // survival score
  survivalTick++;
  if (survivalTick >= 45) { survivalTick = 0; score++; }
}

/* ---------------- meteors ---------------- */

function spawnMeteor() {
  let x = random(0, width);
  let y = random(0, height * 0.5);
  let spd = min(1.0 + level * 0.22, 4.5);          // speed soft-capped
  let hp = min(2 + floor(level / 4), 5);           // tougher rocks at higher levels
  enemies.push(new Enemy(
    createVector(x, y),
    createVector(random(-spd, spd), random(-spd, spd)),
    hp, random(30, 70), random(40, 80)
  ));
}

function manageMeteors() {
  let target = min(3 + floor(level / 2), 13);          // how many rocks at once
  meteorTimer--;
  if (enemies.length < target && meteorTimer <= 0) {
    spawnMeteor();
    meteorTimer = floor(max(34 - level * 1.5, 16));    // spawns get denser, floor 16
  }

  for (let i = enemies.length - 1; i >= 0; i--) {
    let e = enemies[i];
    e.update();
    e.drawCharacter();
    e.handleCollision(player, true);
    for (let j = 0; j < i; j++) e.handleCollision(enemies[j], false);
    if (!e.isAlive) {
      spawnExplosion(e.pos.x, e.pos.y, 60, color(235, 120, 40));
      enemies.splice(i, 1);
      score += 1;
    }
  }
}

/* ---------------- boss ---------------- */

function spawnBoss() {
  round++;
  let hp = min(12 + level * 4, 80);
  // caterpillar dives in from the top, chases your x, descends, and wraps around
  boss = new BossEnemy(createVector(width / 2, -40), createVector(0, 0), 60, 60, hp, 6, 0);
  boss.speed = min(2.2 + level * 0.2, 5);     // horizontal chase cap
  boss.descend = min(1.6 + level * 0.18, 4);  // steady downward speed
  boss.fireRate = floor(max(70 - level * 2, 44)); // fires faster at higher levels
  boss.spawnTime = time;
  boss.leaving = false;
  boss.roundTint = round;
}

function endBoss(killed) {
  if (killed && boss) {
    score += 20 + round * 10;
    for (let k = 0; k < 4; k++) {
      spawnExplosion(boss.pos.x + random(-50, 50), boss.pos.y + random(-50, 50), 100, color(255, 130, 60));
    }
  }
  boss = null;
  nextBossFrame = time + BOSS_GAP;
}

function manageBoss() {
  if (!boss) {
    if (time >= nextBossFrame) spawnBoss();
    return;
  }

  boss.update();
  boss.drawCharacter();

  if (!boss.leaving && time - boss.spawnTime > BOSS_DURATION) boss.leaving = true;
  if (boss.leaving) {
    boss.pos.y -= 9;
    if (boss.pos.y < -240) { endBoss(false); return; }
  }

  // player bullets vs boss
  for (let b of player.projectiles) {
    if (b.isAlive && boss.intersects({ pos: b.pos, w: b.size.x })) {
      boss.decreaseHealth(b.dmg);
      b.isAlive = false;
      spawnExplosion(b.pos.x, b.pos.y, 26, color(255, 180, 90));
      spawnPopup(b.pos.x, b.pos.y - 8, "-" + b.dmg, color(255, 215, 130), 18);
    }
  }
  if (!boss.isAlive) { endBoss(true); return; }

  // boss bullets vs player
  for (let b of boss.projectiles) {
    if (b.isAlive && b.hit(player)) {
      player.decreaseHealth(bossBulletDmg());
      b.isAlive = false;
    }
  }

  // boss body vs player
  if (boss.intersects(player)) boss.handleCollision(player);
}

/* ---------------- explosions ---------------- */

function killPlayer() {
  deathStarted = true;
  deathTimer = 70;
  endStarted = false;
  // shards in the ship's own colours fly outward
  let cols = [color(100, 118, 135), color(200, 20, 100), color(120, 50, 240), color(225, 225, 240)];
  for (let i = 0; i < 16; i++) {
    let a = random(TWO_PI), sp = random(2.5, 7.5);
    deathParts.push({
      x: player.pos.x, y: player.pos.y,
      vx: cos(a) * sp, vy: sin(a) * sp,
      ang: random(TWO_PI), spin: random(-0.3, 0.3),
      size: random(7, 17), life: random(45, 70), maxLife: 70,
      col: random(cols),
    });
  }
  // stacked explosion rings + label
  for (let k = 0; k < 5; k++) {
    spawnExplosion(player.pos.x + random(-30, 30), player.pos.y + random(-30, 30), 80 + k * 30, color(255, 180 - k * 20, 90));
  }
  spawnPopup(player.pos.x, player.pos.y - 30, "DESTROYED", color(255, 90, 90), 30);
}

function updateDeathParts() {
  push();
  for (let i = deathParts.length - 1; i >= 0; i--) {
    let p = deathParts[i];
    p.x += p.vx; p.y += p.vy;
    p.vx *= 0.96; p.vy *= 0.96;
    p.ang += p.spin;
    p.life--;
    let a = map(p.life, 0, p.maxLife, 0, 255);
    push();
    translate(p.x, p.y);
    rotate(p.ang);
    noStroke();
    fill(red(p.col), green(p.col), blue(p.col), a);
    triangle(0, -p.size / 2, -p.size / 2, p.size / 2, p.size / 2, p.size / 2);
    pop();
    if (p.life <= 0) deathParts.splice(i, 1);
  }
  pop();
}

function spawnExplosion(x, y, size, col) {
  explosions.push({ x: x, y: y, r: size * 0.25, maxR: size, alpha: 255, col: col });
}

function spawnPopup(x, y, txt, col, size) {
  popups.push({ x: x, y: y, vy: -1.3, text: txt, col: col, life: 48, maxLife: 48, size: size || 26 });
}

function updatePopups() {
  push();
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  for (let i = popups.length - 1; i >= 0; i--) {
    let p = popups[i];
    p.y += p.vy;
    p.vy *= 0.95;
    p.life--;
    let a = map(p.life, 0, p.maxLife, 0, 255);
    let grow = map(p.life, p.maxLife, p.maxLife - 7, 1.5, 1, true);
    textSize(p.size * grow);
    fill(0, a * 0.6);
    text(p.text, p.x + 2, p.y + 2);
    fill(red(p.col), green(p.col), blue(p.col), a);
    text(p.text, p.x, p.y);
    if (p.life <= 0) popups.splice(i, 1);
  }
  pop();
}

function updateExplosions() {
  push();
  noFill();
  for (let i = explosions.length - 1; i >= 0; i--) {
    let e = explosions[i];
    e.r += (e.maxR - e.r) * 0.25;
    e.alpha -= 14;
    stroke(red(e.col), green(e.col), blue(e.col), e.alpha);
    strokeWeight(3);
    ellipse(e.x, e.y, e.r * 2);
    strokeWeight(1);
    stroke(red(e.col), green(e.col), blue(e.col), e.alpha * 0.7);
    ellipse(e.x, e.y, e.r);
    if (e.alpha <= 0) explosions.splice(i, 1);
  }
  pop();
}

/* ---------------- world / hud ---------------- */

function newFloatItem(type, life) {
  return {
    type: type,
    x: random(80, width - 80),
    y: random(80, height - 80),
    vx: random(-0.6, 0.6),
    vy: random(-0.6, 0.6),
    life: life,
  };
}

function spawnHeart() {
  let hearts = pickups.filter((p) => p.type === "heart").length;
  if (hearts >= 2) return; // at most 2 hearts on screen at the same time
  pickups.push(newFloatItem("heart", 900));
}

function spawnPowerup() {
  // only spawn an upgrade that is still below its cap, and only one at a time
  let opts = [];
  if (player.bulletDamage < 3) opts.push("dmg");
  if (player.bulletCount < 3) opts.push("multi");
  if (opts.length === 0) return;
  if (pickups.some((p) => p.type !== "heart")) return; // one rare power-up at a time
  pickups.push(newFloatItem(random(opts), 1500)); // lingers longer than a heart
}

function managePickups() {
  pickupTimer--;
  if (pickupTimer <= 0) { spawnHeart(); pickupTimer = floor(random(540, 900)); }
  powerTimer--;
  if (powerTimer <= 0) { spawnPowerup(); powerTimer = floor(random(1500, 2600)); } // very rare

  for (let i = pickups.length - 1; i >= 0; i--) {
    let pk = pickups[i];
    // slow, random wander
    pk.vx += random(-0.06, 0.06);
    pk.vy += random(-0.06, 0.06);
    pk.vx = constrain(pk.vx, -0.9, 0.9);
    pk.vy = constrain(pk.vy, -0.9, 0.9);
    pk.x += pk.vx;
    pk.y += pk.vy;
    if (pk.x < 30 || pk.x > width - 30) pk.vx *= -1;
    if (pk.y < 30 || pk.y > height - 30) pk.vy *= -1;
    pk.life--;
    let a = pk.life < 90 ? map(pk.life, 0, 90, 0, 255) : 255; // fade out near the end
    let s = 1 + 0.12 * sin(frameCount * 0.18);

    push();
    translate(pk.x, pk.y);
    // a slow rotating ring marks the rare power-ups as special
    if (pk.type !== "heart") {
      noFill();
      stroke(255, 255, 255, a * 0.45);
      strokeWeight(1.5);
      push(); rotate(frameCount * 0.05); ellipse(0, 0, 36, 28); pop();
    }
    scale(s);
    noStroke();
    if (pk.type === "heart") {
      fill(255, 70, 110, a);
      ellipse(-6, -3, 15, 15);
      ellipse(6, -3, 15, 15);
      triangle(-13, 0, 13, 0, 0, 15);
      fill(255, 255, 255, a * 0.5);
      ellipse(-4, -5, 4, 4);
    } else if (pk.type === "dmg") {
      fill(255, 150, 40, a * 0.3); ellipse(0, 0, 30, 30);
      fill(255, 175, 60, a);
      triangle(0, -10, -9, 1, 9, 1);
      triangle(0, -1, -9, 10, 9, 10);
    } else { // multi
      fill(120, 210, 255, a * 0.3); ellipse(0, 0, 30, 30);
      fill(120, 210, 255, a);
      ellipse(-7, 2, 5, 12);
      ellipse(0, -2, 5, 12);
      ellipse(7, 2, 5, 12);
    }
    pop();

    if (dist(pk.x, pk.y, player.pos.x, player.pos.y) < 24 + player.w / 2) {
      if (pk.type === "heart") {
        player.hp = min(player.maxHp, player.hp + 25);
        spawnPopup(player.pos.x, player.pos.y - 34, "+25", color(255, 110, 150), 30);
      } else if (pk.type === "dmg") {
        player.bulletDamage = min(3, player.bulletDamage + 1);
        spawnPopup(player.pos.x, player.pos.y - 36, "DMG x" + player.bulletDamage, color(255, 175, 60), 32);
      } else {
        player.bulletCount = min(3, player.bulletCount + 1);
        spawnPopup(player.pos.x, player.pos.y - 36, "GUNS x" + player.bulletCount, color(120, 210, 255), 32);
      }
      pickups.splice(i, 1);
      continue;
    }
    if (pk.life <= 0) pickups.splice(i, 1);
  }
}

function generatePlayer() {
  player = new Player(createVector(width / 2, height / 1.3), createVector(0, 0), 100, 40, 40);
}

function drawBackground() {
  if (backgroundStars.length === 0) {
    for (let i = 0; i < sNum; i++) {
      backgroundStars.push(new Stars(createVector(random(width), random(height))));
    }
  }
  for (let i = 0; i < backgroundStars.length; i++) {
    backgroundStars[i].update();
    backgroundStars[i].drawMe();
  }
}

function displayScore() {
  push();
  noStroke();
  textAlign(CENTER, TOP);
  fill(240);
  textSize(24);
  text("SCORE  " + score, width / 2, 10);
  fill(120, 200, 255);
  textSize(13);
  text("HIGH  " + highScore, width / 2, 38);
  textAlign(RIGHT, TOP);
  fill(180);
  textSize(14);
  text("LEVEL " + level, width - 14, 14);
  textAlign(CENTER, TOP);
  if (boss && !boss.leaving) {
    let a = 150 + 105 * sin(frameCount * 0.15);
    fill(255, 90, 90, a);
    textSize(15);
    text("BOSS  ROUND " + round, width / 2, 60);
  }
  pop();
}

function reportScore(won) {
  if (scoreReported) return;
  scoreReported = true;
  if (score > highScore) {
    highScore = score;
    try { localStorage.setItem('arcade.highscore', String(highScore)); } catch (e) {}
  }
  try {
    window.parent.postMessage({ type: 'arcade:gameover', score: score, win: !!won }, '*');
  } catch (e) {}
}

function endScene() {
  if (!player.isAlive) {
    gameEnds = true;
    reportScore(false);

    push();
    noStroke();
    rectMode(CORNER);
    fill(0);                       // solid black screen
    rect(0, 0, width, height);

    textAlign(CENTER, CENTER);
    textStyle(BOLD);

    // GAME OVER, then Score and Best - shown first
    fill(255, 70, 70);
    textSize(92);
    text("GAME OVER", width / 2, height / 2);
    fill(255);
    textSize(44);
    text("Score  " + score, width / 2, height * 0.62);
    fill(150, 210, 255);
    textSize(20);
    text("Best  " + highScore, width / 2, height * 0.69);

    // the death line: quick-changing flicker through random messages while the
    // curtain reveals, then it lands on the actual death text and locks
    if (l > 18) {
      if (frameCount % 3 === 0) flickerLine = FLICKER_LINES[floor(random(FLICKER_LINES.length))];
    } else {
      flickerLine = player.deathText || "Lost to the void.";
    }
    let line = flickerLine;
    textSize(34);
    let tw = textWidth(line) + 50;
    fill(150, 210, 255);
    text(line, width / 2, height * 0.27);
    rectMode(CENTER);
    fill(0);
    rect(width / 2, height * 0.27, map(l, 100, 18, tw, 0, true), 60); // curtain shrinks as it flickers

    textStyle(NORMAL);
    pop();
    l--;
  }
}

function restartGame() {
  enemies = [];
  boss = null;
  explosions = [];
  popups = [];
  backgroundStars = [];
  time = 0;
  score = 0;
  round = 0;
  level = 1;
  pickups = [];
  pickupTimer = 600;
  powerTimer = 1600;
  flickerLine = "";
  deathParts = [];
  deathStarted = false;
  endStarted = false;
  deathTimer = 70;
  nextBossFrame = 1100;
  survivalTick = 0;
  gameEnds = false;
  l = 100;
  scoreReported = false;
  generatePlayer();
  for (let i = 0; i < 4; i++) spawnMeteor();
  gameState = 0;
  loop();
}

function drawStartOverlay() {
  let cx = width / 2;
  push();
  // legibility veil over the live starfield
  noStroke();
  fill(5, 8, 16, 185);
  rectMode(CORNER);
  rect(0, 0, width, height);

  textAlign(CENTER, CENTER);

  // title with a soft glow
  textStyle(BOLD);
  fill(120, 200, 255, 45);
  textSize(72);
  text("THE LAST STAND", cx, height * 0.25 + 3);
  fill(238, 246, 255);
  text("THE LAST STAND", cx, height * 0.25);

  // subtitle + best score
  textStyle(NORMAL);
  fill(150, 200, 255);
  textSize(18);
  text("ENDLESS SPACE SHOOTER", cx, height * 0.33);
  fill(255, 205, 120);
  textSize(15);
  text("BEST  " + highScore, cx, height * 0.385);

  // pulsing play button
  let cy = height * 0.56;
  let pulse = 1 + 0.06 * sin(frameCount * 0.12);
  let r = 56 * pulse;
  noFill();
  stroke(120, 200, 255);
  strokeWeight(3);
  ellipse(cx, cy, r * 2, r * 2);
  noStroke();
  fill(120, 200, 255);
  triangle(cx - 14, cy - 21, cx - 14, cy + 21, cx + 24, cy);

  fill(238, 246, 255);
  textStyle(BOLD);
  textSize(26);
  text("CLICK TO PLAY", cx, cy + 92);

  // controls
  textStyle(NORMAL);
  fill(185, 200, 220);
  textSize(15);
  text("WASD / Arrows  fly       SPACE  shoot", cx, cy + 122);
  fill(140, 160, 185);
  textSize(13);
  text("grab hearts to heal   .   rare power-ups boost your guns", cx, cy + 146);

  // fullscreen chip (clickable) - best experience prompt
  let fw = 250, fh = 40, fy = height * 0.875;
  fsBtn = { x: cx - fw / 2, y: fy, w: fw, h: fh };
  let hover = mouseX > fsBtn.x && mouseX < fsBtn.x + fw && mouseY > fsBtn.y && mouseY < fsBtn.y + fh;
  rectMode(CENTER);
  stroke(120, 200, 255, hover ? 255 : 150);
  strokeWeight(1.5);
  fill(120, 200, 255, hover ? 48 : 20);
  rect(cx, fy + fh / 2, fw, fh, 9);
  noStroke();
  fill(225, 238, 255);
  textStyle(BOLD);
  textSize(14);
  text(fullscreen() ? "EXIT FULLSCREEN  (ESC)" : "PLAY FULLSCREEN  -  best  (F)", cx, fy + fh / 2);
  textStyle(NORMAL);
  pop();
}

function toggleFullscreen() {
  fullscreen(!fullscreen());
}

function drawFsHint() {
  push();
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  let bw = 220, bh = 30;
  let cx = width - bw / 2 - 14, cy = height - bh / 2 - 14;
  noStroke();
  fill(5, 8, 16, 205);
  rect(cx, cy, bw, bh, 8);
  noFill();
  stroke(120, 200, 255, 95);
  strokeWeight(1);
  rect(cx, cy, bw, bh, 8);
  noStroke();
  fill(212, 228, 255);
  textStyle(BOLD);
  textSize(13);
  text("press  ESC  to exit fullscreen", cx, cy);
  textStyle(NORMAL);
  pop();
}

function drawRestartPrompt() {
  push();
  textAlign(CENTER, CENTER);
  let a = 150 + 105 * sin(frameCount * 0.09);
  fill(255, a);
  textSize(26);
  text("press R or click to play again", width / 2, height * 0.78);
  pop();
}

function reportScoreSafe() {}

function mousePressed() {
  if (gameState == -1) {
    // tapping the fullscreen chip toggles fullscreen instead of starting
    if (fsBtn && mouseX > fsBtn.x && mouseX < fsBtn.x + fsBtn.w &&
        mouseY > fsBtn.y && mouseY < fsBtn.y + fsBtn.h) {
      toggleFullscreen();
      return;
    }
    gameState = 0; time = 0; return; // click anywhere else to start
  }
  if (gameEnds) { restartGame(); }   // click to restart
}
