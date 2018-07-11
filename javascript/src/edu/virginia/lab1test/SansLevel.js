"use strict";

var counter = 0;
var counter2 = 0;
var counter3 = 0;
var counter4 = 0;
var counter5 = 0;
var counter6 =0;
var counter7 =0;
var counter8 = 0;
var tempClock1 = new GameClock();

var SansComplete = false;
var sansLoad = false;

class SansLevel extends DisplayObjectContainer{

  constructor(id, filename){
    super(id,filename);
    this.stage1 = true;
    this.stage2 = false;
    this.stage3 = false;

    //creating all the sprites
    this.drawAll = new DisplayObjectContainer("ok", "");
    this.playerheart = new PhysicsSprite("test", "playerheartred.png");
    this.playerheart.setSize(15,15);
    this.playerheart.xPos = 750;
    this.playerheart.yPos = 475;
    this.border = new Rectangle(550, 325, 400, 300);
    this.sanstorso = new PhysicsSprite("sanstorso", "sanstorso.png");
    this.sanstorso.xPos = 750;
    this.sanstorso.yPos = 200;
    this.sansface = new PhysicsSprite("sansface", "sansface.png");
    this.sansface.xPos = 750;
    this.sansface.yPos = 130;
    this.sansface.setSize(60,60);
    this.blaster1 = new PhysicsSprite("blaster", "gasterblaster0.png");
    this.blaster1.visible = false;
    this.blaster1.xPos = -50;
    this.blasterAttack1 = new PhysicsSprite("blasterattack", "blasterattack.png");
    // this.blaster1.yPos = 500;
    this.blasterAttack1.setSize(500,100);
    this.blasterAttack1.xPos = 300;
    this.blasterAttack1.alphaVal = 0;
    this.blasterAttack1.visible = false;

    this.blaster2 = new PhysicsSprite("blaster", "gasterblaster0.png");
    this.blaster2.visible = false;
    this.blaster2.xPos = 1400;
    this.blasterAttack2 = new PhysicsSprite("blasterattack", "blasterattack.png");
    // this.blaster2.yPos = 500;
    this.blasterAttack2.setSize(500,100);
    this.blasterAttack2.xPos = -300;
    this.blasterAttack2.alphaVal = 0;
    this.blasterAttack2.visible = false;

    this.blaster3 = new PhysicsSprite("blaster", "gasterblaster0.png");
    this.blaster3.visible = false;
    this.blaster3.xPos = 700;
    this.blasterAttack3 = new PhysicsSprite("blasterattack", "blasterattack.png");
    // this.blaster2.yPos = 500;
    this.blasterAttack3.setSize(500,100);
    this.blasterAttack3.xPos = 300;
    this.blasterAttack3.alphaVal = 0;
    this.blasterAttack3.visible = false;

    this.blaster4 = new PhysicsSprite("blaster", "gasterblaster0.png");
    this.blaster4.visible = false;
    this.blaster4.xPos = 700;
    this.blasterAttack4 = new PhysicsSprite("blasterattack", "blasterattack.png");
    // this.blaster2.yPos = 500;
    this.blasterAttack4.setSize(500,100);
    this.blasterAttack4.xPos = -300;
    this.blasterAttack4.alphaVal = 0;
    this.blasterAttack4.visible = false;

    // this.blaster5 = new PhysicsSprite("blaster", "gasterblaster0");
    // this.blasterAttack5 = new PhysicsSprite("blasterattack", "blasterattack.png");
    // this.blasterAttack5.setSize(500,100);

    this.fightButton = new PhysicsSprite("fight", "fightbutton.png");
    this.fightButton.visible = false;
    this.fightButton.setSize(100,75);
    this.fightButton.xPos = 300;
    this.fightButton.yPos = 600;

    this.attackImage = new PhysicsSprite("attack", "attack.png");
    this.attackImage.alphaVal = 0;


    //Adding all the sprites as children
    this.drawAll.addChild(this.playerheart);
    this.drawAll.addChild(this.sanstorso);
    this.drawAll.addChild(this.sansface);
    this.drawAll.addChild(this.blaster1);
    this.blaster1.addChild(this.blasterAttack1);
    this.drawAll.addChild(this.blaster2);
    this.blaster2.addChild(this.blasterAttack2);
    this.drawAll.addChild(this.fightButton);
    this.sansface.addChild(this.attackImage);
    this.drawAll.addChild(this.blaster3);
    this.drawAll.addChild(this.blaster4);
    this.blaster3.addChild(this.blasterAttack3);
    this.blaster4.addChild(this.blasterAttack4);


    //Handling Tweens
    this.tweenAll = new TweenJuggler();
    this.tweenManage = new TweenManager();
    this.blasterTween = new Tween(this.blaster1, "easeInOutQuart");
    this.tweenAll.addTween(this.blasterTween);
    this.blasterAttacktween = new Tween(this.blasterAttack1, "easeInOutExpo");
    this.tweenAll.addTween(this.blasterAttacktween);

    this.blasterTween2 = new Tween(this.blaster2, "easeInOutQuart");
    this.tweenAll.addTween(this.blasterTween2);
    this.blasterAttacktween2 = new Tween(this.blasterAttack2, "easeInOutExpo");
    this.tweenAll.addTween(this.blasterAttacktween2);

    this.blasterTween3 = new Tween(this.blaster3, "easeInOutQuart");
    this.tweenAll.addTween(this.blasterTween3);
    this.blasterAttacktween3 = new Tween(this.blasterAttack3, "easeInOutExpo");
    this.tweenAll.addTween(this.blasterAttacktween3);

    this.blasterTween4 = new Tween(this.blaster4, "easeInOutQuart");
    this.tweenAll.addTween(this.blasterTween4);
    this.blasterAttacktween4 = new Tween(this.blasterAttack4, "easeInOutExpo");
    this.tweenAll.addTween(this.blasterAttacktween4);






    //Collisions
    this.collisionManager = new CollisionManager();
    this.blasterAttack1Collision = new Event("blaster1");
    this.blasterAttack2Collision = new Event("blaster2");
    this.blasterAttack3Collision = new Event("blaster3");
    this.blasterAttack4Collision = new Event("blaster4");
    this.playerheart.addEventListen(this.collisionManager, this.blasterAttack1Collision.eventType);
    this.playerheart.addEventListen(this.collisionManager, this.blasterAttack2Collision.eventType);
    this.playerheart.addEventListen(this.collisionManager, this.blasterAttack3Collision.eventType);
    this.playerheart.addEventListen(this.collisionManager, this.blasterAttack4Collision.eventType);


    this.runningClock = new GameClock();
  }

