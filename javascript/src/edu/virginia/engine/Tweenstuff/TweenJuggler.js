"use strict";

class TweenJuggler{
  constructor(){
    this.listOfTweens = new ArrayList();
  }

  addTween(tween){
    this.listOfTweens.add(tween);
  }

  nextFrame(){
    var temp = 0;
    for (var i =0; i < this.listOfTweens.size(); i++){
      this.listOfTweens.get(temp).update();
      if(this.listOfTweens.get(temp).isComplete()){
        this.listOfTweens.removeAt(temp);
      }
      else{
        temp++;
      }

    }


  }
}
