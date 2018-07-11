"use strict";
class QuestManager extends IEventListener{

  constructor(){
    super();
    this.imag;
    this.done = false;
    this.c = 0;
  }

  handleEven(even){
    super.handleEven(even);
    this.c += 1;
    console.log(this.c);

    document.getElementById("coinnum").innerHTML = "Number of Quests Completed: " + this.c;
      window.alert("Congrats! The Quest: " + even.quest + " has been completed! " + even.disc);
  }
}
