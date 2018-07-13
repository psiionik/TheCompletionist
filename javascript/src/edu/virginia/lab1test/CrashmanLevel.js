"use strict";

var crashmanComplete = false;
var crashmanLoad = false;

class CrashmanLevel extends DisplayObjectContainer{

  constructor(id, filename){
    super(id, filename);
    this.back = new Sprite("back", "crashmanbackground.png");
    this.drawAll2 = new DisplayObjectContainer("drawall2", "");
    this.megaman = new PlayerSprite("megaman", "megaman0.png");
    this.crashman = new PlayerSprite("crashman", "crashman0.png");
    this.bomb = new PhysicsSprite("bomb", "crashmanbomb0.png");
    this.explosion = new PhysicsSprite("explosion", "crashmanexplosion.png");
    this.pellet1 = new PhysicsSprite("pellet", "megamanattackpellet.png");
    this.pellet2 = new PhysicsSprite("pellet", "megamanattackpellet.png");
    this.pellet3 = new PhysicsSprite("pellet", "megamanattackpellet.png");
    this.platform1 = new Sprite("platform1", "crashmanplat.png");
    this.platform1repeat1 = new Sprite("repeat", "crashmanplat.png");
    this.platform1repeat2 = new Sprite("repeat", "crashmanplat.png");
    this.platform1repeat3 = new Sprite("repeat", "crashmanplat.png");
    this.bomb2 = new PhysicsSprite("bomb", "crashmanbomb0.png");
    this.bomb3 = new PhysicsSprite("bomb", "crashmanbomb0.png");
    this.explosion2 = new PhysicsSprite("explosion", "crashmanexplosion.png");
    this.explosion3 = new PhysicsSprite("explosion", "crashmanexplosion.png");



    this.back.setSize(1500,700)
    this.platform1.setSize(498, 84);
    this.platform1repeat1.setSize(498, 84);
    this.platform1repeat2.setSize(498, 84);
    this.platform1repeat3.setSize(498, 84);
    this.pellet1.setSize(25,25);
    this.pellet2.setSize(25,25);
    this.pellet3.setSize(25,25);
    this.bomb.setSize(25,25);
    this.bomb2.setSize(25,25);
    this.bomb3.setSize(25,25);
    this.explosion.setSize(75,75);
    this.explosion2.setSize(75,75);
    this.explosion3.setSize(75,75);

    this.back.xPos = 750;
    this.back.yPos = 300;

    this.drawAll2.addChild(this.back);
    this.drawAll2.addChild(this.platform1);
    this.drawAll2.addChild(this.platform1repeat1);
    this.drawAll2.addChild(this.platform1repeat2);
    this.drawAll2.addChild(this.platform1repeat3);

    this.drawAll2.addChild(this.megaman);
    this.drawAll2.addChild(this.pellet1);
    this.drawAll2.addChild(this.pellet2);
    this.drawAll2.addChild(this.pellet3);
    this.drawAll2.addChild(this.crashman);




    this.pellet1.visible = false;
    this.pellet2.visible = false;
    this.pellet3.visible = false;

    this.megaman.xPos = 200;
    this.megaman.yPos = 500;
    this.platform1.yPos = 605;
    this.platform1repeat1.yPos = 605;
    this.platform1repeat1.xPos = 498;
    this.platform1repeat2.yPos = 605;
    this.platform1repeat2.xPos = 996;
    this.platform1repeat3.yPos = 605;
    this.platform1repeat3.xPos = 1494;
    this.crashman.yPos = 500;
    this.crashman.xPos = 1000;
    // this.pellet.xPos = 200;
    // this.pellet.yPos = 500;


    this.tweens = new TweenJuggler();
    this.pellet1Tween = new Tween(this.pellet1, "linear");
    this.pellet2Tween = new Tween(this.pellet2, "linear");
    this.pellet3Tween = new Tween(this.pellet3, "linear");
    this.crashmanTween = new Tween(this.crashman, "linear");
    this.tweens.addTween(this.pellet1Tween);
    this.tweens.addTween(this.pellet2Tween);
    this.tweens.addTween(this.pellet3Tween);
    this.tweens.addTween(this.crashmanTween);


    this.yend = 520;
    this.attackCounter = 0;
    this.megamanFlip = false;
    this.gamClock = new GameClock();
    this.attackClock = new GameClock();
    this.health = 20;

    this.crashmanMoves = new ArrayList();
    this.crashmanMoves.add("xpos");
    this.crashmanMoves.add("-xpos");
    this.crashmanMoves.add("ypos");
    this.crashmanClock = new GameClock();
    this.fireClock = new GameClock();
    this.attacked = false;

    //Animations
    this.megaman.frames.add("megaman0.png");
    this.megaman.frames.add("/megaman/megamanrun0.png");
    this.megaman.frames.add("/megaman/megamanrun1.png");
    this.megaman.frames.add("/megaman/megamanrun2.png");
    this.megaman.frames.add("/megaman/megamanattack0.png");
    this.megaman.frames.add("/megaman/megamanattack1.png");
    this.megaman.frames.add("/megaman/megamanattack2.png");
    this.megaman.frames.add("/megaman/megamanattack3.png");
    this.megaman.frames.add("/megaman/megamanjump.png");


    this.crashman.frames.add("crashman_0.png");
    this.crashman.frames.add("crashman_1.png");
    this.crashman.frames.add("crashman_2.png");
    this.crashman.frames.add("crashman_3.png");
    this.crashman.frames.add("crashman_4.png");
    this.crashman.frames.add("crashman_5.png");
    this.crashman.frames.add("crashman_6.png");
    this.crashman.frames.add("crashman_7.png");

    this.explosion.frames.add("explosion0.png");
    this.explosion.frames.add("explosion1.png");
    this.explosion.frames.add("explosion2.png");
    this.explosion.frames.add("explosion3.png");
    this.explosion.frames.add("explosion4.png");
    this.explosion.frames.add("explosion5.png");
    this.explosion.frames.add("explosion6.png");
    this.explosion.frames.add("explosion7.png");
    this.explosion.frames.add("explosion8.png");
    this.explosion.frames.add("explosion9.png");
    this.explosion.frames.add("explosion10.png");
    this.explosion.frames.add("explosion11.png");
    this.explosion.frames.add("explosion12.png");

    this.explosion2.frames.add("explosion0.png");
    this.explosion2.frames.add("explosion1.png");
    this.explosion2.frames.add("explosion2.png");
    this.explosion2.frames.add("explosion3.png");
    this.explosion2.frames.add("explosion4.png");
    this.explosion2.frames.add("explosion5.png");
    this.explosion2.frames.add("explosion6.png");
    this.explosion2.frames.add("explosion7.png");
    this.explosion2.frames.add("explosion8.png");
    this.explosion2.frames.add("explosion9.png");
    this.explosion2.frames.add("explosion10.png");
    this.explosion2.frames.add("explosion11.png");
    this.explosion2.frames.add("explosion12.png");

    this.explosion3.frames.add("explosion0.png");
    this.explosion3.frames.add("explosion1.png");
    this.explosion3.frames.add("explosion2.png");
    this.explosion3.frames.add("explosion3.png");
    this.explosion3.frames.add("explosion4.png");
    this.explosion3.frames.add("explosion5.png");
    this.explosion3.frames.add("explosion6.png");
    this.explosion3.frames.add("explosion7.png");
    this.explosion3.frames.add("explosion8.png");
    this.explosion3.frames.add("explosion9.png");
    this.explosion3.frames.add("explosion10.png");
    this.explosion3.frames.add("explosion11.png");
    this.explosion3.frames.add("explosion12.png");

    this.invincibility = new GameClock();

    this.damaged = false;
    this.jumping = false;
    this.both = false;

    //Sounds
    this.megamanShootSound = new Sound("shooting sound", "resources/megamansounds/megamanshoot.mp3");
    this.explosionSound = new Sound("explosion sound", "resources/megamansounds/megamanbombexplosion.mp3");

    this.doOnce = false;

}
    update(pressedKeys, gamepads){
      super.update();
      this.drawAll2.update();
      this.tweens.nextFrame();
      this.megaman.playing = false;
      this.explosion.playing = false;
      this.explosion2.playing = false;
      this.explosion3.playing = false;
      this.crashman.playing = false;
      if(winCounter >= 3){
        this.megaman.tcurrent = this.gamClock.getElapsedTime();
        this.megaman.tchang = this.megaman.tcurrent - this.megaman.tprev;
        this.megaman.tprev = this.megaman.tcurrent;
        this.crashman.tcurrent = this.gamClock.getElapsedTime();
        this.crashman.tchang = this.crashman.tcurrent - this.crashman.tprev;
        this.crashman.tprev = this.crashman.tcurrent;

        this.bomb.tcurrent = this.gamClock.getElapsedTime();
        this.bomb.tchang = this.bomb.tcurrent - this.bomb.tprev;
        this.bomb.tprev = this.bomb.tcurrent;

        this.bomb2.tcurrent = this.gamClock.getElapsedTime();
        this.bomb2.tchang = this.bomb2.tcurrent - this.bomb2.tprev;
        this.bomb2.tprev = this.bomb2.tcurrent;

        this.bomb3.tcurrent = this.gamClock.getElapsedTime();
        this.bomb3.tchang = this.bomb3.tcurrent - this.bomb3.tprev;
        this.bomb3.tprev = this.bomb3.tcurrent;
        if(pressedKeys.contains(37)){
          this.megaman.xPos -= 8;
          this.megamanFlip = true;
          this.megaman.scaleX = 1;
          if (this.both == false){
            if(this.megaman.currentFrame <= 1 || this.megaman.currentFrame >= 3){
              this.megaman.currentFrame = 1
            }
            this.megaman.setAnimation("walk", "megaman");
            this.megaman.playAni();
          }
        }
        if(pressedKeys.contains(39)){
          this.megaman.xPos += 8;
          this.megamanFlip = false;
          this.megaman.scaleX = -1;
          if (this.both == false){
            if(this.megaman.currentFrame <= 1 || this.megaman.currentFrame >= 3){
              this.megaman.currentFrame = 1
            }
            this.megaman.setAnimation("walk", "megaman");
            this.megaman.playAni();
          }
        }
        if(pressedKeys.contains(88)){
          if(this.jumping == false){
            this.megaman.yPos -=8;
          }
          if(this.megaman.currentFrame < 8){
            this.megaman.currentFrame = 8;
          }
          this.megaman.setAnimation("jump", "megaman");
          this.megaman.playAni();
        }
        else{
          this.jumping = true;
        }


        if(pressedKeys.contains(90)){
          this.attackCounter++;
          if (this.megaman.currentFrame != 4){
            this.megaman.currentFrame = 4;
          }
          if(this.both == false){
            this.megaman.setAnimation("attack", "megaman");
            this.megaman.playAni();
          }
          if(this.attackCounter == 1){
            this.megamanShootSound.playSound();
            this.drawAll2.addChild(this.pellet1);
            this.pellet1.visible = false;
            this.pellet1.xPos = this.megaman.xPos;
            this.pellet1.yPos = this.megaman.yPos;
            if(this.megamanFlip == false){
              this.pellet1Tween.animateTween("xpos", this.pellet1.xPos, this.pellet1.xPos + 300, .5);
              this.pellet1.visible = true;

            }
            else{
              this.pellet1Tween.animateTween("xpos", this.pellet1.xPos, this.pellet1.xPos - 300, .5);
              this.pellet1.visible = true;

            }
          }
          if(this.attackCounter == 10){
            this.megamanShootSound.playSound();
            this.drawAll2.addChild(this.pellet2);
            this.pellet2.visible = false;

            this.pellet2.xPos = this.megaman.xPos;
            this.pellet2.yPos = this.megaman.yPos;
            if(this.megamanFlip == false){
              this.pellet2Tween.animateTween("xpos", this.pellet2.xPos, this.pellet2.xPos + 300, .5);
              this.pellet2.visible = true;

            }
            else{
              this.pellet2Tween.animateTween("xpos", this.pellet2.xPos, this.pellet2.xPos - 300, .5);
              this.pellet2.visible = true;

            }
          }
          if(this.attackCounter == 20){
            this.megamanShootSound.playSound();
            this.drawAll2.addChild(this.pellet3);
            this.pellet3.visible = false;


            this.pellet3.xPos = this.megaman.xPos;
            this.pellet3.yPos = this.megaman.yPos;
            if(this.megamanFlip == false){
              this.pellet3Tween.animateTween("xpos", this.pellet3.xPos, this.pellet3.xPos + 300, .5);
              this.pellet3.visible = true;

            }
            else{
              this.pellet3Tween.animateTween("xpos", this.pellet3.xPos, this.pellet3.xPos - 300, .5);
              this.pellet3.visible = true;

            }
          }
          if(this.attackCounter >40){
            this.attackCounter = 0;
          }

          this.tweens.addTween(this.pellet1Tween);
          this.tweens.addTween(this.pellet2Tween);
          this.tweens.addTween(this.pellet3Tween);
        }

        // if(pressedKeys.contains(90) && pressedKeys.contains(37) || pressedKeys.contains(90) && pressedKeys.contains(39)){
        //   this.both = true;
        // }
        // else{
        //   this.both = false;
        // }
        //
        // if(this.both == true){
        //   if(this.megaman.currentFrame <= 5 || this.megaman.currentFrame >=7){
        //     this.megaman.currentFrame = 5;
        //   }
        //   this.megaman.setAnimation("walkattack", "megaman");
        //   this.megaman.playAni();
        //
        // }



        if(parseInt(this.crashmanClock.getElapsedTime()) == 2){
          this.attacked = true;
          this.crashmanClock.resetGameClock();
          var x = Math.floor(Math.random() * Math.floor(this.crashmanMoves.size()))
          switch(this.crashmanMoves.get(x)){
            case "xpos":
              this.crashman.scaleX = -1;
              this.crashman.xvelo += 300;
              // this.crashmanTween.animateTween("xpos", this.crashman.xPos, this.crashman.xPos + 400, 1);
              this.crashman.yvelo -=400;
              this.drawAll2.addChild(this.bomb);
              this.bomb.xPos = this.crashman.xPos;
              this.bomb.yPos = this.crashman.yPos -100;

              this.drawAll2.addChild(this.bomb2);
              this.bomb2.xPos = this.crashman.xPos;
              this.bomb2.yPos = this.crashman.yPos -100;

              this.drawAll2.addChild(this.bomb3);
              this.bomb3.xPos = this.crashman.xPos;
              this.bomb3.yPos = this.crashman.yPos -100;
              if(this.crashman.xPos < this.megaman.xPos){
                this.bomb.xvelo += 50;
                this.bomb.yvelo += 200;

                this.bomb2.xvelo += 200;
                this.bomb2.yvelo += 200;

                this.bomb3.xvelo += 350;
                this.bomb3.yvelo += 200;

              }
              else{
                this.bomb.xvelo -= 50;
                this.bomb.yvelo += 200;

                this.bomb2.xvelo -= 200;
                this.bomb2.yvelo += 200;

                this.bomb3.xvelo -= 350;
                this.bomb3.yvelo += 200;
              }
              // this.crashmanTween.animateTween("ypos", this.crashman.yPos, this.crashman.yPos - 200, 1);
              break;
            case "-xpos":
              this.crashman.scaleX = 1;
              this.crashman.xvelo -= 300;
              // this.crashmanTween.animateTween("xpos", this.crashman.xPos, this.crashman.xPos - 400, 1);
              this.crashman.yvelo -=400;
              this.drawAll2.addChild(this.bomb);
              this.bomb.xPos = this.crashman.xPos;
              this.bomb.yPos = this.crashman.yPos -100;

              this.drawAll2.addChild(this.bomb2);
              this.bomb2.xPos = this.crashman.xPos;
              this.bomb2.yPos = this.crashman.yPos -100;

              this.drawAll2.addChild(this.bomb3);
              this.bomb3.xPos = this.crashman.xPos;
              this.bomb3.yPos = this.crashman.yPos -100;
              if(this.crashman.xPos < this.megaman.xPos){
                this.bomb.xvelo += 50;
                this.bomb.yvelo += 200;

                this.bomb2.xvelo += 200;
                this.bomb2.yvelo += 200;

                this.bomb3.xvelo += 350;
                this.bomb3.yvelo += 200;
              }
              else{
                this.bomb.xvelo -= 50;
                this.bomb.yvelo += 200;

                this.bomb2.xvelo -= 200;
                this.bomb2.yvelo += 200;

                this.bomb3.xvelo -= 350;
                this.bomb3.yvelo += 200;
              }
              // this.crashmanTween.animateTween("ypos", this.crashman.yPos, this.crashman.yPos - 200, 1);
              break;
            case "-ypos":
              this.crashman.yvelo -=400;
              this.drawAll2.addChild(this.bomb);
              this.bomb.xPos = this.crashman.xPos;
              this.bomb.yPos = this.crashman.yPos -100;

              this.drawAll2.addChild(this.bomb2);
              this.bomb2.xPos = this.crashman.xPos;
              this.bomb2.yPos = this.crashman.yPos -100;

              this.drawAll2.addChild(this.bomb3);
              this.bomb3.xPos = this.crashman.xPos;
              this.bomb3.yPos = this.crashman.yPos -100;
              if(this.crashman.xPos < this.megaman.xPos){
                this.bomb.xvelo += 0;
                this.bomb.yvelo += 200;

                this.bomb2.xvelo += 150;
                this.bomb2.yvelo += 200;

                this.bomb3.xvelo += 300;
                this.bomb3.yvelo += 200;

              }
              else{
                this.bomb.xvelo -= 0;
                this.bomb.yvelo += 200;

                this.bomb2.xvelo -= 150;
                this.bomb2.yvelo += 200;

                this.bomb3.xvelo -= 300;
                this.bomb3.yvelo += 200;
              }
              break;
          }
          // this.tweens.addTween(this.crashmanTween);

        }

        this.megaman.computeVeloY();
        this.megaman.computePosY();

        this.crashman.computeVeloX();
        this.crashman.computePosX();
        this.crashman.computeVeloY();
        this.crashman.computePosY();

        this.bomb.computeVeloX();
        this.bomb.computePosX();
        this.bomb.computeVeloY();
        this.bomb.computePosY();

        this.bomb2.computeVeloX();
        this.bomb2.computePosX();
        this.bomb2.computeVeloY();
        this.bomb2.computePosY();

        this.bomb3.computeVeloX();
        this.bomb3.computePosX();
        this.bomb3.computeVeloY();
        this.bomb3.computePosY();

        if(this.megaman.xPos <= 0 + this.megaman.pivX){
          this.megaman.xPos = 0 + this.megaman.pivX;
        }
        if(this.megaman.xPos >= 1500  - this.megaman.pivX){
          this.megaman.xPos = 1500  - this.megaman.pivX;
        }

        if(this.megaman.yPos >= this.yend){
          this.megaman.yPos = this.yend;
          this.megaman.yvelo = 0;
          this.megaman.yacel = 0;
          this.jumping = false;
        }
        else{
          this.megaman.yacel +=40;
        }

        if(this.crashman.xPos >= 1500 - this.crashman.pivX){
          this.crashman.xPos = 1500 - this.crashman.pivX;
        }

        if(this.crashman.xPos <= 0 + this.crashman.pivX){
          this.crashman.xPos = 0 + this.crashman.pivX;
        }

        if(this.crashman.yPos >= this.yend){
          this.crashman.xvelo = 0;
          this.crashman.yPos = this.yend;
          this.crashman.yvelo = 0;
          this.crashman.yacel = 0;
        }
        else{
          this.crashman.yvelo += 10;
        }

        if(this.bomb.yPos >= this.yend){
          this.explosion.xPos = this.bomb.xPos;
          this.explosion.yPos = this.bomb.yPos;
          this.bomb.xPos = 0;
          this.bomb.yPos = 0;
          this.bomb.xvelo = 0;
          this.bomb.yvelo = 0;
          if(this.drawAll2.listObjects.contains(this.bomb)){
            this.drawAll2.removeChildObj(this.bomb);
          }
          this.drawAll2.addChild(this.explosion);
          this.explosion.currentFrame = 0;
          this.explosion.setAnimation("", "explosion");

          this.explosionSound.playSound();
          this.fireClock.resetGameClock();
        }
        if(this.attacked == true && this.fireClock.getElapsedTime() >= .75){
          this.drawAll2.removeChildObj(this.explosion);
        }

        if(this.bomb2.yPos >= this.yend){
          this.explosion2.xPos = this.bomb2.xPos;
          this.explosion2.yPos = this.bomb2.yPos;
          this.bomb2.xPos = 0;
          this.bomb2.yPos = 0;
          this.bomb2.xvelo = 0;
          this.bomb2.yvelo = 0;
          if(this.drawAll2.listObjects.contains(this.bomb2)){
            this.drawAll2.removeChildObj(this.bomb2);
          }
          this.drawAll2.addChild(this.explosion2);
          this.explosion2.currentFrame = 0;
          this.explosion2.setAnimation("", "explosion");

          this.explosionSound.playSound();
          this.fireClock.resetGameClock();
        }
        if(this.attacked == true && this.fireClock.getElapsedTime() >= .75){
          this.drawAll2.removeChildObj(this.explosion2);
        }

        if(this.bomb3.yPos >= this.yend){
          this.explosion3.xPos = this.bomb3.xPos;
          this.explosion3.yPos = this.bomb3.yPos;
          this.bomb3.xPos = 0;
          this.bomb3.yPos = 0;
          this.bomb3.xvelo = 0;
          this.bomb3.yvelo = 0;
          if(this.drawAll2.listObjects.contains(this.bomb3)){
            this.drawAll2.removeChildObj(this.bomb3);
          }
          this.drawAll2.addChild(this.explosion3);
          this.explosion3.currentFrame = 0;
          this.explosion3.setAnimation("", "explosion");

          this.explosionSound.playSound();
          this.fireClock.resetGameClock();
        }
        if(this.attacked == true && this.fireClock.getElapsedTime() >= .75){
          this.drawAll2.removeChildObj(this.explosion3);
        }


        if(this.pellet1Tween.isComplete()){
          this.drawAll2.removeChildObj(this.pellet1);
        }
        if(this.pellet2Tween.isComplete()){
          this.drawAll2.removeChildObj(this.pellet2);
        }
        if(this.pellet3Tween.isComplete()){
          this.drawAll2.removeChildObj(this.pellet3);
        }
        if(this.drawAll2.listObjects.contains(this.explosion)){
          if(this.megaman.collidesWith(this.explosion) && this.damaged == false){
            this.damaged = true;
            this.invincibility.resetGameClock();
            this.megaman.alphaVal = 0.5;
            playerHealth--;
          }
        }
        if(this.drawAll2.listObjects.contains(this.bomb)){
          if(this.megaman.collidesWith(this.bomb) && this.damaged == false){
            this.damaged = true;
            this.invincibility.resetGameClock();
            this.megaman.alphaVal = 0.5;
            playerHealth--;
          }
        }

        if(this.drawAll2.listObjects.contains(this.explosion2)){
          if(this.megaman.collidesWith(this.explosion2) && this.damaged == false){
            this.damaged = true;
            this.invincibility.resetGameClock();
            this.megaman.alphaVal = 0.5;
            playerHealth--;
          }
        }
        if(this.drawAll2.listObjects.contains(this.bomb2)){
          if(this.megaman.collidesWith(this.bomb2) && this.damaged == false){
            this.damaged = true;
            this.invincibility.resetGameClock();
            this.megaman.alphaVal = 0.5;
            playerHealth--;
          }
        }

        if(this.drawAll2.listObjects.contains(this.explosion3)){
          if(this.megaman.collidesWith(this.explosion3) && this.damaged == false){
            this.damaged = true;
            this.invincibility.resetGameClock();
            this.megaman.alphaVal = 0.5;
            playerHealth--;
          }
        }
        if(this.drawAll2.listObjects.contains(this.bomb3)){
          if(this.megaman.collidesWith(this.bomb3) && this.damaged == false){
            this.damaged = true;
            this.invincibility.resetGameClock();
            this.megaman.alphaVal = 0.5;
            playerHealth--;
          }
        }
        if(this.drawAll2.listObjects.contains(this.crashman)){
          if(this.megaman.collidesWith(this.crashman) && this.damaged == false){
            this.damaged = true;
            this.invincibility.resetGameClock();
            this.megaman.alphaVal = 0.5;
            playerHealth--;
          }
        }

        if(parseInt(this.invincibility.getElapsedTime()) == 1 && this.damaged == true){
          this.damaged = false;
          this.megaman.alphaVal = 1;

        }
      }
      else{


      this.megaman.tcurrent = this.gamClock.getElapsedTime();
      this.megaman.tchang = this.megaman.tcurrent - this.megaman.tprev;
      this.megaman.tprev = this.megaman.tcurrent;
      this.crashman.tcurrent = this.gamClock.getElapsedTime();
      this.crashman.tchang = this.crashman.tcurrent - this.crashman.tprev;
      this.crashman.tprev = this.crashman.tcurrent;
      this.bomb.tcurrent = this.gamClock.getElapsedTime();
      this.bomb.tchang = this.bomb.tcurrent - this.bomb.tprev;
      this.bomb.tprev = this.bomb.tcurrent;
      if(pressedKeys.contains(37)){
        this.megaman.xPos -= 8;
        this.megamanFlip = true;
        this.megaman.scaleX = 1;
        if (this.both == false){
          if(this.megaman.currentFrame <= 1 || this.megaman.currentFrame >= 3){
            this.megaman.currentFrame = 1
          }
          this.megaman.setAnimation("walk", "megaman");
          this.megaman.playAni();
        }
      }
      if(pressedKeys.contains(39)){
        this.megaman.xPos += 8;
        this.megamanFlip = false;
        this.megaman.scaleX = -1;
        if (this.both == false){
          if(this.megaman.currentFrame <= 1 || this.megaman.currentFrame >= 3){
            this.megaman.currentFrame = 1
          }
          this.megaman.setAnimation("walk", "megaman");
          this.megaman.playAni();
        }
      }
      if(pressedKeys.contains(88)){
        if(this.jumping == false){
          this.megaman.yPos -=8;
        }
        if(this.megaman.currentFrame < 8){
          this.megaman.currentFrame = 8;
        }
        this.megaman.setAnimation("jump", "megaman");
        this.megaman.playAni();
      }
      else{
        this.jumping = true;
      }


      if(pressedKeys.contains(90)){
        this.attackCounter++;
        if (this.megaman.currentFrame != 4){
          this.megaman.currentFrame = 4;
        }
        if(this.both == false){
          this.megaman.setAnimation("attack", "megaman");
          this.megaman.playAni();
        }
        if(this.attackCounter == 1){
          this.megamanShootSound.playSound();
          this.drawAll2.addChild(this.pellet1);
          this.pellet1.visible = false;
          this.pellet1.xPos = this.megaman.xPos;
          this.pellet1.yPos = this.megaman.yPos;
          if(this.megamanFlip == false){
            this.pellet1Tween.animateTween("xpos", this.pellet1.xPos, this.pellet1.xPos + 300, .5);
            this.pellet1.visible = true;

          }
          else{
            this.pellet1Tween.animateTween("xpos", this.pellet1.xPos, this.pellet1.xPos - 300, .5);
            this.pellet1.visible = true;

          }
        }
        if(this.attackCounter == 10){
          this.megamanShootSound.playSound();
          this.drawAll2.addChild(this.pellet2);
          this.pellet2.visible = false;

          this.pellet2.xPos = this.megaman.xPos;
          this.pellet2.yPos = this.megaman.yPos;
          if(this.megamanFlip == false){
            this.pellet2Tween.animateTween("xpos", this.pellet2.xPos, this.pellet2.xPos + 300, .5);
            this.pellet2.visible = true;

          }
          else{
            this.pellet2Tween.animateTween("xpos", this.pellet2.xPos, this.pellet2.xPos - 300, .5);
            this.pellet2.visible = true;

          }
        }
        if(this.attackCounter == 20){
          this.megamanShootSound.playSound();
          this.drawAll2.addChild(this.pellet3);
          this.pellet3.visible = false;


          this.pellet3.xPos = this.megaman.xPos;
          this.pellet3.yPos = this.megaman.yPos;
          if(this.megamanFlip == false){
            this.pellet3Tween.animateTween("xpos", this.pellet3.xPos, this.pellet3.xPos + 300, .5);
            this.pellet3.visible = true;

          }
          else{
            this.pellet3Tween.animateTween("xpos", this.pellet3.xPos, this.pellet3.xPos - 300, .5);
            this.pellet3.visible = true;

          }
        }
        if(this.attackCounter >40){
          this.attackCounter = 0;
        }

        this.tweens.addTween(this.pellet1Tween);
        this.tweens.addTween(this.pellet2Tween);
        this.tweens.addTween(this.pellet3Tween);
      }

      // if(pressedKeys.contains(90) && pressedKeys.contains(37) || pressedKeys.contains(90) && pressedKeys.contains(39)){
      //   this.both = true;
      // }
      // else{
      //   this.both = false;
      // }
      //
      // if(this.both == true){
      //   if(this.megaman.currentFrame <= 5 || this.megaman.currentFrame >=7){
      //     this.megaman.currentFrame = 5;
      //   }
      //   this.megaman.setAnimation("walkattack", "megaman");
      //   this.megaman.playAni();
      //
      // }



      if(parseInt(this.crashmanClock.getElapsedTime()) == 2){
        this.attacked = true;
        this.crashmanClock.resetGameClock();
        var x = Math.floor(Math.random() * Math.floor(this.crashmanMoves.size()))
        switch(this.crashmanMoves.get(x)){
          case "xpos":
            this.crashman.scaleX = -1;
            this.crashman.xvelo += 300;
            // this.crashmanTween.animateTween("xpos", this.crashman.xPos, this.crashman.xPos + 400, 1);
            this.crashman.yvelo -=400;
            this.drawAll2.addChild(this.bomb);
            this.bomb.xPos = this.crashman.xPos;
            this.bomb.yPos = this.crashman.yPos -100;
            if(this.crashman.xPos < this.megaman.xPos){
              this.bomb.xvelo += 50;
              this.bomb.yvelo += 200;

            }
            else{
              this.bomb.xvelo -= 50;
              this.bomb.yvelo += 200;
            }
            // this.crashmanTween.animateTween("ypos", this.crashman.yPos, this.crashman.yPos - 200, 1);
            break;
          case "-xpos":
            this.crashman.scaleX = 1;
            this.crashman.xvelo -= 300;
            // this.crashmanTween.animateTween("xpos", this.crashman.xPos, this.crashman.xPos - 400, 1);
            this.crashman.yvelo -=400;
            this.drawAll2.addChild(this.bomb);
            this.bomb.xPos = this.crashman.xPos;
            this.bomb.yPos = this.crashman.yPos -100;
            if(this.crashman.xPos < this.megaman.xPos){
              this.bomb.xvelo += 50;
              this.bomb.yvelo += 200;

            }
            else{
              this.bomb.xvelo -= 50;
              this.bomb.yvelo += 200;
            }
            // this.crashmanTween.animateTween("ypos", this.crashman.yPos, this.crashman.yPos - 200, 1);
            break;
          case "-ypos":
            this.crashman.yvelo -=400;
            this.drawAll2.addChild(this.bomb);
            this.bomb.xPos = this.crashman.xPos;
            this.bomb.yPos = this.crashman.yPos -100;
            if(this.crashman.xPos < this.megaman.xPos){
              this.bomb.xvelo += 50;
              this.bomb.yvelo += 200;

            }
            else{
              this.bomb.xvelo -= 50;
              this.bomb.yvelo += 200;
            }
            break;
        }
        // this.tweens.addTween(this.crashmanTween);

      }

      this.megaman.computeVeloY();
      this.megaman.computePosY();

      this.crashman.computeVeloX();
      this.crashman.computePosX();
      this.crashman.computeVeloY();
      this.crashman.computePosY();

      this.bomb.computeVeloX();
      this.bomb.computePosX();
      this.bomb.computeVeloY();
      this.bomb.computePosY();

      if(this.megaman.xPos <= 0 + this.megaman.pivX){
        this.megaman.xPos = 0 + this.megaman.pivX;
      }
      if(this.megaman.xPos >= 1500  - this.megaman.pivX){
        this.megaman.xPos = 1500  - this.megaman.pivX;
      }

      if(this.megaman.yPos >= this.yend){
        this.megaman.yPos = this.yend;
        this.megaman.yvelo = 0;
        this.megaman.yacel = 0;
        this.jumping = false;
      }
      else{
        this.megaman.yacel +=40;
      }

      if(this.crashman.xPos >= 1500 - this.crashman.pivX){
        this.crashman.xPos = 1500 - this.crashman.pivX;
      }

      if(this.crashman.xPos <= 0 + this.crashman.pivX){
        this.crashman.xPos = 0 + this.crashman.pivX;
      }

      if(this.crashman.yPos >= this.yend){
        this.crashman.xvelo = 0;
        this.crashman.yPos = this.yend;
        this.crashman.yvelo = 0;
        this.crashman.yacel = 0;
      }
      else{
        this.crashman.yvelo += 10;
      }
      if(this.bomb.yPos >= this.yend){
        this.explosion.xPos = this.bomb.xPos;
        this.explosion.yPos = this.bomb.yPos;
        this.bomb.xPos = 0;
        this.bomb.yPos = 0;
        this.bomb.xvelo = 0;
        this.bomb.yvelo = 0;
        if(this.drawAll2.listObjects.contains(this.bomb)){
          this.drawAll2.removeChildObj(this.bomb);
        }
        this.drawAll2.addChild(this.explosion);
        this.explosion.currentFrame = 0;
        this.explosion.setAnimation("", "explosion");

        this.explosionSound.playSound();
        this.fireClock.resetGameClock();
      }
      if(this.attacked == true && this.fireClock.getElapsedTime() >= .75){
        this.drawAll2.removeChildObj(this.explosion);
      }


      if(this.pellet1Tween.isComplete()){
        this.drawAll2.removeChildObj(this.pellet1);
      }
      if(this.pellet2Tween.isComplete()){
        this.drawAll2.removeChildObj(this.pellet2);
      }
      if(this.pellet3Tween.isComplete()){
        this.drawAll2.removeChildObj(this.pellet3);
      }
      if(this.drawAll2.listObjects.contains(this.explosion)){
        if(this.megaman.collidesWith(this.explosion) && this.damaged == false){
          this.damaged = true;
          this.invincibility.resetGameClock();
          this.megaman.alphaVal = 0.5;
          playerHealth--;
        }
      }
      if(this.drawAll2.listObjects.contains(this.bomb)){
        if(this.megaman.collidesWith(this.bomb) && this.damaged == false){
          this.damaged = true;
          this.invincibility.resetGameClock();
          this.megaman.alphaVal = 0.5;
          playerHealth--;
        }
      }
      if(this.drawAll2.listObjects.contains(this.crashman)){
        if(this.megaman.collidesWith(this.crashman) && this.damaged == false){
          this.damaged = true;
          this.invincibility.resetGameClock();
          this.megaman.alphaVal = 0.5;
          playerHealth--;
        }
      }

      if(parseInt(this.invincibility.getElapsedTime()) == 1 && this.damaged == true){
        this.damaged = false;
        this.megaman.alphaVal = 1;

      }
    }

      if(this.megaman.playing){
        this.megaman.counter++;
        if(this.megaman.counter >= this.megaman.counterEnd){
          this.megaman.counter = 0;
          this.megaman.setImage(this.megaman.frames.get(this.megaman.currentFrame));
          this.megaman.currentFrame++;

          if(this.megaman.currentFrame > this.megaman.endIndex){
            this.megaman.currentFrame = this.megaman.startIndex;
          }
        }
      }
      else{
        this.megaman.setImage("megaman0.png");
      }
      // if(this.explosion.playing){
        this.explosion.counter++;
        if(this.explosion.counter >= 3){
          this.explosion.counter = 0;
          this.explosion.setImage(this.explosion.frames.get(this.explosion.currentFrame));
          this.explosion.currentFrame++;

          if(this.explosion.currentFrame > this.explosion.endIndex){
            this.explosion.currentFrame = this.explosion.startIndex;
          }
        }

        this.explosion2.counter++;
        if(this.explosion2.counter >= 3){
          this.explosion2.counter = 0;
          this.explosion2.setImage(this.explosion2.frames.get(this.explosion2.currentFrame));
          this.explosion2.currentFrame++;

          if(this.explosion2.currentFrame > this.explosion2.endIndex){
            this.explosion2.currentFrame = this.explosion2.startIndex;
          }
        }

        this.explosion3.counter++;
        if(this.explosion3.counter >= 3){
          this.explosion3.counter = 0;
          this.explosion3.setImage(this.explosion3.frames.get(this.explosion3.currentFrame));
          this.explosion3.currentFrame++;

          if(this.explosion3.currentFrame > this.explosion3.endIndex){
            this.explosion3.currentFrame = this.explosion3.startIndex;
          }
        }
      // }





      if(this.drawAll2.listObjects.contains(this.pellet1)){
        if(this.pellet1.collidesWith(this.crashman)){
            this.health -= 2;
            this.drawAll2.removeChildObj(this.pellet1);
          }
      }
      if(this.drawAll2.listObjects.contains(this.pellet2)){
        if(this.pellet2.collidesWith(this.crashman)){
            this.health -= 2;
            this.drawAll2.removeChildObj(this.pellet2);
          }
      }
      if(this.drawAll2.listObjects.contains(this.pellet3)){
        if(this.pellet3.collidesWith(this.crashman)){
            this.health -= 2;
            this.drawAll2.removeChildObj(this.pellet3);
          }
      }


      // if(winCounter >=2 && this.doOnce == false){
      //   this.doOnce = true;
      //   this.health -= 10;
      // }

      if(this.health <= 0)
      {
        crashmanComplete = true;
        document.getElementById("health").innerHTML = "";
      }

      if(pressedKeys.contains(48)){
        crashmanComplete = true;
        document.getElementById("health").innerHTML = "";
      }

    }

    draw(g){
      super.draw(g);
      this.drawAll2.draw(g);
      if(crashmanComplete == false){
        document.getElementById("health").innerHTML = "Crashman Health Left: "+ this.health;
      }

    }

    resetAllClocks(){
      this.gamClock.resetGameClock();
      this.attackClock.resetGameClock();
      this.crashmanClock.resetGameClock();
      this.fireClock.resetGameClock();
      this.invincibility.resetGameClock();
    }



}
