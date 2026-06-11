class Projectile{
  //Define
  // pos = position
  // v = velocity
  // size = size
  constructor(pos, v, angle, isBoss){
    this.pos = pos;
    this.v = v;
    this.size = createVector(5,25);
    this.isAlive = true;
    this.ang = angle;
    this.isBoss = isBoss;
    this.dmg = 1; // player bullets override this with bulletDamage
  }

  drawMe(){
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    if(!this.isBoss){ // Player - cyan plasma bolt with a hot white core
      rotate(this.ang);
      fill(120, 230, 255, 55);
      ellipse(0, 0, this.size.x * 3, this.size.y * 1.7);
      fill(90, 200, 255);
      ellipse(0, 0, this.size.x * 1.3, this.size.y);
      fill(255);
      ellipse(0, -this.size.y * 0.18, this.size.x * 0.6, this.size.y * 0.55);
    } else { // Boss - molten orange orb with a glow
      fill(255, 120, 60, 50);
      ellipse(0, 0, this.size.x * 5, this.size.y * 3.4);
      fill(230, 80, 40);
      ellipse(0, 0, this.size.x * 2.4, this.size.y * 2.4);
      fill(255, 210, 140);
      ellipse(0, 0, this.size.x * 1.1, this.size.y * 1.1);
    }
    pop();
  }
  
  update(){
    this.moveMe();
    this.handleWalls();
  }
  
  moveMe(){
    this.pos.add(this.v)
  }
  
  handleWalls(){
    if(
       this.pos.y + this.size.y/2 < 0 || // Bottom
       this.pos.y - this.size.y/2 > height || // Top
       this.pos.x + this.size.x/2 < 0 || // Right
       this.pos.x - this.size.x/2 > width // Left
      ){
      this.isAlive = false;
    }
  }

  hit(i){ // Checks if they hit something.
    return(
          abs(this.pos.x - i.pos.x) < (this.size.x/2 + i.w) /2 &&
          abs(this.pos.y - i.pos.y) < (this.size.y/2 + i.h) /2
    )
  }
  
}