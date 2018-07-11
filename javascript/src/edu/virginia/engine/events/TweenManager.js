"use strict";

class TweenManager extends IEventListener{
  constructor(){
    super();
    this.imag;
    this.done = false;
    this.c = 0;
  }

  handleEven(even, obj){
    if(even.complete == false){
      even.complete == true;
    }
    // obj.removeEventListen(even.eventType, this);
    // var fadeTween = new Tween(obj, "linear");
    // fadeTween.animateTween("xpos", obj.xPos, 500, 3);
    // fadeTween.animateTween("ypos", obj.yPos, 300, 3);
    // fadeTween.animateTween("xscale", 1, 4, 3);
    // fadeTween.animateTween("yscale", 1, 4, 3);
    // fadeTween.animateTween("alpha", 0, 1, 3);
    // even.tweenjuggler.addTween(fadeTween);
  }
}
