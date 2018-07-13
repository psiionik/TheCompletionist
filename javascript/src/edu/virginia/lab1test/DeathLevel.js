"use strict";

var deathComplete = false;
var deathLoad = false;



class DeathLevel extends DisplayObjectContainer{
  constructor(id, filename){
    super(id, filename);
    this.player = new PlayerSprite("player", "death/grant/grant0.png");
    this.drawAll = new DisplayObjectContainer("drawall", "");
    this.death = new PlayerSprite("death", "death/death0.png");
    this.deathAttack1 = new PhysicsSprite("attack1", "death/deathattack0.png");
    // this.background = new Sprite("background", "death/deathbackground.png");
    // this.background.setSize(1500,700);
    // this.background.xPos = 750;
    // this.background.yPos = 300;
    // this.drawAll.addChild(this.background);
    this.platform1 = new PhysicsSprite("platform1", "death/deathplatform.png");
    this.platform1.setSize(1024,56);
    this.platform1.xPos = 515;
    this.platform1.yPos = 620;
    this.platform2 = new PhysicsSprite("platform2", "death/deathplatform.png");
    this.platform2.setSize(1024,56);
    this.platform2.yPos= 620;
    this.platform2.xPos = 1025;
    this.platform3 = new PhysicsSprite("platform1", "death/deathplatform.png");
    this.platform3.setSize(1024,56);
    this.platform3.xPos = 515;
    this.platform3.yPos = 565;
    this.platform4 = new PhysicsSprite("platform2", "death/deathplatform.png");
    this.platform4.setSize(1024,56);
    this.platform4.yPos= 565;
    this.platform4.xPos = 1200;

    this.platform5 = new PhysicsSprite("platform5", "death/deathplatform0.png");
    this.platform5.setSize(508, 64);
    this.platform5.xPos = 750;
    this.platform5.yPos = 400;

    this.platform6 = new PhysicsSprite("platform6", "death/deathplatform1.png");
    this.platform6.setSize(128, 64);
    this.platform6.xPos = 200;
    this.platform6.yPos = 300;

    this.platform7 = new PhysicsSprite("platform6", "death/deathplatform1.png");
    this.platform7.setSize(128, 64);
    this.platform7.xPos = 1300;
    this.platform7.yPos = 300;
    //
    this.attackRect= new PhysicsSprite("", "");
    this.attackRect.setSize(150,30);


    this.player.setSize(50,100);
    this.player.xPos = 1300;
    this.player.yPos = 500;

    this.death.setSize(150, 200);
    this.death.xPos = 400;
    this.death.yPos = 200;

    this.drawAll.addChild(this.platform1);
    this.drawAll.addChild(this.platform2);
    this.drawAll.addChild(this.platform3);
    this.drawAll.addChild(this.platform4);
    this.drawAll.addChild(this.platform5);
    this.drawAll.addChild(this.platform6);
    this.drawAll.addChild(this.platform7);
    this.drawAll.addChild(this.player);
    this.drawAll.addChild(this.death);

    this.gamClock = new GameClock();
    this.invincibility = new GameClock();
    this.bossInvinc = new GameClock();
    this.damaged = false;
    this.jumping = false;
    this.end = false;
    this.done = false;

    this.yend = 510;
    this.platformCollisions = new ArrayList();
    this.platformCollisions.add(this.platform3);
    this.platformCollisions.add(this.platform4);
    this.platformCollisions.add(this.platform5);
    this.platformCollisions.add(this.platform6);
    this.platformCollisions.add(this.platform7);
    this.platformColliding = false;

    this.health = 30;
    this.attacking = false;
    this.bossDamaged = false;

    //Boss AI
    this.bossCounter = 0;
    this.deathMoves = new ArrayList();
    this.deathMoves.add("1"); //0
    this.deathMoves.add("2"); //1
    this.deathMoves.add("3");
    this.deathMoves.add("4");

    this.attackCounter = 0;

    this.left = true;

    this.doOnce = false;

    this.attackPressed = false;
    this.frameCount = 0;
    this.bossAttackCounter = 0;

    //Animations
    this.deathAttack1.setSize(60,60);
    this.deathAttack1.frames.add("death/deathattack0.png");
    this.deathAttack1.frames.add("death/deathattack1.png");
    this.deathAttack1.frames.add("death/deathattack2.png");
    this.deathAttack1.frames.add("death/deathattack3.png");

    this.deathAttack1.setStartIndex(0);
    this.deathAttack1.setEndIndex(3);

    this.death.frames.add("death/death0.png");
    this.death.frames.add("death/death1.png");
    this.death.frames.add("death/death2.png");
    this.death.frames.add("death/death3.png");
    this.death.frames.add("death/death4.png");

    this.death.setStartIndex(0);
    this.death.setEndIndex(4);

    this.death.counterEnd = 8;



  }

