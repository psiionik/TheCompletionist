"use strict";

var sansComplete = false;
var sansLoad = false;

class SansLevel extends DisplayObjectContainer{

  constructor(id, filename){
    super(id,filename);

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
    this.blaster1.xPos = -50;
    this.blasterAttack1 = new AttackSprite("blasterattack", "blasterattack.png");
    // this.blaster1.yPos = 500;
    this.blasterAttack1.setSize(500,100);
    this.blasterAttack1.xPos = 300;

    this.blaster2 = new PhysicsSprite("blaster", "gasterblaster0.png");
    this.blaster2.xPos = 1400;
    this.blasterAttack2 = new AttackSprite("blasterattack", "blasterattack.png");
    // this.blaster2.yPos = 500;
    this.blasterAttack2.setSize(500,100);

    this.blaster3 = new PhysicsSprite("blaster", "gasterblaster0.png");
    this.blaster3.xPos = 700;
    this.blasterAttack3 = new AttackSprite("blasterattack", "blasterattack.png");
    // this.blaster2.yPos = 500;
    this.blasterAttack3.setSize(500,100);
    this.blasterAttack3.xPos = 300;

    this.blaster4 = new PhysicsSprite("blaster", "gasterblaster0.png");
    this.blaster4.xPos = 700;
    this.blasterAttack4 = new AttackSprite("blasterattack", "blasterattack.png");
    // this.blaster2.yPos = 500;
    this.blasterAttack4.setSize(500,100);
    this.blasterAttack4.xPos = -300;

    // this.blaster5 = new PhysicsSprite("blaster", "gasterblaster0");
    // this.blasterAttack5 = new PhysicsSprite("blasterattack", "blasterattack.png");
    // this.blasterAttack5.setSize(500,100);




    //Adding all the sprites as children
    this.drawAll.addChild(this.playerheart);
    this.drawAll.addChild(this.sanstorso);
    this.drawAll.addChild(this.sansface);
    // this.drawAll.addChild(this.blaster1);
    // this.drawAll.addChild(this.blasterAttack1);
    // this.drawAll.addChild(this.blaster2);
    // this.drawAll.addChild(this.blasterAttack2);
    // this.drawAll.addChild(this.blaster3);
    // this.drawAll.addChild(this.blaster4);
    // this.drawAll.addChild(this.blasterAttack3);
    // this.drawAll.addChild(this.blasterAttack4);


    //Handling Tweens
    this.tweenAll = new TweenJuggler();
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


    this.runningClock = new GameClock();
    this.tempClock1 = new GameClock();

    this.doOnce = false;

    this.boneBottom = new PhysicsSprite("bonebottom", "bonebottom.png");
    this.boneBottom.setSize(400, 75);

    this.boneLeft = new PhysicsSprite("boneleft", "boneleft.png");
    this.boneLeft.setSize(100,300);

    this.boneRight = new PhysicsSprite("boneleft", "boneright.png");
    this.boneRight.setSize(100,300);

    this.boneTop = new PhysicsSprite("boneleft", "bonetop.png");
    this.boneTop.setSize(400,75);

    this.boneBottomTween = new Tween(this.boneBottom, "easeInOutQuart");
    this.boneLeftTween = new Tween(this.boneLeft, "easeInOutQuart");
    this.boneRightTween = new Tween(this.boneRight, "easeInOutQuart");
    this.boneTopTween = new Tween(this.boneTop, "easeInOutQuart");

    this.bones1 = new PhysicsSprite("bone1", "bigbone.png");
    this.bones1.setSize(500, 10);
    this.bones2 = new PhysicsSprite("bone2", "bigbone.png");
    this.bones2.setSize(500,10);

    this.boneTween1 = new Tween(this.bones1, "linear");
    this.boneTween2 = new Tween(this.bones2, "linear");

    this.sansMoves = new ArrayList();
    this.sansMoves.add("blaster1");
    this.sansMoves.add("blaster2");
    this.sansMoves.add("blaster3");
    this.sansMoves.add("bonebottom");
    this.sansMoves.add("boneleft");
    this.sansMoves.add("boneright");
    this.sansMoves.add("bonetop");
    this.sansMoves.add("bones1");
    this.sansMoves.add("bones2");

    this.gastSound = new Sound("gastSound", "resources/gastersound.mp3");

    this.boneSound = new Sound("boneSound", "resources/bonesound.mp3");
  }

