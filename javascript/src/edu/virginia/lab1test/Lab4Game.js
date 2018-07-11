"use strict";

var count = 0;
var counter = 0;
var flipper = false;
class Lab4Game extends Game{
  constructor(canvas){
		super("Lab Four Game", 1000, 700, canvas);
    this.mario = new AnimatedSprite("Mario", "link_stand.png");
    this.coin = new AnimatedSprite("Coin", "coin0.png");
    this.congrat = new AnimatedSprite("Congrats", "congra.jpg");
    this.liste = new QuestManager();
    this.list2 = new QuestManager();
    this.coinQuest = new Event("coinQuest");
    this.coinQuest.quest = "Collected Your First Coin!";
    this.coinQuest.imag = this.congrat;
    this.keyPress = new Event("space");
    this.keyPress.quest = "WOW YOU PRESSED DA SPACE BARRRRRRRR!";
    this.mario.addEventListen(this.liste, this.coinQuest.eventType);
    this.mario.addEventListen(this.liste, this.keyPress.eventType);
    this.mario.xPos = 100;
    this.mario.yPos = 550;
    this.coin.xPos = 700;
    this.coin.yPos = 550;
    this.coin.visible = false;
    this.congrat.visible = false;
    this.congrat.xPos = 0;
    this.congrat.yPos = 0;
    this.congrat.xSize = 1100;
    this.congrat.ySize = 700;
    this.keyPress.disc = "Now go collect the coin and fufill your destiny!";

	}


	update(pressedKeys, gamepads){
		super.update(pressedKeys);
    this.mario.update();
    this.coin.update();
    	this.mario.playing = false;

      if((this.mario.xPos + this.mario.xSize/2)> (this.coin.xPos - this.coin.xSize/2) && (this.mario.xPos - this.mario.xSize/2) < (this.coin.xPos - this.coin.xSize/2) && (this.mario.yPos + this.mario.ySize/2)
          > (this.coin.yPos - this.coin.ySize/2) && (this.mario.yPos - this.mario.ySize/2) < (this.coin.yPos + this.coin.ySize/2)){
            count++;
            this.congrat.visible = true;
            if (count == 1){
             this.coin.visible = false;
             this.mario.st = true;
           }
           if(count <=5 ){

             // this.congrat.scaleX+=0.01;
             // this.congrat.scaleY += 0.01;
           }
           this.mario.visible = false;
           game.pause();
            }


    if(pressedKeys.contains(39)){
        if(this.mario.xPos <= 1000){
          this.mario.xPos+=5;
          this.mario.dispatchEven(this.coinQuest);
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
      this.mario.dispatchEven(this.coinQuest);
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
      this.mario.yPos-=5;
      this.mario.dispatchEven(this.coinQuest);
      this.mario.setAnimation("up");
      if(this.mario.currentFrame > 10 || this.mario.currentFrame <8 ){
        this.mario.currentFrame = 8;
      }
      this.mario.playAni();
    }
    }
    if(pressedKeys.contains(40)){
      if(this.mario.yPos <= 600){
      this.mario.yPos+=5;
      this.mario.dispatchEven(this.coinQuest);
      this.mario.setAnimation("down");
      if(this.mario.currentFrame < 10 ){
        this.mario.currentFrame = 11;
      }
      this.mario.playAni();
    }
    }



    counter++;
    if(counter >= 8){
      counter = 0;

      this.coin.setImage(this.coin.frames2.get(this.coin.currentFrame));
      if (!flipper){
        this.coin.currentFrame++;
        if(this.coin.currentFrame >= this.coin.endIndex){
          flipper = true;
        }
      }
      else{
        this.coin.currentFrame--
        if(this.coin.currentFrame <= this.coin.startIndex){
          flipper = false;
        }
      }
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
      this.mario.setImage("link_stand.png");
    }

    if(pressedKeys.contains(32)){
      this.removeKey(32);
      if(!this.keyPress.done){
        this.mario.st = true;
        this.mario.dispatchEven(this.keyPress);
        this.coin.visible = true;

      }
      this.keyPress.done = true;

    }
    this.mario.st = false;




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
    this.mario.draw(g);
    this.coin.draw(g);
    this.congrat.draw(g);
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
	var game = new Lab4Game(drawingCanvas);
	game.startGame();
}
