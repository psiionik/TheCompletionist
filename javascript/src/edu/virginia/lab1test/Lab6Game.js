"use strict";

var count = 0;
var counter = 0;
var butcount = 0;
var flipper = false;
var sound1 = new Sound("backgroundmusic", "resources/casinoparkmusic.mp3");
var sound2 = new Sound("jumpsound", "resources/jumpsound.mp3");
sound2.sound.loop = false;
var soundmanage = new SoundManager();
soundmanage.addSound(sound1);





// sound1.playSound();

class Lab6Game extends Game{
  constructor(canvas){
		super("Lab Five Game", 1000, 600, canvas);
    this.gam = new DisplayObjectContainer("gam", "");
    this.mario = new PhysicsSprite("Mario", "link_stand.png");
    // this.title = new PhysicsSprite("title", "title.png");
    // this.title.visible = false;
    // this.title.xPos = -50;
    // this.title.yPos = 300;
    this.coin = new AnimatedSprite("Coin", "coin0.png");
    this.congrat = new AnimatedSprite("Congrats", "congra.jpg");
    this.liste = new QuestManager();
    // this.list2 = new QuestManager();
    this.coinQuest = new Event("coinQuest");
    this.coinQuest.quest = "Collected Your First Coin!";
    this.coinQuest.imag = this.congrat;
    // this.keyPress = new Event("space");
    // this.keyPress.quest = "WOW YOU PRESSED DA SPACE BARRRRRRRR!";
    this.mario.addEventListen(this.liste, this.coinQuest.eventType);
    // this.mario.addEventListen(this.liste, this.keyPress.eventType);
    this.mario.xPos = 100;
    this.mario.yPos = 525;
    this.coin.xPos = 800;
    this.coin.yPos = 300;
    this.congrat.visible = false;
    this.congrat.xPos = 0;
    this.congrat.yPos = 0;
    this.congrat.xSize = 1100;
    this.congrat.ySize = 700;
    // this.keyPress.disc = "Now go collect the coin and fufill your destiny!";
    this.clock = new GameClock();
    this.platform1 = new PhysicsSprite("platform1", "platform1.png");
    this.platform1.xPos = 500;
    this.platform1.yPos = 500;
    this.platform1.setSize(200, 50);
    this.platform2 = new PhysicsSprite("platform2", "platform1.png");
    this.platform2.xPos = 800;
    this.platform2.yPos = 375;
    this.platform2.setSize(200, 50);
    this.gam.setSize(1000, 600);
    this.gam.addChild(this.platform1);
    this.gam.addChild(this.platform2);
    this.gam.addChild(this.coin);
    // this.gam.addChild(this.congrat);
    this.collision = new Event("col");
    this.manage = new CollisionManager();
    this.tweenover = new TweenJuggler();

    this.tweenManage = new TweenManager();
    this.mario.addEventListen(this.manage, this.collision.eventType);
    this.mario.setYEnd(550);

    // this.twee = new Tween(this.title, "easeInOutQuart");

    this.marioexistancetween = new Tween(this.mario, "linear");
    this.testani1 = new TweenParam("xpos",this.marioexistancetween.transition);
    this.tweenover.addTween(this.marioexistancetween);
    this.marioexistancetween.animateTween("alpha", 0.5, 0, 2);
    this.marioexistancetween.animateTween("xscale", 0, 1, 2);
    this.marioexistancetween.animateTween("yscale", 0, 1, 2);
    this.tweenFadeEvent = new TweenEvent("end", this.mariotween, this.tweenover);
    // this.tweenExistanceEvent2 = new TweenEvent("existance2", this.mariotween, 0,1,2, "xscale");
    // this.tweenExistanceEvent3 = new TweenEvent("existance3", this.mariotween, 0, 1, 2, "yscale");
    this.mario.addEventListen(this.tweenManage, this.tweenFadeEvent.eventType);
    // this.mario.dispatchEven(this.tweenExistanceEvent, this.coin);
    // obj.removeEventListen(even.eventType, this);
    this.fadeTween = new Tween(this.coin, "easeOutBounce");
    // fadeTween.animateTween("xpos", obj.xPos, 500, 3);
    // fadeTween.animateTween("ypos", obj.yPos, 300, 3);
    // fadeTween.animateTween("xscale", 1, 4, 3);
    // fadeTween.animateTween("yscale", 1, 4, 3);
    // fadeTween.animateTween("alpha", 0, 1, 3);
    this.tweenover.addTween(this.fadeTween);
    // this.tweenover.addTween(this.twee);
    // this.twee.animateTween("xpos", 0, 500, 2);
    this.gam.addChild(this.mario);
    // this.gam.addChild(this.title);


    // this.fadeTween.animateTween("alpha", 1, 0, 3);


	}


