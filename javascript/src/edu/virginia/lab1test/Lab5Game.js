"use strict";

var count = 0;
var counter = 0;
var flipper = false;
var sound1 = new Sound("backgroundmusic", "resources/casinoparkmusic.mp3");
var sound2 = new Sound("jumpsound", "resources/jumpsound.mp3");
sound2.sound.loop = false;
var soundmanage = new SoundManager();
soundmanage.addSound(sound1);
function myEventHandler(e){
    // var keyCode = e.keyCode;
    // if(keyCode != null){
    //     sound1.playSound();
    // }
    sound1.playSound();
};

// sound1.playSound();

class Lab5Game extends Game{
  constructor(canvas){
		super("Lab Five Game", 1000, 700, canvas);
    this.gam = new DisplayObjectContainer("gam", "");
    this.mario = new PhysicsSprite("Mario", "link_stand.png");


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
    this.mario.yPos = 550;
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
    this.gam.setSize(1000, 700);
    this.gam.addChild(this.mario);
    this.gam.addChild(this.platform1);
    this.gam.addChild(this.platform2);
    this.gam.addChild(this.coin);
    // this.gam.addChild(this.congrat);
    this.collision = new Event("col");
    this.manage = new CollisionManager();
    this.mario.addEventListen(this.manage, this.collision.eventType);
    this.mario.setYEnd(550);

    // var x = localToGlobal(0, 0, this.mario);

	}


	update(pressedKeys, gamepads){
    // this.mario.getGlobalHitBox();
		super.update(pressedKeys);
    this.mario.update();

    if(this.mario.collidesWith(this.platform1)){
      this.mario.dispatchEven(this.collision, this.platform1);

    }
    else if(this.mario.collidesWith(this.platform2)){
      this.mario.dispatchEven(this.collision, this.platform1);
    }
    else{
      this.mario.st = false;
    }
    // if(this.mario.collidesWith(this.coin)){
    //   sound1.stopSound();
    //   sound2.stopSound();
    //   count++;
    //         this.congrat.visible = true;
    //         if (count == 1){
    //          this.coin.visible = false;
    //          this.mario.st = true;
    //        }
    //        if(count <=5 ){
    //
    //          // this.congrat.scaleX+=0.01;
    //          // this.congrat.scaleY += 0.01;
    //        }
    //        this.mario.visible = false;
    //        game.pause();
    //
    // }
    // console.log(this.mario.yPos)
    // this.coin.update();
    	this.mario.playing = false;
      if(this.mario.xvelo > 0){
        this.mario.xvelo -= 5;
      }
      if (this.mario.xvelo < 0){
        this.mario.xvelo += 5;
      }
      if(this.mario.yPos < this.mario.yend){
        this.mario.yacel += this.mario.gravity;
      }
      else{
        // this.mario.yPos = 500;
        this.mario.yacel = 0;
        this.mario.yvelo = 0;
      }
      // console.log(this.mario.xvelo);

      // console.log(this.mario.xPos);
      this.mario.tend = this.clock.getElapsedTime();
      // this.mario.computeAccelX();
      // this.mario.computeAccelY();
      this.mario.computeVeloX();
      this.mario.computeVeloY();
      this.mario.computePosX();
      this.mario.computePosY();

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
          this.mario.xPos += 5;
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

      this.mario.xPos-=5;
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
      this.mario.yPos-=10;
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
      this.mario.yPos+=10;
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
    if(this.mario.st == false){
      this.mario.yend = 550;
    }
    this.mario.tstart = this.mario.tend;



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
	var game = new Lab5Game(drawingCanvas);
	game.startGame();
  window.addEventListener("keypress", myEventHandler, false);

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
