"use strict";

class TweenParam{
    constructor(param,transition){
      this.t = 0;
      this.param = param;
      this.startvalue = 0;
      this.endvalue = 0;
      this.endtime = 0;
      this.tweentrans = new TweenTransition();
      this.trans = transition;
      this.cl = new GameClock();
    }

    update(obj){
      this.t = this.cl.getElapsedTime();
      switch(this.getParam()){
        case "xpos":
          if(!this.isComplete()){
            if(this.startvalue < this.endvalue){
              var percent = this.tweentrans.applyTransition(this.trans, this.t/this.endtime);
              if(percent*this.endvalue >= this.startvalue){
                obj.xPos = percent*this.endvalue;
              }
              else{

                obj.xPos = this.startvalue;
              }
            }
            else{
              var percent = this.tweentrans.applyTransition(this.trans, this.t/this.endtime);
              if(obj.xPos >= this.endvalue){
                obj.xPos = (1-percent)*this.startvalue;
              }
            }
          }
          break;
        case "ypos":
          if(!this.isComplete()){
            if(this.startvalue < this.endvalue){
              var percent = this.tweentrans.applyTransition(this.trans, this.t/this.endtime);
              if(percent*this.endvalue >= this.startvalue){
                obj.yPos = percent*this.endvalue;
              }
              else{

                obj.yPos = this.startvalue;
              }
            }
            else{
              var percent = this.tweentrans.applyTransition(this.trans, this.t/this.endtime);
              if(obj.yPos >= this.endvalue){
                obj.yPos = (1-percent)*this.startvalue;
              }
            }
          }
          break;
        case "xscale":
          if(!this.isComplete()){
            if(this.startvalue < this.endvalue){
              var percent = this.tweentrans.applyTransition(this.trans, this.t/this.endtime);
              if(percent*this.endvalue >= this.startvalue){
                obj.scaleX = percent*this.endvalue;
              }
              else{

                obj.scaleX = this.startvalue;
              }
            }
            else{
              var percent = this.tweentrans.applyTransition(this.trans, this.t/this.endtime);
              if(obj.scaleX >= this.endvalue){
                obj.scaleX = (1-percent)*this.startvalue;
              }
            }
          }
          break;
        case "yscale":
          if(!this.isComplete()){
            if(this.startvalue < this.endvalue){
              var percent = this.tweentrans.applyTransition(this.trans, this.t/this.endtime);
              if(percent*this.endvalue >= this.startvalue){
                obj.scaleY = percent*this.endvalue;
              }
              else{

                obj.scaleY = this.startvalue;
              }
            }
            else{
              var percent = this.tweentrans.applyTransition(this.trans, this.t/this.endtime);
              if(obj.scaleY >= this.endvalue){
                obj.scaleY = (1-percent)*this.startvalue;
              }
            }
          }
          break;
        case "rotate":
          if(!this.isComplete()){
            if(this.startvalue < this.endvalue){
              var percent = this.tweentrans.applyTransition(this.trans, this.t/this.endtime);
              if(percent*this.endvalue >= this.startvalue){
                obj.rotateVal = percent*this.endvalue;
              }
              else{

                obj.rotateVal = this.startvalue;
              }
            }
            else{
              var percent = this.tweentrans.applyTransition(this.trans, this.t/this.endtime);
              if(obj.rotateVal >= this.endvalue){
                obj.rotateVal = (1-percent)*this.startvalue;
              }
            }
          }
          break;
        case "alpha":
          if(!this.isComplete()){
            if(this.startvalue < this.endvalue){
              var percent = this.tweentrans.applyTransition(this.trans, this.t/this.endtime);
              if(percent*this.endvalue >= this.startvalue){
                obj.alphaVal = percent*this.endvalue;
              }
              else{

                obj.alphaVal = this.startvalue;
              }
            }
            else{
              var percent = this.tweentrans.applyTransition(this.trans, this.t/this.endtime);
              if(obj.alphaVal >= this.endvalue){
                obj.alphaVal = (1-percent)*this.startvalue;
              }
            }
          }
          break;
      }
    }

    getParam(){
      return this.param;
    }

    getStartVal(){
      return this.startvalue;
    }

    getEndVal(){
      return this.endvalue;
    }

    getTweenTime(){
      return this.t;
    }

    isComplete(){
      if(this.getTweenTime() > this.endtime){
        return true;
      }
      else{
        return false;
      }
    }


}