	update(pressedKeys, gamepads){

    // this.mario.getGlobalHitBox();
		super.update(pressedKeys);
    this.mario.update();
    this.tweenover.nextFrame();

    // console.log(this.mario.yPos)
    // this.coin.update();
    	this.mario.playing = false;



      this.mario.tcurrent = this.clock.getElapsedTime();
      this.mario.tchang = this.mario.tcurrent- this.mario.tprev;
      this.mario.tprev = this.mario.tcurrent;


      // if((this.mario.xPos + this.mario.xSize/2)> (this.coin.xPos - this.coin.xSize/2) && (this.mario.xPos - this.mario.xSize/2) < (this.coin.xPos - this.coin.xSize/2) && (this.mario.yPos + this.mario.ySize/2)
      //     > (this.coin.yPos - this.coin.ySize/2) && (this.mario.yPos - this.mario.ySize/2) < (this.coin.yPos + this.coin.ySize/2)){
      //       count++;
      //       this.congrat.visible = true;
      //       if (count == 1){
      //        this.coin.visible = false;
      //        this.mario.st = true;
      //      }
      //      if(count <=5 ){
      //
      //        // this.congrat.scaleX+=0.01;
      //        // this.congrat.scaleY += 0.01;
      //      }
      //      this.mario.visible = false;
      //      game.pause();
      //       }


    if(pressedKeys.contains(39)){
        if(this.mario.xPos <= 1000){
          if(this.mario.xvelo <0){
            this.mario.xvelo = 0;

          }
          this.mario.xvelo += 10;
          this.mario.setAnimation("walk");
          if(this.mario.currentFrame > 2){
            this.mario.currentFrame = 0;
          }
          this.mario.playAni();
          if(this.mario.scaleX <0){
            this.mario.scaleX *= -1;
          }


        }

    }
    if(pressedKeys.contains(37)){
      if (this.mario.xPos >=0){
        if(this.mario.xvelo >0){
          this.mario.xvelo = 0;
        }
        this.mario.xvelo -=10;
        this.mario.setAnimation("walk");
      if(this.mario.currentFrame > 2){
        this.mario.currentFrame = 0;
      }
      this.mario.playAni();
      if(this.mario.scaleX >0){
        this.mario.scaleX *= -1;
      }

    }
    }
    if(pressedKeys.contains(38)){
      if (this.mario.yPos >= 0){
        butcount++;
        if (butcount == 1){
          this.mario.yacel = -1000;
        }
        butcount = 0;
        sound2.playSound();
        this.mario.setAnimation("up");
        if(this.mario.currentFrame > 10 || this.mario.currentFrame <8 ){
          this.mario.currentFrame = 8;
        }
        this.mario.playAni();
      }

    }
    if(pressedKeys.contains(40)){
      if(this.mario.yPos <= 600){
        this.mario.yvelo +=10;
        this.mario.setAnimation("down");
        if(this.mario.currentFrame < 10 ){
          this.mario.currentFrame = 11;
        }
        this.mario.playAni();
      }
    }



    // counter++;
    // if(counter >= 8){
    //   counter = 0;
    //
    //   this.coin.setImage(this.coin.frames2.get(this.coin.currentFrame));
    //   if (!flipper){
    //     this.coin.currentFrame++;
    //     if(this.coin.currentFrame >= this.coin.endIndex){
    //       flipper = true;
    //     }
    //   }
    //   else{
    //     this.coin.currentFrame--
    //     if(this.coin.currentFrame <= this.coin.startIndex){
    //       flipper = false;
    //     }
    //   }
    // }
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
      this.mario.setImage("link_stand.png");
    }

    // if(pressedKeys.contains(32)){
    //   this.title.visible = false;
    // }
    // if(pressedKeys.contains(80)){
    //   this.pause();
    // }
    // if(pressedKeys.contains(32)){
    //   this.removeKey(32);
    //   if(!this.keyPress.done){
    //     this.mario.st = true;
    //     this.coin.visible = true;
    //
    //   }
    //   this.keyPress.done = true;
    //
    // }
    // if(this.mario.yPos> this.mario.yend){
    //   this.mario.yPos = this.mario.yend;



    // }
    if(this.mario.yPos > this.mario.yend){
      this.mario.yPos = this.mario.yend;
      this.mario.yvelo = 0;
    }

    if(this.mario.xvelo >0){
      this.mario.xvelo -=5;

    }
    if(this.mario.xvelo < 0){
      this.mario.xvelo += 5;
    }

    if(this.mario.yPos < this.mario.yend){
      // if(this.mario.yvelo > 30){
      //   this.mario.yvelo = 30;
      // }
      // else{
      //   this.mario.yvelo += 2;
      // }
      if(this.mario.yacel > this.mario.gravity){
        this.mario.yacel = this.mario.gravity;
      }
      else{
        this.mario.yacel += 500;
      }

    }
    // else{
    //   this.mario.yvelo = 0;
    //   this.mario.yacel = 0;
    // }