  update(pressedKeys, gamepads){
    super.update();
    this.drawAll.update();
    this.tweenAll.nextFrame();
    // this.stage3 = true;

    if(parseInt(this.runningClock.getElapsedTime()) == 1 && this.stage1 == true){
      this.blaster1.visible = true;
      this.blasterTween.animateTween("alpha", 0, 1, 1);
      // this.blasterTween.animateTween("rotate", 0, 270, 1);
      this.blasterTween.animateTween("xpos", this.blaster1.xPos, 400, 1);
      this.blasterTween.animateTween("ypos", this.blaster1.yPos, 475, 1);
    }
    if (this.blasterTween.isComplete() && counter == 0){
      counter++;
      this.blasterAttack1.visible = true;
      this.blasterAttacktween.animateTween("alpha", 0, 1, .5);


    }
    if(this.blasterAttacktween.isComplete() && counter2 == 0){
      counter2++;
      this.blasterAttack1.visible = false;
      this.blaster1.visible = false;
    }

    if(parseInt(this.runningClock.getElapsedTime()) == 3 && this.stage1 == true){
      this.blaster2.visible = true;
      this.blasterTween2.animateTween("alpha", 0, 1, 1);
      // this.blasterTween.animateTween("rotate", 0, 270, 1);
      this.blasterTween2.animateTween("xpos", this.blaster2.xPos, 1100, 1);
      this.blasterTween2.animateTween("ypos", this.blaster2.yPos, 475, 1);
    }

    if (this.blasterTween2.isComplete() && counter3 == 0){
      counter3++;
      this.blasterAttack2.visible = true;
      this.blasterAttacktween2.animateTween("alpha", 0, 1, .5);


    }
    if(this.blasterAttacktween2.isComplete() && counter4 == 0){
      counter4++;
      this.blasterAttack2.visible = false;
      this.blaster2.visible = false;
    }

    if(parseInt(this.runningClock.getElapsedTime()) == 7 && this.stage1 == true){
      this.fightButton.visible = true;

    }


    if(pressedKeys.contains(90) && this.fightButton.visible == true && this.stage1 == true){
      this.attackImage.alphaVal = 1;
      this.fightButton.visible = false;
      tempClock1.resetGameClock();
      this.stage1 = false;
      this.stage2 = true;
      this.runningClock.resetGameClock();
    }
    if(parseInt(tempClock1.getElapsedTime()) == 1){
      this.attackImage.alphaVal = 0;
    }

    if(parseInt(this.runningClock.getElapsedTime()) == 2 && this.stage2 == true){
      this.blaster3.visible = true;
      this.blasterTween3.animateTween("alpha", 0, 1, 1);
      // this.blasterTween.animateTween("rotate", 0, 270, 1);
      this.blasterTween3.animateTween("xpos", this.blaster3.xPos, 425, 1);
      this.blasterTween3.animateTween("ypos", this.blaster3.yPos, 575, 1);
    }
    if (this.blasterTween3.isComplete() && counter5 == 0){
      counter5++;
      this.blasterAttack3.visible = true;
      this.blasterAttacktween3.animateTween("alpha", 0, 1, .5);


    }
    if(this.blasterAttacktween3.isComplete() && counter6 == 0){
      counter6++;
      this.blasterAttack3.visible = false;
      this.blaster3.visible = false;
    }

    if(parseInt(this.runningClock.getElapsedTime()) == 2 && this.stage2 == true){
      this.blaster4.visible = true;
      this.blasterTween4.animateTween("alpha", 0, 1, 1);
      // this.blasterTween.animateTween("rotate", 0, 270, 1);
      this.blasterTween4.animateTween("xpos", this.blaster4.xPos, 1100, 1);
      this.blasterTween4.animateTween("ypos", this.blaster4.yPos, 400, 1);
    }
    if (this.blasterTween4.isComplete() && counter7 == 0){
      counter7++;
      this.blasterAttack4.visible = true;
      this.blasterAttacktween4.animateTween("alpha", 0, 1, .5);


    }
    if(this.blasterAttacktween4.isComplete() && counter8 == 0){
      counter8++;
      this.blasterAttack4.visible = false;
      this.blaster4.visible = false;
    }

    if(parseInt(this.runningClock.getElapsedTime()) == 7 && this.stage2 == true){
      this.fightButton.visible = true;

    }


    if(pressedKeys.contains(90) && this.fightButton.visible == true && this.stage2 == true){
      this.attackImage.alphaVal = 1;
      this.fightButton.visible = false;
      tempClock1.resetGameClock();
      this.stage2 = false;
      this.stage3 = true;
      this.drawAll.removeChildObj(this.blaster1);
      this.drawAll.removeChildObj(this.blaster2);
      this.drawAll.removeChildObj(this.blaster3);
      this.drawAll.removeChildObj(this.blaster4);
      this.drawAll.removeChildObj(this.blasterAttack1);
      this.drawAll.removeChildObj(this.blasterAttack2);
      this.drawAll.removeChildObj(this.blasterAttack3);
      this.drawAll.removeChildObj(this.blasterAttack4);
      this.runningClock.resetGameClock();
    }
    if(parseInt(tempClock1.getElapsedTime()) == 1){
      this.attackImage.alphaVal = 0;
    }
    if(this.stage3 == true){
      SansComplete = true;
    }

    if(pressedKeys.contains(48)){
      SansComplete = true;
    }
    // if(parseInt(this.runningClock.getElapsedTime()) == 2 && this.stage3 == true){
    //   this.drawAll.addChild(this.blaster5);
    //   this.blaster5.addChild(this.blasterAttack5);
    //   this.blaster5.visible = true;
    //   this.blaster5.xPos = -50;
    //   this.blaster5.yPos = -50;
    //   this.blasterTween5 = new Tween(this.blaster5, "easeInOutQuart");
    //   this.blasterTween.animateTween("alpha", 0, 1, 1);
    //   // this.blasterTween.animateTween("rotate", 0, 270, 1);
    //   this.blasterTween.animateTween("xpos", this.blaster5.xPos, 400, 1);
    //   this.blasterTween.animateTween("ypos", this.blaster5.yPos, 475, 1);
    // }
    // if (this.blasterTween.isComplete() && this.stage3== true){
    //   this.blasterAttacktween5 = new Tween(this.blasterAttack5, "easeInOutExpo");
    //   this.blaster5.addChild(this.blasterAttack5);
    //   this.blasterAttacktween.animateTween("alpha", 0, 1, .5);
    // }
    // if(this.blasterAttacktween3.isComplete() && this.stage3 == true){
    //   this.drawAll.removeChildObj(this.blaster5);
    //
    // }
    //
    // if(parseInt(this.runningClock.getElapsedTime()) == 2 && this.stage3 == true){
    //   this.blaster4.visible = true;
    //   this.blasterTween4.animateTween("alpha", 0, 1, 1);
    //   // this.blasterTween.animateTween("rotate", 0, 270, 1);
    //   this.blasterTween4.animateTween("xpos", this.blaster4.xPos, 1100, 1);
    //   this.blasterTween4.animateTween("ypos", this.blaster4.yPos, 400, 1);
    // }
    // if (this.blasterTween4.isComplete() && counter7 == 0){
    //   counter7++;
    //   this.blasterAttack4.visible = true;
    //   this.blasterAttacktween4.animateTween("alpha", 0, 1, .5);
    //
    //
    // }
    // if(this.blasterAttacktween4.isComplete() && counter8 == 0){
    //   counter8++;
    //   this.blasterAttack4.visible = false;
    //   this.blaster4.visible = false;
    // }
    //
    // if(parseInt(this.runningClock.getElapsedTime()) == 7 && this.stage3 == true){
    //   this.fightButton.visible = true;
    //
    // }
    //
    //
    // if(pressedKeys.contains(90) && this.fightButton.visible == true && this.stage3 == true){
    //   this.attackImage.alphaVal = 1;
    //   this.fightButton.visible = false;
    //   tempClock1.resetGameClock();
    //   this.stage3 = false;
    //   this.stage4 = true;
    //   this.runningClock.resetGameClock();
    // }
    // if(parseInt(tempClock1.getElapsedTime()) == 1){
    //   this.attackImage.alphaVal = 0;
    // }

    // console.log(this.tweenAll.listOfTweens)
    if(pressedKeys.contains(37)){
      if(this.playerheart.xPos >this.border.x + this.playerheart.pivX){
        this.playerheart.xPos -= 3;
      }
    }

    if(pressedKeys.contains(39)){
      if(this.playerheart.xPos <this.border.x + this.border.wid - this.playerheart.pivX){
        this.playerheart.xPos += 3;
      }
    }

    if(pressedKeys.contains(38)){
      if(this.playerheart.yPos >this.border.y + this.playerheart.pivY){
        this.playerheart.yPos -= 3;
      }
    }

    if(pressedKeys.contains(40)){
      if(this.playerheart.yPos <this.border.y+ this.border.hei - this.playerheart.pivY){
        this.playerheart.yPos += 3;
      }
    }



    //All the collisions handled here
    if(this.playerheart.collidesWith(this.blasterAttack1) && this.blasterAttack1.visible == true){
      this.playerheart.dispatchEven(this.blasterAttack1Collision, this.blasterAttack1);
    }

    if(this.playerheart.collidesWith(this.blasterAttack2) && this.blasterAttack2.visible == true){
      this.playerheart.dispatchEven(this.blasterAttack2Collision, this.blasterAttack2);
    }

    if(this.playerheart.collidesWith(this.blasterAttack3) && this.blasterAttack3.visible == true){
      this.playerheart.dispatchEven(this.blasterAttack3Collision, this.blasterAttack3);
    }

    if(this.playerheart.collidesWith(this.blasterAttack4) && this.blasterAttack4.visible == true){
      this.playerheart.dispatchEven(this.blasterAttack4Collision, this.blasterAttack4);
    }





  }

  /**
   * Draws this image to the screen
   */
  draw(g){
    super.draw(g);
    g.strokeStyle="#FFFFFF";
    g.lineWidth = 5;
    g.strokeRect(this.border.x, this.border.y, this.border.wid, this.border.hei);
    g.clearRect(this.border.x, this.border.y, this.border.wid, this.border.hei);
    this.drawAll.draw(g)

  }




}
