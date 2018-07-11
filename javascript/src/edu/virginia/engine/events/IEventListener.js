"use strict";

class IEventListener{
  constructor(){

  }

  handleEven(even , obj){
    console.log("HELLO, THE EVENT: " + even.eventType + " has been recieved from : " + even.source + "!");
  }
}