  update(pressedKeys, gamepads){
    super.update();
    this.drawAll.update();
    this.bossAttackCounter++;



    this.player.playing = false;
    this.platformColliding = false;
    this.attacking = false;
    this.deathAttack1.playing = false;
    if(this.done == false){
      this.player.tcurrent = this.gamClock.getElapsedTime();
      this.player.tchang = this.player.tcurrent - this.player.tprev;
      this.player.tprev = this.player.tcurrent;
      this.death.tcurrent = this.gamClock.getElapsedTime();
      this.death.tchang = this.death.tcurrent - this.death.tprev;
      this.death.tprev = this.death.tcurrent;
      this.deathAttack1.tcurrent = this.gamClock.getElapsedTime();
      this.deathAttack1.tchang = this.deathAttack1.tcurrent - this.deathAttack1.tprev;
      this.deathAttack1.tprev = this.deathAttack1.tcurrent;

      if(pressedKeys.contains(37)){
        this.player.xPos -= 8;
        this.player.scaleX = 1;
        this.left = true;
        // this.player.setAnimation("walk", "player");
        // this.player.playAni();
      }
      if(pressedKeys.contains(39)){
        this.player.xPos += 8;
        this.player.scaleX = -1;
        this.left =false;
        // this.player.setAnimation("walk", "player");
        // this.player.playAni();

      }
      if(pressedKeys.contains(88)){
        // this.jumpSound.playSound();
        if(this.jumping == false){
          this.player.yPos -= 12;
          // this.deathAttack1.yvelo -=500;
        }
        // this.deathAttack1.setAnimation("jump", "deathAttack1");
        // if(this.deathAttack1.currentFrame < 2){
        //   this.deathAttack1.currentFrame = this.deathAttack1.startIndex;
        //
        // }
        // this.deathAttack1.playAni();
      }
      else{
        this.jumping = true;
      }

      if(pressedKeys.contains(90)){
        this.attacking = true;

        if(this.attackPressed == false){
          this.attackPressed = true;
          this.player.setImage("death/grant/whip2.png");
          this.drawAll.addChild(this.attackRect);
          this.player.setSize(175,100);
        }
      }
      else{
        this.drawAll.removeChildObj(this.attackRect);
        this.player.setImage("death/grant/grant0.png");
        this.player.setSize(50,100);
        this.attackPressed = false;
      }
      if(this.left){
        this.attackRect.xPos = this.player.xPos - this.player.pivX + 20;
        this.attackRect.yPos = this.player.yPos - 20;
      }
      else{
        this.attackRect.xPos = this.player.xPos + this.player.pivX - 20;
        this.attackRect.yPos = this.player.yPos - 20;
      }



      if(pressedKeys.contains(40)){
        this.player.setImage("death/grant/grant3.png");
        this.player.setSize(50,50);
      }

      if(this.player.xPos <= 0 + this.player.pivX){
        this.player.xPos = 0 + this.player.pivX;
      }
      if(this.player.xPos >= 1500  - this.player.pivX){
        this.player.xPos = 1500  - this.player.pivX;
      }


      this.player.computeVeloY();
      this.player.computePosY();

      if(this.player.yPos >= this.yend){
        this.player.yPos = this.yend + 8;
        this.player.yvelo = 0;
        this.player.yacel = 0;
        this.jumping = false;
      }
      else{
        this.player.yacel +=40;
      }

      if(this.player.collidesWith(this.platform3)){
        this.platformColliding = true;
        this.yend = this.platform3.yPos -this.platform3.pivY - this.player.pivY;
      }
      if(this.player.collidesWith(this.platform4)){
        this.platformColliding = true;
        this.yend = this.platform4.yPos -this.platform4.pivY - this.player.pivY;
      }
      if(this.player.collidesWith(this.platform5)){
        this.platformColliding = true;
        this.yend = this.platform5.yPos -this.platform5.pivY - this.player.pivY;
      }
      if(this.player.collidesWith(this.platform6)){
        this.platformColliding = true;
        this.yend = this.platform6.yPos -this.platform6.pivY - this.player.pivY;
      }
      if(this.player.collidesWith(this.platform7)){
        this.platformColliding = true;
        this.yend = this.platform7.yPos -this.platform7.pivY - this.player.pivY;
      }
      if(this.platformColliding == false){
        this.yend = 510;
      }
      this.bossCounter++;

      this.frameCount++;
      if(this.frameCount < 300){
        if(this.bossCounter >= 5){
          this.bossCounter = 0;
          var x = Math.floor(Math.random() * Math.floor(this.deathMoves.size()));
          switch(this.deathMoves.get(x)){
            case "1":
                // this.death.xvelo =0;
                this.death.xvelo =-200;
              break;
            case "2":
                // this.death.xvelo =0;
                this.death.xvelo =200;
              break;
            case "3":
                this.death.yvelo =-200;
              break;
            case "4":
                this.death.yvelo =200;
              break;
          }
        }
      }

      if(this.frameCount >= 300 && this.frameCount < 420){
        if (this.death.xPos <= this.player.xPos && this.death.yPos <= this.player.yPos){
          this.death.xvelo = 200;
          this.death.yvelo = 200;
        }
        if (this.death.xPos <= this.player.xPos && this.death.yPos >= this.player.yPos){
          this.death.xvelo = 200;
          this.death.yvelo = -200;
        }
        if (this.death.xPos >= this.player.xPos && this.death.yPos <= this.player.yPos){
          this.death.xvelo = -200;
          this.death.yvelo = 200;
        }
        if (this.death.xPos >= this.player.xPos && this.death.yPos >= this.player.yPos){
          this.death.xvelo = -200;
          this.death.yvelo = -200;
        }
      }
      if(this.frameCount >= 480){
        this.frameCount = 0;
        this.death.xvelo =0;
        this.death.yvelo = 0;
      }

      if(this.bossAttackCounter >= 60){
        this.deathAttack1.visible = true;
        this.drawAll.addChild(this.deathAttack1);
        if (this.deathAttack1.xPos <= this.player.xPos && this.deathAttack1.yPos <= this.player.yPos){
          this.deathAttack1.xvelo = 200;
          this.deathAttack1.yvelo = 200;
        }
        if (this.deathAttack1.xPos <= this.player.xPos && this.deathAttack1.yPos >= this.player.yPos){
          this.deathAttack1.xvelo = 200;
          this.deathAttack1.yvelo = -200;
        }
        if (this.deathAttack1.xPos >= this.player.xPos && this.deathAttack1.yPos <= this.player.yPos){
          this.deathAttack1.xvelo = -200;
          this.deathAttack1.yvelo = 200;
        }
        if (this.deathAttack1.xPos >= this.player.xPos && this.deathAttack1.yPos >= this.player.yPos){
          this.deathAttack1.xvelo = -200;
          this.deathAttack1.yvelo = -200;
        }
      }
      if(this.bossAttackCounter >= 180){
        this.deathAttack1.visible = false;
        this.bossAttackCounter = 0;
        if(this.drawAll.listObjects.contains(this.deathAttack1)){
          this.drawAll.removeChildObj(this.deathAttack1);
        }
      }

      this.death.computeVeloX();
      this.death.computePosX();
      this.death.computeVeloY();
      this.death.computePosY();

      this.deathAttack1.computeVeloX();
      this.deathAttack1.computePosX();
      this.deathAttack1.computeVeloY();
      this.deathAttack1.computePosY();

      if(this.death.xPos >= 1500 - this.death.pivX){
        this.death.xPos = 1500 - this.death.pivX;
      }

      if(this.death.xPos <= 0 + this.death.pivX){
        this.death.xPos = 0 + this.death.pivX;
      }
      if(this.death.yPos >= 550 - this.death.pivY){
        this.death.yPos = 550 - this.death.pivY;
      }

      if(this.death.yPos <= 0 + this.death.pivY){
        this.death.yPos = 0 + this.death.pivY;
      }





  }



    if(this.health <=0){
      deathComplete = true;
      document.getElementById("health").innerHTML = "";
    }

    if(this.attackRect.collidesWith(this.death) && this.attacking == true && this.bossDamaged == false){
      this.bossInvinc.resetGameClock();
      this.bossDamaged = true;
      this.death.alphaVal = 0.5;
      this.health -=5;
    }
    if(parseInt(this.bossInvinc.getElapsedTime()) == 1 && this.bossDamaged == true){
      this.bossDamaged = false;
      this.death.alphaVal = 1;

    }
    if(this.player.collidesWith(this.death) && this.damaged == false && this.attacking == false){
      this.invincibility.resetGameClock();
      this.damaged = true;
      this.player.alphaVal = 0.5;
      playerHealth--;
    }

    if(this.player.collidesWith(this.deathAttack1) && this.damaged == false && this.attacking == false && this.deathAttack1.visible == true){
      this.invincibility.resetGameClock();
      this.damaged = true;
      this.player.alphaVal = 0.5;
      playerHealth--;
    }

    if(parseInt(this.invincibility.getElapsedTime()) == 1 && this.damaged == true){
      this.damaged = false;
      this.player.alphaVal = 1;

    }

    if((this.attackRect.collidesWith(this.deathAttack1) || this.player.collidesWith(this.deathAttack1)) && this.attacking == true){
      this.bossAttackCounter = 180;
    }

    if(winCounter >= 3 && this.doOnce == false){
      this.doOnce = true
      this.health -= 15;
    }

    if(pressedKeys.contains(48)){
      deathComplete = true;
      document.getElementById("health").innerHTML = "";
    }

    this.deathAttack1.counter++;
    if(this.deathAttack1.counter >= this.deathAttack1.counterEnd){
      this.deathAttack1.counter = 0;
      this.deathAttack1.setImage(this.deathAttack1.frames.get(this.deathAttack1.currentFrame));
      this.deathAttack1.currentFrame++;

      if(this.deathAttack1.currentFrame > this.deathAttack1.endIndex){
        this.deathAttack1.currentFrame = this.deathAttack1.startIndex;
      }
    }

    this.death.counter++;
    if(this.death.counter >= this.death.counterEnd){
      this.death.counter = 0;
      this.death.setImage(this.death.frames.get(this.death.currentFrame));
      this.death.currentFrame++;

      if(this.death.currentFrame > this.death.endIndex){
        this.death.currentFrame = this.death.startIndex;
      }
    }
  }

  draw(g){
    super.draw(g);
    this.drawAll.draw(g);
    document.getElementById("health").innerHTML = "Death Health Left: " + this.health;
  }

  resetAllClocks(){
    this.gamClock.resetGameClock();
    this.invincibility.resetGameClock();
    this.bossInvinc.resetGameClock();
  }
}
