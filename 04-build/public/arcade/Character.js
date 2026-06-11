class Character{
  // pos = (x,y)
  // v = velocity
  // h = height
  // w = width
  // hp = health
  // ang = angle
  constructor(pos, v, h, w, hp){
    this.pos = pos;
    this.v = v;
    this.hp = hp;
    this.h = h;
    this.w = w;
    this.damp = 0.85;
    this.isAlive = true;
  }

  update(){
    this.moveCharacter();
    this.checkWalls();
  }
  
  moveCharacter(){
    this.pos.add(this.v);
    this.v.mult(this.damp);
  }

  accelerate(acc){
    this.v.add(acc);
  }
  
  drawCharacter(){
    push(); 
    translate(this.pos);
    //body
    noStroke();
    fill(120,160,116);
    circle(0,0,100);
    pop();
  }
  
  hitCharacter(other){
    let d = this.pos.dist(other.pos);
    let combinedRadii = (this.w + other.w) / 2;
    let combinedRadii2 = (this.h + this.h) / 2;
    return (d <= (combinedRadii) || (combinedRadii2) );
  }

  decreaseHealth(n){
    this.hp -= n;
  }
  
  checkWalls(){
    // Left
    if(this.pos.x < -this.w/2){
      this.pos.x = width + this.w/2;
    }
    // Right
    if(this.pos.x > width + this.w/2){
      this.pos.x = - this.w/2;
    }
    // Top
    if(this.pos.y < - this.w/2){
      this.pos.y = height + this.w/2;
    }
    // Bottom
    if(this.pos.y> height + this.w/2){
      this.pos.y = - this.w/2;
    }
  }
  
}