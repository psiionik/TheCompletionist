"use strict";

/**
 * Main class. Instantiate or extend Game to create a new game of your own
 */
 var mouseDown = 0;
 var mousex = 0;
 var mousey = 0;
 var mousecount = 0;
 document.getElementById("game").onclick = function() {
	 mousecount+=2;
	 var e = window.event;
   ++mouseDown;
	 mousex = e.clientX;
	 mousey = e.clientY;
 }
var count = 0;

 // document.body.onmouseup = function() {
 //   --mouseDown;
 // }
class LabOneGame extends Game{

	constructor(canvas){
		super("Lab One Game", 500, 500, canvas);
		this.mario = new AnimatedSprite("Mario", "link_stand.png");
		this.xPos = 0;
		this.yPos = 0;
		this.clock = new GameClock();
		this.gamestate = true;
		this.srcX = 0;
		this.srcY = 0;
		this.enter = false;
		this.ct = 0;
	}


	update(pressedKeys, gamepads){
		super.update(pressedKeys);
		this.mario.update();
		this.mario.playing = false;
		// this.mario.setImage("link_stand.png");

		if(pressedKeys.contains(39)){
			if(this.mario.start==false){
				if(this.mario.xPos <= 480){
					this.mario.xPos+=5;
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
			else{
				if(this.mario.xPos <= 400){
					this.mario.xPos+=5;
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
			if(this.mario.start==true){
				this.mario.start= false;
				this.mario.setPivotX(-60);
			}
		}
		}
		if(pressedKeys.contains(38)){
			if (this.mario.yPos >= 0){
			this.mario.yPos-=5;
			this.mario.setAnimation("up");
			if(this.mario.currentFrame > 10 || this.mario.currentFrame <8 ){
				this.mario.currentFrame = 8;
			}
			this.mario.playAni();
		}
		}
		if(pressedKeys.contains(40)){
			if(this.mario.yPos <= 360){
			this.mario.yPos+=5;
			this.mario.setAnimation("down");
			if(this.mario.currentFrame < 10 ){
				this.mario.currentFrame = 11;
			}
			this.mario.playAni();
		}
		}
		if(pressedKeys.contains(81))
			this.mario.rotateVal+=2;
		if(pressedKeys.contains(87))
			this.mario.rotateVal-=2;
		if(pressedKeys.contains(65)){
			this.mario.scaleX+=.05;
			this.mario.scaleY+=.05;
		}
		if(pressedKeys.contains(83)){
			this.mario.scaleX-=.05;
			this.mario.scaleY-=.05;
		}
		if(pressedKeys.contains(90))
			if(this.mario.alphaVal < 1){
			this.mario.alphaVal+=.01;
		}
		if(pressedKeys.contains(88))
		if (this.mario.alphaVal >0.01){
			this.mario.alphaVal-=.01;
		}
		if(pressedKeys.contains(86)){
			count++;
			if(this.mario.visible){
				if(count >= 5){
				this.mario.visible = false;
				count = 0;
			}

			}
			else{
				if (count >= 5){
				this.mario.visible = true;
				count = 0;
			}
			}
		}
		if(pressedKeys.contains(73)){
			if(this.mario.yPos >0){
				this.mario.setAnimation("walk");
				if(this.mario.currentFrame > 2){
					this.mario.currentFrame = 0;
				}
				this.mario.playAni();
				this.mario.yPos -=2.5;
			this.mario.pivY-=2.5;
			}
		}
		if(pressedKeys.contains(74)){
			if(this.mario.xPos >0){
				console.log(this.mario.pivX)
				this.mario.xPos-=2.5;
				this.mario.pivX-=2.5;
				this.mario.setAnimation("walk");
				if(this.mario.currentFrame > 2){
					this.mario.currentFrame = 0;
				}
				this.mario.playAni();
				// this.mario.scaleX = -1;
			}
		}
		if(pressedKeys.contains(75)){
			if(this.mario.yPos<=360){
				this.mario.yPos+=2.5;
			this.mario.pivY+=2.5;
			this.mario.setAnimation("walk");
			if(this.mario.currentFrame > 2){
				this.mario.currentFrame = 0;
			}
			this.mario.playAni();
			}
		}
		if(pressedKeys.contains(76)){
			if(this.mario.xPos <= 380){
				this.mario.xPos+=2.5;
				this.mario.pivX+=2.5;
				this.mario.setAnimation("walk");
				if(this.mario.currentFrame > 2){
					this.mario.currentFrame = 0;
				}
				this.mario.playAni();
				this.mario.scaleX = 1;
			}
		}

		if(mouseDown && this.health > 0 && (mousex < this.mario.xPos + 115 && mousex > this.mario.xPos + 30) && (mousey < this.mario.yPos + 135 && mousey > this.mario.yPos)){
			if (mousecount >= 2){
				mousecount = 0;
				this.health -= 5;
			}

			mouseDown--;
		}

		if (this.clock.getElapsedTime() > 60){
			this.gamestate=false;
			document.getElementById("winner").innerHTML = "PLAYER 1 WINS";
			this.stop;
		}
		if(this.health == 0){
			document.getElementById("winner").innerHTML = "PLAYER 2 WINS";
			this.gamestate = false;

		}

		if (pressedKeys.contains(80)){
			this.mario.setAnimation("sword");
			this.mario.playAni();


				if( this.health > 0 && (mousex < this.mario.xPos + 115 && mousex > this.mario.xPos + 30) && (mousey < this.mario.yPos + 135 && mousey > this.mario.yPos)){
					this.mario.counter2++;
					if(this.mario.counter2 >=10){
						document.getElementById("winner").innerHTML = "Player 2 has been slain! Player 1 wins!";
						this.stop;

				}
		}
		}

		if (pressedKeys.contains(32)){
			this.mario.pauseAni();
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
			if(this.mario.play2 == false){
				this.mario.setImage(this.mario.frames.get(this.mario.currentFrame));
			}
			else{
				this.mario.setImage("link_stand.png")
			}
		}


		// if(this.enter ==true){
		// 	var sign = window.prompt("Enter the speed of the animation");
		// 	this.mario.setSpeed(parseInt(sign));
		// 	this.enter = false;
		// }






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
		this.mario.draw(g)
		g.translate(-1*this.xPos, -1*this.yPos);
		document.getElementById("health").innerHTML = "Your Health (Do not let it reach 0!): " + this.health;
		if (this.health == 0){
			this.stop;
		}
		if(this.gamestate == true){
			document.getElementById("time").innerHTML = "Time stops at 60 seconds!: " + this.clock.getElapsedTime();
		}


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
	var game = new LabOneGame(drawingCanvas);
	game.start();
}
