"use strict";

class Tween{
  constructor(obj, transition){
    this.obj = obj;
    this.transition = transition;
    this.listOfTweenParams = new ArrayList();
  }

  animateTween(fieldToAnimate, startVal, endVal, time){
    var newTweenParam = new TweenParam(fieldToAnimate, this.transition);
    newTweenParam.startvalue = startVal;
    newTweenParam.endvalue = endVal;
    newTweenParam.endtime = time;

    this.listOfTweenParams.add(newTweenParam);


  }

  update(){
    for (var i = 0; i < this.listOfTweenParams.size(); i++){
      this.listOfTweenParams.get(i).update(this.obj);
    }
  }

  isComplete(){
    var res;
    for (var i =0; i < this.listOfTweenParams.size(); i++){
      res = this.listOfTweenParams.get(i).isComplete();
    }
    return res;
  }


}
