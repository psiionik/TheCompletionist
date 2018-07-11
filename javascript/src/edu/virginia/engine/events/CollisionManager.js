"use strict";

class CollisionManager extends IEventListener{

    constructor(){
      super();
      this.imag;
      this.done = false;
      this.c = 0;
    }

    handleEven(even,obj){
      window.alert('game over man (refresh to restart)');
    }
}
