"use strict";

class PhysicsSprite extends AnimatedSprite{
  constructor(id, filename){
    super(id, filename);
    this.mass = 1;
    this.xacel = 0;
    this.yacel = 0;
    this.xvelo = 0;
    this.yvelo = 0;

    this.timestamp = 0;
    this.gravity = 1000;
    this.xforce = 0;
    this.yforce = 0;
    this.tprev =0;
    this.tcurrent = 0;
    this.tchang = 0;
  }

  update(){
    super.update();
    // if(this.playing){
    //   super.setImage(this.frames.get(this.currentFrame));
    //   this.currentFrame++;
    //   if(this.currentFrame >= this.endIndex){
    //     this.currentFrame = 0;
    //   }
    // }
  }

  /**
   * Draws this image to the screen
   */
  draw(g){
    super.draw(g);
  }

  getGravity(){
    return this.gravity;
  }

  setGravity(val){
    this.gravity = val;
  }

  getMass(){
    return this.mass;
  }

  setMass(val){
    this.mass = val;
  }

  computeVeloX(){
    // this.xvelo = this.xvelo + (this.xforce/this.mass)*(this.tchang - this.tstart);
    this.xvelo = this.xvelo + (this.xacel)*(this.tchang);

  }

  computeVeloY(){
    // this.yvelo = this.yvelo + (this.yforce/this.mass)*(this.tchang - this.tstart);
    this.yvelo = this.yvelo + (this.yacel)*(this.tchang);

  }

  computePosX(){
    // return this.xPos;
    // this.xPos = this.xPos + this.xvelo*(this.tchang) + (this.xacel/2)*(this.tchang)*(this.tchang);
    this.xPos = this.xPos + this.xvelo*(this.tchang)
  }

  computePosY(){
    // this.yPos = this.yPos + this.yvelo*(this.tchang) + (this.yacel/2)*(this.tchang)*(this.tchang);
    this.yPos = this.yPos + this.yvelo*(this.tchang);
  }

  computeAccelX(){
    this.xacel = this.xforce/this.mass;
  }

  computeAccelY(){
    this.yacel = this.yforce/this.mass;
  }
  setYEnd(val){
    this.yend = val;
  }


}
