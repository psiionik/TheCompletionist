"use strict";

/**
 * Main class. Instantiate or extend Game to create a new game of your own
 */

class ProjLevel extends Game{

	constructor(canvas){
		super("ProjLevel", 1500, 700, canvas);
    this.listOfGames = new ArrayList();

    this.gameLoading = new DisplayObjectContainer("loading", "");
    this.level1 = new DeathLevel("death", "");
    this.level2 = new BowserLevel("bowser", "");
		this.level3 = new CrashmanLevel("crashman", "");
		this.level4 = new ZorkLevel("zork", "");
		this.level5 = new SinistarLevel("sinistar", "");
		this.startLevel = new StartScreen("start", "");
		this.levelSelector = new LevelSelector("levelselect", "");
		this.winscreen = new WinScreen("winscreen", "");
		this.gameoverscreen = new GameOverScreen("gameoverscreen", "");
		this.listOfGames.add(this.level1);
		this.listOfGames.add(this.level2);
		this.listOfGames.add(this.level3);
		this.listOfGames.add(this.level4);
		this.listOfGames.add(this.level5);
		this.listOfGames.add(this.startLevel);
		this.listOfGames.add(this.levelSelector)
		this.listOfGames.add(this.winscreen);
		this.listOfGames.add(this.gameoverscreen);
		// this.ran = getRandomInt(this.listOfGames.size()-2);
    this.gameLoading.addChild(this.listOfGames.get(5));
		this.addChild(this.gameLoading);
		this.manage = new LevelManage(this);
		//Sounds
		this.overallTheme = new Sound("overall theme", "resources/startmenu.mp3");
		this.overallTheme.loop = true;

		this.bowserTheme = new Sound("bowser theme", "resources/bowserSounds/bowsertheme.mp3");
    this.bowserTheme.loop = true;

		this.megamanTheme = new Sound("megaman theme", "resources/megamansounds/megamantheme.mp3");
		this.megamanTheme.loop = true;

		this.deathTheme = new Sound("death theme", "resources/death/deaththeme.mp3");
		this.deathTheme.loop = true;

		this.sansTheme = new Sound("sans theme", "resources/sanstheme.mp3");
		this.sansTheme.loop = true;
	}


	update(pressedKeys, gamepads){
		super.update(pressedKeys);
    this.gameLoading.update(pressedKeys, gamepads);

		if(startComplete == true){
			this.overallTheme.playSound();
			this.gameLoading.removeByIndex(0);
			this.gameLoading.addChild(this.listOfGames.get(6));
			// this.listOfGames.get(6).addEventListen(this.listOfGames.get(6).bowserEvent.eventType, this.listOfGames.get(6).parent.parent.manage);
			// this.listOfGames.get(6).addEventListen(this.listOfGames.get(6).crashmanEvent.eventType, this.listOfGames.get(6).parent.parent.manage);
			// this.listOfGames.get(6).addEventListen(this.listOfGames.get(6).sinistarEvent.eventType, this.listOfGames.get(6).parent.parent.manage);
			// this.listOfGames.get(6).addEventListen(this.listOfGames.get(6).zorkEvent.eventType, this.listOfGames.get(6).parent.parent.manage);
			// this.listOfGames.get(6).addEventListen(this.listOfGames.get(6).deathEvent.eventType, this.listOfGames.get(6).parent.parent.manage);
			startComplete = false;
		}

		if(bowserLoad == true){
			this.overallTheme.stopSound();
			this.bowserTheme.playSound();
			this.gameLoading.removeByIndex(0);
			this.gameLoading.addChild(this.listOfGames.get(1));
			this.listOfGames.get(1).resetAllClocks();
			bowserLoad = false;
		}

		if(bowserComplete == true){
			winCounter++;
			this.overallTheme.loop = true;
			this.overallTheme.playSound();
			this.bowserTheme.stopSound();
			this.gameLoading.removeByIndex(0);
			this.gameLoading.addChild(this.listOfGames.get(6));
			bowserComplete = false;
		}


		if(crashmanLoad == true){
			this.overallTheme.stopSound();
			this.megamanTheme.playSound();
			this.gameLoading.removeByIndex(0);
			this.gameLoading.addChild(this.listOfGames.get(2));
			this.listOfGames.get(2).resetAllClocks();
			crashmanLoad = false;
		}
		if(crashmanComplete == true){
			winCounter++;
			this.overallTheme.loop = true;
			this.overallTheme.playSound();
			this.megamanTheme.stopSound();
			this.gameLoading.removeByIndex(0);
			this.gameLoading.addChild(this.listOfGames.get(6));
			crashmanComplete = false;
		}


		if(sinistarLoad == true){
			this.overallTheme.stopSound();
			this.gameLoading.removeByIndex(0);
			this.gameLoading.addChild(this.listOfGames.get(4));
			sinistarLoad = false;
		}
		if(sinistarComplete == true){
			winCounter++;
			this.overallTheme.loop = true;
			this.overallTheme.playSound();
			this.gameLoading.removeByIndex(0);
			this.gameLoading.addChild(this.listOfGames.get(6));
			sinistarComplete = false;
		}



		if(trollLoad == true){
			this.overallTheme.stopSound();
			this.gameLoading.removeByIndex(0);
			this.gameLoading.addChild(this.listOfGames.get(3));
			trollLoad = false;
		}

		if(trollComplete == true){
			winCounter++;
			this.overallTheme.loop = true;
			this.overallTheme.playSound();
			this.gameLoading.removeByIndex(0);
			this.gameLoading.addChild(this.listOfGames.get(6));
			trollComplete = false;
		}

		if(deathLoad == true){
			this.overallTheme.stopSound();
			this.deathTheme.playSound();
			this.gameLoading.removeByIndex(0);
			this.gameLoading.addChild(this.listOfGames.get(0));
			this.listOfGames.get(0).resetAllClocks();
			deathLoad = false;
		}

		if(deathComplete == true){
			winCounter++;
			this.deathTheme.stopSound();
			this.overallTheme.loop = true;
			this.overallTheme.playSound();
			this.gameLoading.removeByIndex(0);
			this.gameLoading.addChild(this.listOfGames.get(6));
			deathComplete = false;
		}

		if(playerHealth <= 0){
			this.overallTheme.stopSound();
			this.bowserTheme.stopSound();
			this.megamanTheme.stopSound();
			this.gameLoading.removeByIndex(0);
			this.gameLoading.addChild(this.listOfGames.get(8));
		}

		if(winCounter == 5){
			this.overallTheme.stopSound();
			this.gameLoading.removeByIndex(0);
			this.gameLoading.addChild(this.listOfGames.get(7));
		}





    // if(pressedKeys.contains(32)){
    //   this.gameLoading.removeChild(this.level1);
    //   this.gameLoading.addChild(this.level2);
    // }



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
    this.gameLoading.draw(g);
		g.translate(-1*this.xPos, -1*this.yPos);
		document.getElementById("playerhealth").innerHTML ="Your Health: " + playerHealth;



	}


}



/**
 * THIS IS THE BEGINNING OF THE PROGRAM
 * YOU NEED TO COPY THIS VERBATIM ANYTIME YOU CREATE A GAME
 */
function tick(){
	game.nextFrame();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/* Get the drawing canvas off of the  */
var drawingCanvas = document.getElementById('game');
if(drawingCanvas.getContext) {
	var game = new ProjLevel(drawingCanvas);
	// window.addEventListener("keypress", myEventHandler, false);
	// function myEventHandler(e){
	// 		var keyCode = e.keyCode;
			// if(keyCode == 32){
				game.startGame();

			// }
	// };
}