    if(this.mario.xvelo > 250){
      this.mario.xvelo = 250;
    }
    if(this.mario.xvelo < -250){
      this.mario.xvelo = -250
    }
    // this.mario.computeAccelX();
    // this.mario.computeAccelY();

    this.mario.computeVeloX();
    this.mario.computeVeloY();
    this.mario.computePosX();
    this.mario.computePosY();
    // console.log(this.mario.yPos)


    if(this.mario.collidesWith(this.platform1)){
      this.mario.dispatchEven(this.collision, this.platform1);
      this.mario.st = true;

    }
    if(this.mario.collidesWith(this.platform2)){
      this.mario.dispatchEven(this.collision, this.platform2);
      this.mario.st = true;
    }

    if(this.mario.collidesWith(this.coin)){
      this.fadeTween.animateTween("xpos", this.coin.xPos, 500, 3);
      this.fadeTween.animateTween("ypos", this.coin.yPos, 300, 3);
      this.fadeTween.animateTween("xscale", 1, 4, 3);
      this.fadeTween.animateTween("yscale", 1, 4, 3);
      this.fadeTween.animateTween("alpha", 1, 0, 3);

      sound1.stopSound();
      sound2.stopSound();
      // count++;
      // this.mario.dispatchEven(this.tweenFadeEvent, this.coin);
      // if(this.tweenFadeEvent.complete){
      //   this.fadeTween.animateTween("xpos", this.coin.xPos, 500, 3);
      //   this.fadeTween.animateTween("ypos", this.coin.yPos, 300, 3);
      //   this.fadeTween.animateTween("xscale", 1, 4, 3);
      //   this.fadeTween.animateTween("yscale", 1, 4, 3);
      //   this.fadeTween.animateTween("alpha", 0, 1, 3);
      // }
      //       // this.congrat.visible = true;
           //  if (count == 1){
           //   this.coin.visible = false;
           //   this.mario.st = true;
           // }
           // if(count <=5 ){
           //
           //   // this.congrat.scaleX+=0.01;
           //   // this.congrat.scaleY += 0.01;
           // }
           this.mario.visible = false;
           // game.pause();

    }


    if(this.mario.st == false){
      this.mario.yend = 550;
    }



		/**
		 * Example of using the gamepad class. You can use printgamepadInfo, to see buttons that are being pressed
		 * to figure out what integers map to what battons.
		 */
		if(gamepads[2]){
			gamepads[2].printGamepadInfo();

			if(gamepads[2].buttonPressedByIndex(12)) this.yPos -= 3;
			if(gamepads[2].buttonPressedByIndex(13)) this.yPos += 3;
			if(gamepads[2].buttonPressedByIndex(15)) this.xPos += 3;
			if(gamepads[2].buttonPressedByIndex(14)) this.xPos -= 3;

			if(Math.abs(gamepads[2].getLeftStickXAxis()) > 0.001) this.xPos += 3*gamepads[2].getLeftStickXAxis();
			if(Math.abs(gamepads[2].getLeftStickYAxis()) > 0.001) this.yPos += 3*gamepads[2].getLeftStickYAxis();
			if(Math.abs(gamepads[2].getRightStickXAxis()) > 0.001) this.xPos += 3*gamepads[2].getRightStickXAxis();
			if(Math.abs(gamepads[2].getRightStickYAxis()) > 0.001) this.yPos += 3*gamepads[2].getRightStickYAxis();
		}
	}

	draw(g){
		g.clearRect(0, 0, this.width, this.height);
		super.draw(g);
		g.translate(this.xPos, this.yPos);


    this.gam.draw(g);
    // this.platform1.draw(g);
    // this.coin.draw(g);
    // this.congrat.draw(g);
		g.translate(-1*this.xPos, -1*this.yPos);



	}



}



/**
 * THIS IS THE BEGINNING OF THE PROGRAM
 * YOU NEED TO COPY THIS VERBATIM ANYTIME YOU CREATE A GAME
 */
function tick(){
	game.nextFrame();
}

/* Get the drawing canvas off of the  */
var drawingCanvas = document.getElementById('game');
if(drawingCanvas.getContext) {
	var game = new Lab6Game(drawingCanvas);

  window.addEventListener("keypress", myEventHandler, false);
  function myEventHandler(e){
      var keyCode = e.keyCode;
      if(keyCode == 32){
        game.startGame();

        sound1.playSound();
      }
  };
  // var playPromise = sound1.sound.play();
  //
  //   if (playPromise !== undefined) {
  //     playPromise.then(_ => {
  //       // Automatic playback started!
  //       // Show playing UI
  //     })
  //     .catch(error => {
  //       // Auto-play was prevented
  //       // Show paused UI.
  //     });
  //   }

}
