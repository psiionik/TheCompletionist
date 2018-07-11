"use strict";

/**
 * AnimatedSprite class
 *
 * */
class AnimatedSprite extends Sprite{
  constructor(id, filename){
    super(id, filename);
    this.currentFrame = 0;
    this.startIndex = 0;
    this.endIndex =0  ;
    this.animationSpeed = 1;
    this.playing = false;
    this.counter = 0;
    this.counterEnd=5;
    this.counter2=0;
    this.frameCount = 2;
    this.speed = 12;
    this.play2 = true;
    this.frames = new ArrayList();

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



  playAni(){
    this.playing = true;
    this.play2 = true;
  }

  getFrameCount(){
    return this.frameCount;
  }
  setFrameCount(val){
    this.frameCount = val;
  }

  getStartIndex(){
    return this.startIndex;
  }

  setStartIndex(val){
    this.startIndex = val;
  }

  getEndIndex(){
    return this.endIndex;
  }

  setEndIndex(val){
    this.endIndex = val;
  }

  setAnimation(str, sprType){
    if(sprType == "mario"){
      if(str == "walk"){
        this.setStartIndex(0);
        this.setEndIndex(1);
      }
      if(str == "jump"){
        this.setStartIndex(2);
        this.setEndIndex(2);
      }
    }
    if(sprType == "bowser"){
      if(str == "walk"){
        this.setStartIndex(0);
        this.setEndIndex(1);
      }
      if(str == "shoot"){
        this.setStartIndex(2);
        this.setEndIndex(3);
      }
    }
    if(sprType == "crashman"){
      if(str == "walk"){
        this.setStartIndex(1);
        this.setEndIndex(4);
      }
      if(str == "jump"){
        this.setStartIndex(5);
        this.setEndIndex(7);
      }
    }
    if(sprType == "megaman"){
      if(str == "walk"){
        this.setStartIndex(1);
        this.setEndIndex(3);
      }
      if(str == "attack"){
        this.setStartIndex(4);
        this.setEndIndex(4);
      }
      if(str == "walkattack"){
        this.setStartIndex(5);
        this.setEndIndex(7);
      }
      if(str == "jump"){
        this.setStartIndex(8);
        this.setEndIndex(8);
      }
    }
    if(sprType == "explosion"){
      this.setStartIndex(0);
      this.setEndIndex(12);
    }


    // if(sprType == "megaman"){
    //
    // }
  }

  pauseAni(){
    this.play2 = false;
  }

  getSpeed(){
    return this.counterEnd;
  }

  setSpeed(val){
    this.counterEnd = val;
  }
}
