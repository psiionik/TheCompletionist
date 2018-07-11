"use strict";

/**
 * Main class. Instantiate or extend Game to create a new game of your own
 */

var ea = 0;
var ea2 =0;
var eac = 0;
var ma = 0;
var ma2 = 0
var mac = 0;
var ju = 0;
var ju2 = 0;
var sa = 0;
var sa2 = 0;
 // document.body.onmouseup = function() {
 //   --mouseDown;
 // }
class Lab3Game extends Game{

	constructor(canvas){
		super("Lab Three Game", 2000, 2000, canvas);
		this.sun = new AnimatedSprite("Sun", "sun.png");
    this.poin = new AnimatedSprite("Point", "pivotpoint.jpg");
    this.mercury = new AnimatedSprite("Mercury", "pl1.png");
    this.dummy1 = new AnimatedSprite("Dummy1", "");
    this.dummy0 = new AnimatedSprite("Dummy0", "");
    this.earth = new AnimatedSprite("Earth", "earth.png");
    this.moon1 = new AnimatedSprite("Moon1", "moon1.png");
    this.ddummy0 = new AnimatedSprite("Ddummy0", "");
    this.jupiter = new AnimatedSprite("Jupiter", "pl2.png");
    this.dummy2 = new AnimatedSprite("Dummy2", "");
    this.moon2 = new AnimatedSprite("Moon2", "moon2.png");
    this.ddummy1 = new AnimatedSprite("DDummy1", "");
    this.moon3 = new AnimatedSprite("Moon3", "moon3.png");
    this.saturn = new AnimatedSprite("Saturn", "saturn.png");
    this.dummy3 = new AnimatedSprite("Dummy3" ,"");
    this.ddummy2 = new AnimatedSprite("DDummy2", "");
    this.moon4 = new AnimatedSprite("Moon4", "moon4.png");
		console.log(this.moon4);




    this.poin.xSize = 5;
    this.poin.ySize = 5;
    this.sun.xPos = 350;
    this.sun.yPos= 350;
    this.sun.xSize = 100;
    this.sun.ySize = 100;
    this.sun.pivX = this.sun.xSize/2;
    this.sun.pivY = this.sun.ySize/2;
		this.xPos = 0;
		this.yPos = 0;
		this.clock = new GameClock();
		this.gamestate = true;
		this.srcX = 0;
		this.srcY = 0;
		this.enter = false;
		this.ct = 0;


    // this.poin.xPos=this.sun.xPos;
    // this.poin.yPos = this.sun.yPos
    // this.poin.xPos= this.poin.pivX;
    // this.poin.yPos = this.poin.pivX
    // // this.earth.xPos = 100;
    // this.earth.yPos = 0;
    // this.mercury.xPos = 50;
    // this.mercury.yPos= 50;
    this.moon1.xPos = 35;
    this.moon1.yPos = 35;
    this.moon1.setSize(30,30);
    // this.jupiter.xPos= 200;
    // this.jupiter.yPos = 200;
    this.jupiter.setSize(80,80);
    this.moon2.xPos = 45;
    this.moon2.yPos = 45;
    this.moon2.setSize(30,30);
    this.moon3.xPos = -45;
    this.moon3.yPos = -45;
    this.moon3.setSize(30,30);
    // this.saturn.xPos = 300;
    // this.saturn.yPos = 300;
    this.saturn.setSize(70,70);
    this.moon4.setSize(30,30);
    this.moon4.xPos = 40;
    this.moon4.yPos = 40;


    this.poin.xPos = this.sun.pivX;
    this.poin.yPos = this.sun.pivY;
    this.dummy0.centerPivot(this.sun.pivX, this.sun.pivY);
    this.gameObj.addChild(this.sun);
    this.sun.addChild(this.dummy0);
    this.dummy0.addChild(this.earth);
    this.sun.addChild(this.dummy1);
    this.dummy1.addChild(this.mercury);
    this.earth.addChild(this.ddummy0);
    this.ddummy0.addChild(this.moon1);
    this.sun.addChild(this.dummy2);
    this.dummy2.addChild(this.jupiter);
    this.jupiter.addChild(this.ddummy1);
    this.ddummy1.addChild(this.moon2);
    this.ddummy1.addChild(this.moon3);
    this.sun.addChild(this.dummy3);
    this.dummy3.addChild(this.saturn);
    this.saturn.addChild(this.ddummy2);
    this.ddummy2.addChild(this.moon4);
    // console.log(this.sun.getUnscaledWidth());
    // console.log("X piv: " + this.sun.pivX + " Y piv: " + this.sun.pivY);
    // console.log("X pos: " + this.sun.xPos + " Y pos: " + this.sun.yPos);
    // console.log("X piv: " + this.dummy0.pivX + " Y piv: " + this.dummy0.pivY);
    // console.log("X pos: " + this.dummy0.xPos + " Y pos: " + this.dummy0.yPos);
    // console.log(typeof(this.sun.listObjects.get(0)));
	}


