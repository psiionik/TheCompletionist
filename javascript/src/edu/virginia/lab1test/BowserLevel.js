"use strict";

var bowserComplete = false;
var bowserLoad = false;


class BowserLevel extends DisplayObjectContainer{

  constructor(id, filename){
    super(id,filename);
    this.drawAll = new DisplayObjectContainer("drawAll", "");
    this.bowser = new PhysicsSprite("bowser", "bowser_0.png");
    this.mario = new PhysicsSprite("mario", "mario_0.png");
    this.axe = new Sprite("axe", "axe.png");
  	this.platform1 = new Sprite("platform1", "platform.png");
  	this.platform2 = new Sprite("platform2", "platform2.png");
  	this.bridge = new Sprite("bridge", "bridge.png");
  	this.lava = new Sprite("lava", "lava.png");
  	this.background = new Sprite("background", "background.png");
  	this.fireball = new Sprite("fireball", "fireball.png");
    this.myQuestManager = new QuestManager();
    this.AxePickedUp = new Event("axepicked");
    this.GroundCollision = new Event("groundcollision");
    this.marioTween = new Tween(this.mario, "linear");
    this.axeTween = new Tween(this.axe, "linear");
    this.bridgeTween = new Tween(this.bridge, "linear");
    this.bowserTween = new Tween(this.bowser, "linear");
    this.fireballTween = new Tween(this.fireball, "linear");
    this.jumpSound = new Sound("jumpsound", "resources/bowserSounds/mariojump.mp3");
    this.fireSound = new Sound("firesounds", "resources/bowserSounds/bowserfire.mp3");
    this.bowserFallsSound = new Sound("bowserfallingsound", "resources/bowserSounds/bowserfalls.mp3");
    this.gameCounter = 0;

    this.fireball.visible = false;
    this.bridge.visible = true;

    //Adding children
    this.drawAll.addChild(this.mario);
    this.drawAll.addChild(this.fireball);

    this.drawAll.addChild(this.bridge);
    this.drawAll.addChild(this.lava);

    this.drawAll.addChild(this.platform1);
    this.drawAll.addChild(this.platform2);
    this.drawAll.addChild(this.bowser);
    this.drawAll.addChild(this.axe);

    this.axe.addEventListen(this.myQuestManager, this.AxePickedUp.eventType);
    this.platform1.addEventListen(this.myQuestManager, this.GroundCollision.eventType);
    this.platform2.addEventListen(this.myQuestManager, this.GroundCollision.eventType);
    this.bridge.addEventListen(this.myQuestManager, this.GroundCollision.eventType);
    this.lava.addEventListen(this.myQuestManager, this.GroundCollision.eventType);

    this.bowser.setSize(200,201);
    this.bridge.setSize(1000, 77);
    this.platform1.setSize(400, 388);
    this.platform2.setSize(200,468);
    this.lava.setSize(1000, 109);
    this.fireball.setSize(63,43);
    this.axe.setSize(75,75);
    this.lava.setSize(1200, 100);



    this.platform1.xPos = 200;
    this.platform1.yPos = 506;
    this.platform2.xPos = 1400;
    this.platform2.yPos = 450;
    this.bridge.xPos = 800;
    this.bridge.yPos = 350;
    this.lava.xPos = 400;
    this.lava.yPos = 900;
    this.bowser.xPos = 1000;
    this.bowser.yPos = 220;
    this.axe.xPos = 1400;
    this.axe.yPos = 175;
    this.mario.xPos = 100;
    this.mario.yPos = 270;
    this.fireball.xPos = 950;
    this.fireball.yPos = 220;
    this.lava.xPos = 800;
    this.lava.yPos = 600;


    this.yend = 270;

    this.gamClock = new GameClock();
    this.bowserClock = new GameClock();
    this.fireClock = new GameClock();
    this.bowserMoves = new ArrayList();
    this.tweens = new TweenJuggler();
    this.tweens.addTween(this.bowserTween);
    this.bowserMoves.add("xpos"); //0
    this.bowserMoves.add("-xpos"); //1
    this.bowserMoves.add("-ypos");
    this.bowserMoves.add("fire");
    this.tweens.addTween(this.fireballTween)
    // this.bowserClock = 0;
    this.endScreen = -this.bowser.xPos +this.fireball.xPos;
    this.tweens.addTween(this.bridgeTween);
    //Animations
    this.mario.frames.add("mario_0.png");
    this.mario.frames.add("mario_1.png");
    this.mario.frames.add("mario_2.png");

    this.bowser.frames.add("bowser_0.png");
    this.bowser.frames.add("bowser_1.png");
    this.bowser.frames.add("bowser_2.png");
    this.bowser.frames.add("bowser_3.png");

    this.done = false;
    this.end = false;
    this.endClock = new GameClock();

    this.invincibility = new GameClock();

    this.damaged = false;

    this.jumping = false;

  }

