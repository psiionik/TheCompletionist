"use strict";

var startComplete = false;
var playerHealth = 5;
var winCounter = 0;

class StartScreen extends DisplayObjectContainer{

  constructor(id, filename){
    super(id, filename);
    this.arrowKeys = new Sprite("arrowkeys", "startscreenSprites/arrowKeys.png");
    this.z = new Sprite("z", "startscreenSprites/z.jpg");
    this.x = new Sprite("x", "startscreenSprites/x.jpg");
    this.arrowKeys.setSize(300,205);
    this.z.setSize(100,100);
    this.x.setSize(100,100);
    this.msg1 = "WELCOME TO THE COMPLETIONIST!";
    this.msg2 = "Press the arrow keys to move and 'z' and 'x' to action!";
    this.msg3 = "Press Enter to Play!";
    // this.complete = new Event("complete");
    // this.complete.disc = "start";
    // this.setPair(this.complete.eventType, levelMan);
  }

  update(pressedKeys, gamepads){
    super.update();
    this.arrowKeys.xPos = 1000;
    this.arrowKeys.yPos = 300;
    this.z.xPos = 350;
    this.z.yPos = 325;;
    this.x.xPos = 550;
    this.x.yPos = 325;
    if(pressedKeys.contains(13)){
      pressedKeys.removeIns(13);
      // this.msg1 = "";
      // this.msg2 = "";
      // this.msg3 = "";
      document.getElementById("startscreen1").innerHTML = "";
      document.getElementById("startscreen2").innerHTML = "";
      document.getElementById("instructions").innerHTML = "";
      startComplete = true;

    }
  }

  draw(g){
    super.draw(g);
    this.arrowKeys.draw(g);
    this.z.draw(g);
    this.x.draw(g);
    document.getElementById("startscreen1").innerHTML = this.msg1;
    document.getElementById("startscreen2").innerHTML = this.msg2;
    document.getElementById("instructions").innerHTML = this.msg3;
  }
}