	update(pressedKeys, gamepads){
		super.update(pressedKeys);
		this.sun.update();
    // ea = this.earth.y - this.earth.changY;
    // this.earth.changY = this.earth.y;
    // this.earth.y = this.earth.ellipse(this.dummy0.rotateVal, 80, 300);
    // ea2 = this.earth.y - this.earth.changY;
    // ma = this.mercury.y - this.mercury.changY;
    // this.mercury.changY = this.mercury.y;
    // this.mercury.y = this.mercury.ellipse(this.dummy1.rotateVal, 80, 300);
    // ma2 = this.mercury.y-this.mercury.changY;
    this.earth.xPos = this.earth.ellipse(this.dummy0.rotateVal, 80, 300);
    this.mercury.xPos = this.mercury.ellipse(this.dummy1.rotateVal, 10, 150);
    this.jupiter.xPos = this.jupiter.ellipse(this.dummy2.rotateVal, 200, 400);
    this.saturn.xPos = this.saturn.ellipse(this.dummy3.rotateVal, 300, 500);
    // eac++;
    // mac++;
    // if(eac <= 59){
    //   if(ea2 - ea <0 ){
    //     this.earth.scaleX += 0.02;
    //     this.earth.scaleY += 0.02;
    //   }
    //   else{
    //     this.earth.scaleX -= 0.02;
    //     this.earth.scaleY -= 0.02;
    //   }
    // }
    // else{
    //   eac = 0;
    // }
    // if (mac <= 23)
    //   if(ma2 - ma <0 ){
    //     console.log("x(")
    //
    //     this.mercury.scaleX += 0.05;
    //     this.mercury.scaleY += 0.05;
    //   }
    //   else{
    //     console.log("Y)")
    //
    //     this.mercury.scaleX -= 0.05;
    //     this.mercury.scaleY -= 0.05;
    // }
    // else{
    //   mac = 0;
    // }
    // console.log("X piv: " + this.earth.pivX + " Y piv: " + this.earth.pivY);
    // console.log("X pos: " + this.earth.xPos + " Y pos: " + this.earth.yPos);
    this.dummy0.rotateVal += 3;
    this.dummy1.rotateVal += 8;
    this.mercury.rotateVal -= 15;
    this.earth.rotateVal -=10;
    this.ddummy0.rotateVal += 15;
    this.dummy2.rotateVal += 2;
    this.jupiter.rotateVal -= 8;
    this.ddummy1.rotateVal += 15;
    this.dummy3.rotateVal += 1;
    this.saturn.rotateVal += 10;
    this.ddummy2.rotateVal -= 8;
    this.moon4.rotateVal += 8;

    if(pressedKeys.contains(32)){
      this.pause();
    }


    		if(pressedKeys.contains(39)){
          this.sun.xPos -= 2;
    		}
    		if(pressedKeys.contains(37)){
          this.sun.xPos += 2;
    		}
    		if(pressedKeys.contains(38)){
          this.sun.yPos -= 2;
    		}
    		if(pressedKeys.contains(40)){
          this.sun.yPos +=2;
    		}

        if (pressedKeys.contains(81)){
          this.sun.scaleX += 0.01;
          this.sun.scaleY += 0.01;
        }

        if(pressedKeys.contains(87)){
          this.sun.scaleX -= 0.01;
          this.sun.scaleY -= 0.01;
        }

        if(pressedKeys.contains(65)){
          this.dummy0.rotateVal += 15;
          this.dummy1.rotateVal += 15;
          this.ddummy0.rotateVal += 15;
          this.dummy2.rotateVal += 15;
          this.ddummy1.rotateVal += 15;
          this.dummy3.rotateVal += 15;
          this.ddummy2.rotateVal += 15;
        }

        if(pressedKeys.contains(83)){
          this.dummy0.rotateVal -= 15;
          this.dummy1.rotateVal -= 15;
          this.ddummy0.rotateVal -= 15;
          this.dummy2.rotateVal -= 15;
          this.ddummy1.rotateVal -= 15;
          this.dummy3.rotateVal -= 15;
          this.ddummy2.rotateVal -= 15;
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
    this.sun.draw(g);
    this.poin.draw(g);
		g.translate(-1*this.xPos, -1*this.yPos);



	}



}


//
// /**
//  * THIS IS THE BEGINNING OF THE PROGRAM
//  * YOU NEED TO COPY THIS VERBATIM ANYTIME YOU CREATE A GAME
//  */
// function tick(){
// 	game.nextFrame();
// }
//
// /* Get the drawing canvas off of the  */
// var drawingCanvas = document.getElementById('game');
// if(drawingCanvas.getContext) {
// 	var game = new Lab3Game(drawingCanvas);
// 	game.startGame();
// }
