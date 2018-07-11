"use strict";


//

class WinScreen extends DisplayObjectContainer{

  constructor(id, filename){
    super(id, filename);
    this.winTheme = new Sound("win theme", "resources/winlosesounds/youwin.mp3");
    this.load= false;
    this.winimage = new PhysicsSprite("win", "youwin.png");
    this.winimage.setSize(300, 100);
    this.winimage.xPos = 750;
    // this.winimage.yPos = -100;
    this.jugl = new TweenJuggler();
    this.winTween = new Tween(this.winimage, "easeOutBounce");
    this.jugl.addTween(this.winTween);
  }

  update(pressedKeys, gamepads){
    super.update();
    this.jugl.nextFrame();
    if(this.load == false){
      this.winTween.animateTween("ypos", 0, 350, 2);
      
      this.winTheme.playSound();
      this.load = true;
    }
  }

  draw(g){
    super.draw(g);
    this.winimage.draw(g);
  }
}