  update(pressedKeys, gamepads){
    super.update();
    this.drawAll.update();
    this.tweens.nextFrame();
    this.mario.playing = false;
    // this.bowser.playing = false;
    if(this.done == false){
      this.mario.tcurrent = this.gamClock.getElapsedTime();
      this.mario.tchang = this.mario.tcurrent - this.mario.tprev;
      this.mario.tprev = this.mario.tcurrent;
      this.bowser.tcurrent = this.gamClock.getElapsedTime();
      this.bowser.tchang = this.bowser.tcurrent - this.bowser.tprev;
      this.bowser.tprev = this.bowser.tcurrent;
      if(pressedKeys.contains(37)){
        this.mario.xPos -= 8;
        this.mario.scaleX = -1;
        this.mario.setAnimation("walk", "mario");
        this.mario.playAni();
      }
      if(pressedKeys.contains(39)){
        this.mario.xPos += 8;
        this.mario.scaleX = 1;
        this.mario.setAnimation("walk", "mario");
        this.mario.playAni();

      }
      if(pressedKeys.contains(88)){
        this.jumpSound.playSound();
        if(this.jumping == false){
          this.mario.yPos -= 12;
          // this.mario.yvelo -=500;
        }
        this.mario.setAnimation("jump", "mario");
        if(this.mario.currentFrame < 2){
          this.mario.currentFrame = this.mario.startIndex;

        }
        this.mario.playAni();
      }
      else{
        this.jumping = true;
      }







      if(this.mario.yPos >= this.yend){
        this.mario.yPos = this.yend;
        this.mario.yvelo = 0;
        this.mario.yacel = 0;
        this.jumping = false;
      }
      else{
        this.mario.yacel +=40;
      }
      if(parseInt(this.bowserClock.getElapsedTime()) == 1){
        this.bowserClock.resetGameClock();
        var x = Math.floor(Math.random() * Math.floor(this.bowserMoves.size()))
        switch(this.bowserMoves.get(x)){
          case "xpos":
            this.bowserTween.animateTween("xpos", this.bowser.xPos, this.bowser.xPos + 50, 1);
            // this.bowser.setAnimation("walk", "bowser");
            // this.bowser.playAni();
            break;
          case "-xpos":
            this.bowserTween.animateTween("xpos", this.bowser.xPos, this.bowser.xPos - 50, 1);
            // this.bowser.setAnimation("walk", "bowser");
            // this.bowser.playAni();
            break;
          case "-ypos":
            this.bowser.yPos -=200;
            break;
        }
        this.tweens.addTween(this.bowserTween);

      }

      if(parseInt(this.fireClock.getElapsedTime()) == 3){
        this.fireSound.playSound();
        this.fireClock.resetGameClock();
        this.fireball.visible = true;
        this.fireballTween.animateTween("xpos", this.fireball.xPos, 0 , 2);
        this.tweens.addTween(this.fireballTween);
        // if(this.bowser.currentFrame < 2){
        //   this.bowser.currentFrame = 2;
        // }
        // this.bowser.setAnimation("shoot", "bowser");
        // this.bowser.playAni();
      }

      if(this.bowser.yPos >= this.yend -49){
        this.bowser.yPos = this.yend -49;
        this.bowser.yvelo = 0;
        this.bowser.yacel = 0;
      }
      else{
        this.bowser.yvelo += 10;
      }


      if(this.bowser.xPos >= 1200){
        this.bowser.xPos = 1200;
      }

      if(this.bowser.xPos <= 400){
        this.bowser.xPos = 400;
      }

      this.mario.computeVeloY();
      this.mario.computePosY();

      this.bowser.computeVeloY();
      this.bowser.computePosY();

      if(this.fireball.xPos <= 20){
        this.fireball.visible = false;
        this.fireball.xPos = this.bowser.xPos;
        this.fireball.yPos = this.bowser.yPos;
      }

      if(this.mario.collidesWith(this.platform1)){
        this.yend = this.platform1.yPos -this.platform1.pivY;
      }

      if(this.mario.collidesWith(this.platform2)){
        this.yend = this.platform2.yPos -this.platform2.pivY - this.mario.pivY;
      }
      else{
        this.yend = 270;
      }


      if(this.mario.playing){
        this.mario.counter++;
        if(this.mario.counter >= this.mario.counterEnd){
          this.mario.counter = 0;
          this.mario.setImage(this.mario.frames.get(this.mario.currentFrame));
          this.mario.currentFrame++;

          if(this.mario.currentFrame > this.mario.endIndex){
            this.mario.currentFrame = this.mario.startIndex;
          }
        }
      }
      else{
        this.mario.setImage("mario_0.png");
      }
    }

    // if(this.bowser.playing){
    //   this.bowser.counter++;
    //   if(this.bowser.counter >= this.bowser.counterEnd){
    //     this.bowser.counter = 0;
    //     this.bowser.setImage(this.bowser.frames.get(this.bowser.currentFrame));
    //     this.bowser.currentFrame++;
    //
    //     if(this.bowser.currentFrame > this.bowser.endIndex){
    //       this.bowser.currentFrame = this.bowser.startIndex;
    //     }
    //   }
    // }
    // else{
    //   this.bowser.setImage("bowser_0.png");
    // }




    if(this.mario.collidesWith(this.bowser) && this.damaged == false){
      this.damaged = true;
      this.invincibility.resetGameClock();
      this.mario.alphaVal = 0.5;
      playerHealth--;
    }


    if(this.mario.collidesWith(this.fireball) && this.damaged == false){
      this.damaged = true;
      this.invincibility.resetGameClock();
      this.mario.alphaVal = 0.5;
      playerHealth--;
    }

    if(parseInt(this.invincibility.getElapsedTime()) == 1 && this.damaged == true){
      this.damaged = false;
      this.mario.alphaVal = 1;

    }

    if(this.mario.collidesWith(this.axe) && this.end == false){
      this.endClock.resetGameClock();
      this.done = true;
      this.end = true;
      this.bowser.setImage("bowser_4.png");
      this.tweens.addTween(this.bowserTween);
      this.bowserTween.animateTween("ypos", this.bowser.yPos, this.bowser.yPos + 400, 1);
      this.bowserTween.animateTween("alpha", 1, 0, 1);
      this.bridgeTween.animateTween("alpha",1, 0, 1);
      this.bowserFallsSound.playSound();

    }
    if(parseInt(this.endClock.getElapsedTime()) == 2 && this.end == true){
      this.bowserFallsSound.stopSound();
      bowserComplete = true;
    }

    if(pressedKeys.contains(48)){
      bowserComplete = true;
    }

  }

  /**
   * Draws this image to the screen
   */
  draw(g){
    super.draw(g);
    // g.strokeStyle="#FFFFFF";
    // g.lineWidth = 5;
    // g.strokeRect(this.border.x, this.border.y, this.border.wid, this.border.hei);
    // g.clearRect(this.border.x, this.border.y, this.border.wid, this.border.hei);
    this.drawAll.draw(g)

  }

  resetAllClocks(){
    this.gamClock.resetGameClock();
    this.bowserClock.resetGameClock();
    this.fireClock.resetGameClock();
    this.endClock.resetGameClock();
    this.invincibility.resetGameClock();
  }




}