  update(pressedKeys, gamepads){
    super.update();
    this.drawAll.update();
    this.tweenAll.nextFrame();

    if(parseInt(this.tempClock1.getElapsedTime()) == 3){
      this.tempClock1.resetGameClock();
      var x = Math.floor(Math.random() * Math.floor(this.sansMoves.size()));
      switch(this.sansMoves.get(x)){
        case "blaster1":

          this.blasterAttack1.xPos = 400 + 300;
          this.blasterAttack1.yPos = 575;

          this.blasterAttack2.xPos = 1100 - 300;
          this.blasterAttack2.yPos = 375;


          this.drawAll.addChild(this.blaster1);
          this.drawAll.addChild(this.blaster2);

          this.tweenAll.addTween(this.blasterTween);
          this.tweenAll.addTween(this.blasterTween2);

          this.blasterTween.animateTween("xpos", 0, 400, 1);
          this.blasterTween.animateTween("ypos", 0, 575, 1);
          this.blasterTween.animateTween("rotate", 0, 270, 1);

          this.blasterTween2.animateTween("xpos", 1400, 1100, 1);
          this.blasterTween2.animateTween("ypos", 0, 375, 1);
          this.blasterTween2.animateTween("rotate", 0, 90, 1);

          this.gastSound.playSound();
          break;
        case "blaster2":
          this.blasterAttack1.xPos = 400 + 300;
          this.blasterAttack1.yPos = 475;

          this.blasterAttack2.xPos = 1100 - 300;
          this.blasterAttack2.yPos = 475;

          this.blasterAttack3.rotateVal = 90;
          this.blasterAttack3.xPos = 750;
          this.blasterAttack3.yPos = 450;

          this.blasterAttack4.rotateVal = 90;
          this.blasterAttack4.xPos = 750;
          this.blasterAttack4.yPos = 450;


          this.drawAll.addChild(this.blaster1);
          this.drawAll.addChild(this.blaster2);
          this.drawAll.addChild(this.blaster3);
          this.drawAll.addChild(this.blaster4);

          this.tweenAll.addTween(this.blasterTween);
          this.tweenAll.addTween(this.blasterTween2);
          this.tweenAll.addTween(this.blasterTween3);
          this.tweenAll.addTween(this.blasterTween4);

          this.blasterTween.animateTween("xpos", 0, 400, 1);
          this.blasterTween.animateTween("ypos", 0, 475, 1);
          this.blasterTween.animateTween("rotate", 0, 270, 1);

          this.blasterTween2.animateTween("xpos", 1400, 1100, 1);
          this.blasterTween2.animateTween("ypos", 0, 475, 1);
          this.blasterTween2.animateTween("rotate", 0, 90, 1);

          this.blasterTween3.animateTween("xpos", 0, 750, 1);
          this.blasterTween3.animateTween("ypos", 0, 300, 1);

          this.blasterTween4.animateTween("xpos", 1400, 750, 1);
          this.blasterTween4.animateTween("ypos", 0, 675, 1);
          this.blasterTween4.animateTween("rotate", 0, 180, 1);

          this.gastSound.playSound();

          break;
        case "blaster3":
          this.blasterAttack1.xPos = 750;
          this.blasterAttack1.yPos = 475;
          this.blasterAttack1.rotateVal = 45;

          this.blasterAttack2.xPos = 750;
          this.blasterAttack2.yPos = 475;
          this.blasterAttack2.rotateVal = 315;


          this.blasterAttack3.xPos = 750;
          this.blasterAttack3.yPos = 475;
          this.blasterAttack3.rotateVal = 315;


          this.blasterAttack4.xPos = 750;
          this.blasterAttack4.yPos = 475;
          this.blasterAttack4.rotateVal = 45;



          this.drawAll.addChild(this.blaster1);
          this.drawAll.addChild(this.blaster2);
          this.drawAll.addChild(this.blaster3);
          this.drawAll.addChild(this.blaster4);

          this.tweenAll.addTween(this.blasterTween);
          this.tweenAll.addTween(this.blasterTween2);
          this.tweenAll.addTween(this.blasterTween3);
          this.tweenAll.addTween(this.blasterTween4);

          this.blasterTween.animateTween("xpos", 0, 500, 1);
          this.blasterTween.animateTween("ypos", 0, 250, 1);
          this.blasterTween.animateTween("rotate", 0, 320, 1);

          this.blasterTween2.animateTween("xpos", 1400, 1000, 1);
          this.blasterTween2.animateTween("ypos", 0, 255, 1);
          this.blasterTween2.animateTween("rotate", 0, 45, 1);

          this.blasterTween3.animateTween("xpos", 0, 500, 1);
          this.blasterTween3.animateTween("ypos", 0, 675, 1);
          this.blasterTween3.animateTween("rotate", 0, 225, 1);


          this.blasterTween4.animateTween("xpos", 1400, 1000, 1);
          this.blasterTween4.animateTween("ypos", 0, 675, 1);
          this.blasterTween4.animateTween("rotate", 0, 140, 1);

          this.gastSound.playSound();


          break;
        case "bonebottom":
          this.boneBottom.xPos = 750;
          this.boneBottom.yPos = 590;
          this.drawAll.addChild(this.boneBottom);
          this.tweenAll.addTween(this.boneBottomTween);
          this.boneBottomTween.animateTween("yscale", 0, 1, 1);
          this.boneSound.playSound();
          break;
        case "boneleft":
          this.boneLeft.xPos = 600;
          this.boneLeft.yPos = 475;
          this.drawAll.addChild(this.boneLeft);
          this.tweenAll.addTween(this.boneLeftTween);
          this.boneLeftTween.animateTween("xscale", 0, 1, 1);
          this.boneSound.playSound();

          break;
        case "boneright":

          this.boneRight.xPos = 900;
          this.boneRight.yPos = 475;
          this.drawAll.addChild(this.boneRight);
          this.tweenAll.addTween(this.boneRightTween);
          this.boneRightTween.animateTween("xscale", 0, 1, 1);
          this.boneSound.playSound();

          break;
        case "bonetop":
          this.boneTop.xPos = 750;
          this.boneTop.yPos = 360;
          this.drawAll.addChild(this.boneTop);
          this.tweenAll.addTween(this.boneTopTween);
          this.boneTopTween.animateTween("yscale", 0, 1, 1);
          this.boneSound.playSound();
          break;
        case "bones1":
          this.bones1.xPos = 550;
          this.bones1.yPos = 300;
          this.bones2.xPos = 950;
          this.bones2.yPos = 675;
          this.bones1.setSize(500, 10);
          this.bones2.setSize(500,10);

          this.drawAll.addChild(this.bones1);
          this.drawAll.addChild(this.bones2);
          this.tweenAll.addTween(this.boneTween1);
          this.tweenAll.addTween(this.boneTween2);

          this.boneTween1.animateTween("ypos", 300, 675, 3);
          this.boneTween2.animateTween("ypos", 675, 300, 3);
          this.boneSound.playSound();
          break;
        case "bones2":

          this.bones1.xPos = 450;
          this.bones1.yPos = 375;
          this.bones2.xPos = 1050;
          this.bones2.yPos = 575;
          this.bones1.setSize(225, 10);
          this.bones2.setSize(225,10);
          this.bones1.rotateVal = 90;
          this.bones2.rotateVal = 90;

          this.drawAll.addChild(this.bones1);
          this.drawAll.addChild(this.bones2);
          this.tweenAll.addTween(this.boneTween1);
          this.tweenAll.addTween(this.boneTween2);

          this.boneTween1.animateTween("xpos",450, 1050, 3);
          this.boneTween2.animateTween("xpos", 1050, 450, 3);
          this.boneSound.playSound();
          break;
      }

    }

    if(parseInt(this.tempClock1.getElapsedTime()) == 1){
      if(this.drawAll.listObjects.contains(this.blaster1)){
        this.drawAll.removeChildObj(this.blaster1);
        this.drawAll.addChild(this.blasterAttack1);
      }
      if(this.drawAll.listObjects.contains(this.blaster2)){
        this.drawAll.removeChildObj(this.blaster2);
        this.drawAll.addChild(this.blasterAttack2);
      }

      if(this.drawAll.listObjects.contains(this.blaster3)){
        this.drawAll.removeChildObj(this.blaster3);
        this.drawAll.addChild(this.blasterAttack3);
      }
      if(this.drawAll.listObjects.contains(this.blaster4)){
        this.drawAll.removeChildObj(this.blaster4);
        this.drawAll.addChild(this.blasterAttack4);
      }


    }

    if(parseInt(this.tempClock1.getElapsedTime()) == 2){
      if(this.drawAll.listObjects.contains(this.blasterAttack1)){
        this.drawAll.removeChildObj(this.blasterAttack1);
      }
      if(this.drawAll.listObjects.contains(this.blasterAttack2)){
        this.drawAll.removeChildObj(this.blasterAttack2);
      }
      if(this.drawAll.listObjects.contains(this.blasterAttack3)){
        this.drawAll.removeChildObj(this.blasterAttack3);
      }
      if(this.drawAll.listObjects.contains(this.blasterAttack4)){
        this.drawAll.removeChildObj(this.blasterAttack4);
      }

      if(this.drawAll.listObjects.contains(this.boneBottom)){
        this.drawAll.removeChildObj(this.boneBottom);
      }

      if(this.drawAll.listObjects.contains(this.boneLeft)){
        this.drawAll.removeChildObj(this.boneLeft);
      }

      if(this.drawAll.listObjects.contains(this.boneRight)){
        this.drawAll.removeChildObj(this.boneRight);
      }

      if(this.drawAll.listObjects.contains(this.boneTop)){
        this.drawAll.removeChildObj(this.boneTop);
      }


    }

    if(parseInt(this.tempClock1.getElapsedTime()) == 3){
      if(this.drawAll.listObjects.contains(this.bones1)){
        this.drawAll.removeChildObj(this.bones1);
      }
      if(this.drawAll.listObjects.contains(this.bones2)){
        this.drawAll.removeChildObj(this.bones2);
      }
    }





    if(pressedKeys.contains(37)){
      if(this.playerheart.xPos >this.border.x + this.playerheart.pivX){
        this.playerheart.xPos -= 5;
      }
    }

    if(pressedKeys.contains(39)){
      if(this.playerheart.xPos <this.border.x + this.border.wid - this.playerheart.pivX){
        this.playerheart.xPos += 5;
      }
    }

    if(pressedKeys.contains(38)){
      if(this.playerheart.yPos >this.border.y + this.playerheart.pivY){
        this.playerheart.yPos -= 5;
      }
    }

    if(pressedKeys.contains(40)){
      if(this.playerheart.yPos <this.border.y+ this.border.hei - this.playerheart.pivY){
        this.playerheart.yPos += 5;
      }
    }



    //All the collisions handled here
    if(this.drawAll.listObjects.contains(this.blasterAttack1)){
      if(this.playerheart.collidesWith(this.blasterAttack1)){
        playerHealth--;
      }
    }
    if(this.drawAll.listObjects.contains(this.blasterAttack2)){
      if(this.playerheart.collidesWith(this.blasterAttack2)){
        playerHealth--;
      }
    }
    if(this.drawAll.listObjects.contains(this.blasterAttack3)){
      if(this.playerheart.collidesWith(this.blasterAttack3)){
        playerHealth--;
      }
    }
    if(this.drawAll.listObjects.contains(this.blasterAttack4)){
      if(this.playerheart.collidesWith(this.blasterAttack4)){
        playerHealth--;
      }
    }

    if(this.drawAll.listObjects.contains(this.boneBottom)){
      if(this.playerheart.collidesWith(this.boneBottom)){
        playerHealth--;
      }
    }

    if(this.drawAll.listObjects.contains(this.boneLeft)){
      if(this.playerheart.collidesWith(this.boneLeft)){
        playerHealth--;
      }
    }

    if(this.drawAll.listObjects.contains(this.boneRight)){
      if(this.playerheart.collidesWith(this.boneRight)){
        playerHealth--;
      }
    }

    if(this.drawAll.listObjects.contains(this.boneTop)){
      if(this.playerheart.collidesWith(this.boneTop)){
        playerHealth--;
      }
    }

    if(this.drawAll.listObjects.contains(this.bones1)){
      if(this.playerheart.collidesWith(this.bones1)){
        playerHealth--;
      }
    }

    if(this.drawAll.listObjects.contains(this.bones2)){
      if(this.playerheart.collidesWith(this.bones2)){
        playerHealth--;
      }
    }
    if(parseInt(this.runningClock.getElapsedTime()) == 24 && winCounter < 3 && this.doOnce == false){
      this.doOnce = true;
      sansComplete = true;
      winCounter++;
    }

    if(parseInt(this.runningClock.getElapsedTime()) == 24 && winCounter >= 3 && this.doOnce == false){
      this.doOnce = true;
      sansComplete = true;
    }

    if(pressedKeys.contains(48) && this.doOnce == false){
      this.doOnce = true;
      sansComplete = true;
      console.log("here");
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

  resetAllClocks(){
    this.runningClock.resetGameClock();
    this.tempClock1.resetGameClock();
  }




}
