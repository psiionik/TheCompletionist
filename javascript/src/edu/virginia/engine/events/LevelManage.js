"use strict";

class LevelManage extends IEventListener{

    constructor(o){
      super();
      this.imag;
      this.done = false;
      this.c = 0;
      this.project = o;
    }

    handleEven(even,obj){
      if(even.eventType == "bowser"){
        this.project.gameLoading.removeByIndex(0);
        this.project.gameLoading.addChild(this.project.listOfGames.get(1));
        // this.project.listOfGames.
      }
    }
}
