"use strict";

class TweenEvent extends Event{
  constructor(eventType, tween, tweenjuggler){
    super(eventType);
    this.cor = tween;
    // this.star = startvalue;
    // this.end = endvalue;
    // this.time = time;
    // this.type = type;
    this.complete = false;
    this.tweenjuggler = tweenjuggler;
  }


  getTween(){
    return this.cor;
  }
}
