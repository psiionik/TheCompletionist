"use strict";


//

class GameOverScreen extends DisplayObjectContainer{

  constructor(id, filename){
    super(id, filename);
    this.loseTheme = new Sound("lose theme", "resources/winlosesounds/gameover.mp3");
    this.load= false;
    this.loseimage = new PhysicsSprite("lose", "gameover.png");
    this.loseimage.setSize(400, 200);
    this.loseimage.xPos = 750;
    // this.loseimage.yPos = -100;
    this.jugl = new TweenJuggler();
    this.loseTween = new Tween(this.loseimage, "easeOutBounce");
    this.jugl.addTween(this.loseTween);
  }

  update(pressedKeys, gamepads){
    super.update();
    this.jugl.nextFrame();
    if(this.load == false){
      this.loseTween.animateTween("ypos", 0, 350, 2);
      this.loseTheme.playSound();
      this.load = true;
    }
  }

  draw(g){
    super.draw(g);
    this.loseimage.draw(g);
    document.getElementById("gameover").innerHTML = "Play Again? (Refresh to replay)";
  }
}
