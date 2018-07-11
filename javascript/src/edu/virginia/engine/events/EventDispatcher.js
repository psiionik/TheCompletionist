"use strict";


class EventDispatcher{

  constructor(name){
    this.name = name;
    this.st = false;
    this.observers = new Map();
    this.xPos = 0;
    this.yPos= 0;
    this.yend = 0;

  }

  addEventListen(listener, eventType){
    this.observers.setPair(eventType, listener);
  }

  removeEventListen(listener, eventType){
    this.observers.removeValue(eventType, listener);
  }

  dispatchEven(even, obj){
    // if(this.st){

      even.source = this;
      var x = this.observers.getListValues(even.eventType)
      // console.log(x)
      for (var i = 0; i < x.length; i++){

        x[i].handleEven(even, obj);
      }
      // return even;
    // }

  }

  hasEventListen(listener, eventType){
    var res = false;
    var x = this.observers.getListValues(eventType);
    for(var i = 0; i < x.length; i++){
      if(listener == x[i]){
        res = true;
        break;
      }
    }
    return res;
  }




}
