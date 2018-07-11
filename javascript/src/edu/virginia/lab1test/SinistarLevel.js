"use strict";

var LEFT_ARROW = 37;
var UP_ARROW = 38;
var RIGHT_ARROW = 39;
var DOWN_ARROW = 40;
var ACTION_KEY = 90;
var EXTRA_KEY = 88;

var sinistarShipLeftBound = 470;
var sinistarShipRightBound = 530;
var sinistarShipTopBound = 270;
var sinistarShipBottomBound = 330;

var shipSpeed = 9.4;//3.2;
var sinistarSpeed = 5.1//1.9;
var boltSpeed = 9.8;
var bombSpeed = 2;

var sinistarForceX = 0;
var sinistarForceY = 0;

var sinistarVelocityX = 0;
var sinistarVelocityY = 0;

var shooting = false;
var droppingBomb = false;

var sinistarLoss = false;
var sinistarComplete = false;
var sinistarLoad = false;

var shipVelocityX = 0;
var shipVelocityY = 0;

var warningGiven = false;
var introductionGiven = false;
var taunt1Given = false;
//var taunt2Given = false;

class SinistarLevel extends DisplayObjectContainer
{

	constructor(id, filename)
	{
		super(id,filename);

		//Player
		this.playerShip = new PhysicsSprite("Playership", "sinistarship.png");
		this.playerShip.setScaleX(.3);
		this.playerShip.setScaleY(.3);
		this.playerShip.setPositionX(500);
		this.playerShip.setPositionY(300);

		this.bombCount = 3;

		//Sinistar
		this.sinistar = new PhysicsSprite("Sinistar", "sinistarface2.png");
		this.sinistar.setPositionX(-1500);
		this.sinistar.setPositionY(-1500);
		this.sinistar.setPivotX(this.sinistar.getUnscaledHeight());
		this.sinistar.setPivotY(this.sinistar.getUnscaledWidth());
		this.sinistarPart1 = new PhysicsSprite("Part 1", "sinistarpart1.png");
		this.sinistarPart1.setPositionX(35);
		this.sinistarPart1.setPositionY(-35);
		this.sinistarPart1.setScaleX(.5);
		this.sinistarPart1.setScaleY(.5);
		this.sinistar.addChild(this.sinistarPart1);
		this.sinistarPart0 = new PhysicsSprite("Part 0", "sinistarpart0.png");
		this.sinistarPart0.setPositionX(0);
		this.sinistarPart0.setPositionY(-35);
		this.sinistarPart0.setScaleX(.5);
		this.sinistarPart0.setScaleY(.5);
		this.sinistar.addChild(this.sinistarPart0);
		this.sinistarPart7 = new PhysicsSprite("Part 7", "sinistarpart7.png");
		this.sinistarPart7.setPositionX(-35);
		this.sinistarPart7.setPositionY(-35);
		this.sinistarPart7.setScaleX(.5);
		this.sinistarPart7.setScaleY(.5);
		this.sinistar.addChild(this.sinistarPart7);
		this.sinistarPart2 = new PhysicsSprite("Part 2", "sinistarpart2.png");
		this.sinistarPart2.setPositionX(35);
		this.sinistarPart2.setPositionY(0);
		this.sinistarPart2.setScaleX(.5);
		this.sinistarPart2.setScaleY(.5);
		this.sinistar.addChild(this.sinistarPart2);
		this.sinistarPart3 = new PhysicsSprite("Part 3", "sinistarpart3.png");
		this.sinistarPart3.setPositionX(35);
		this.sinistarPart3.setPositionY(35);
		this.sinistarPart3.setScaleX(.5);
		this.sinistarPart3.setScaleY(.5);
		this.sinistar.addChild(this.sinistarPart3);
		this.sinistarPart6 = new PhysicsSprite("Part 6", "sinistarpart6.png");
		this.sinistarPart6.setPositionX(-35);
		this.sinistarPart6.setPositionY(0);
		this.sinistarPart6.setScaleX(.5);
		this.sinistarPart6.setScaleY(.5);
		this.sinistar.addChild(this.sinistarPart6);
		this.sinistarPart5 = new PhysicsSprite("Part 5", "sinistarpart5.png");
		this.sinistarPart5.setPositionX(-35);
		this.sinistarPart5.setPositionY(35);
		this.sinistarPart5.setScaleX(.5);
		this.sinistarPart5.setScaleY(.5);
		this.sinistar.addChild(this.sinistarPart5);
		this.sinistarPart4 = new PhysicsSprite("Part 4", "sinistarpart4.png");
		this.sinistarPart4.setPositionX(0);
		this.sinistarPart4.setPositionY(35);
		this.sinistarPart4.setScaleX(.5);
		this.sinistarPart4.setScaleY(.5);
		this.sinistar.addChild(this.sinistarPart4);

		this.sinistarHealth = 8;

		//Space
		this.space = new DisplayObjectContainer("Space", "");
		this.addChild(this.playerShip);
		this.addChild(this.space);
		this.space.addChild(this.sinistar);

		this.boltList = new ArrayList();
		this.bombCountList = new ArrayList();
		this.bombList = new ArrayList();

		var bX = 30;
		for(var i = 0; i < 10; i++)
		{
			var bomb = new PhysicsSprite("BombCountImage", "bomb.png");
			bomb.setPositionX(bX);
			bomb.setPositionY(20);
			bomb.setScaleX(.25);
			bomb.setScaleY(.25);
			this.addChild(bomb);
			this.bombCountList.add(bomb);
			bX += 20;
		}

		this.asteroidList = new ArrayList();
		this.asteroidHealthList = new ArrayList();

		for(var i = 0; i < 64; i++)
		{
			var asteroid = new PhysicsSprite("Asteroid", "asteroid1.png");
			this.asteroidList.add(asteroid);
			this.asteroidHealthList.add(100);

			asteroid.rotateVal = Math.random() * 360;
			var aX = Math.random() * 4000 - 2000;
			var aY = Math.random() * 4000 - 2000;

			if(true) //TODO: make sure asteroids don't spawn on ship.
			{
				asteroid.setPositionX(aX);
				asteroid.setPositionY(aY);
			}

			this.space.addChild(asteroid);
		}


	}

	controls(pressedKeys)
	{
		var xDir = 0;
		var yDir = 0;
		for (var i = 0; i < pressedKeys.size(); i++)
		{
			var key = pressedKeys.get(i);
			switch(key)
			{
				case LEFT_ARROW:
				xDir -= 1;
				break;
				case RIGHT_ARROW:
				xDir += 1;
				break;
				case UP_ARROW:
				yDir -= 1;
				break;
				case DOWN_ARROW:
				yDir += 1;
				break;
				case ACTION_KEY:
				if(!shooting)
				{
					var bolt = new PhysicsSprite("Bolt", "bolt.png");
					this.boltList.add(bolt);
					bolt.setPositionX(this.playerShip.getPositionX());
					bolt.setPositionY(this.playerShip.getPositionY());
					bolt.rotateVal = (this.playerShip.rotateVal - 90);
					bolt.xvelo = boltSpeed * -Math.cos(Math.PI * bolt.rotateVal/180);
					bolt.yvelo = boltSpeed * -Math.sin(Math.PI * bolt.rotateVal/180);
					this.addChild(bolt);
					shooting = true;
				}
				break;
				case EXTRA_KEY:
				if(!droppingBomb && this.bombCount > 0)
				{
					var bomb = new PhysicsSprite("Bomb", "bomb.png");
					this.bombList.add(bomb);
					bomb.setScaleX(.25);
					bomb.setScaleY(.25);
					var [mX, mY] = [-this.space.getPositionX()
					 			+this.playerShip.getPositionX(),
							-this.space.getPositionY()
					 			+this.playerShip.getPositionY()];
					bomb.setPositionX(mX);
					bomb.setPositionY(mY);
					this.space.addChild(bomb);
					this.bombCount--;
					droppingBomb = true;
				}
				break;
				default:
				xDir +=1;
			}
		}

		if(!pressedKeys.contains(ACTION_KEY)){shooting = false;}
		if(!pressedKeys.contains(EXTRA_KEY)){droppingBomb = false;}

		var angle = Math.atan(yDir/xDir);
		var degreesAngle = angle/(2*Math.PI) * 360;
		if(degreesAngle == NaN){degreesAngle = 0;}
		this.playerShip.rotateVal = degreesAngle - 90;

		if(xDir < 0){this.playerShip.rotateVal += 180;}

		shipVelocityX = shipSpeed*xDir;
		shipVelocityY = shipSpeed*yDir;

		var newX = shipVelocityX + this.playerShip.getPositionX();
		var newY = shipVelocityY + this.playerShip.getPositionY();

		if(newX < sinistarShipLeftBound || newX > sinistarShipRightBound)
		{
			this.space.setPositionX(-shipSpeed*xDir + this.space.getPositionX());
		}
		else
		{
			this.playerShip.setPositionX(shipSpeed*xDir + this.playerShip.getPositionX());
		}

		if(newY < sinistarShipTopBound || newY > sinistarShipBottomBound)
		{
			this.space.setPositionY(-shipSpeed*yDir + this.space.getPositionY());
		}
		else
		{
			this.playerShip.setPositionY(newY);
		}

		if(this.space.getPositionX() > 3600)
		{
			this.space.setPositionX(-3600);
			this.sinistar.posX -= 7200;
		}
		else if(this.space.getPositionX() < -3600)
		{
			this.space.setPositionX(3600);
			this.sinistar.posX += 7200;
		}
		else if(this.space.getPositionY() > 3000)
		{
			this.space.setPositionY(-3000);
			this.sinistar.posY -= 7200;
		}
		else if(this.space.getPositionY() < -3000)
		{
			this.space.setPositionY(3000);
			this.sinistar.posY += 7200;
		}
	}


	damageSinistar()
	{
		if(this.sinistarHealth > 0)
		{
			this.sinistar.listObjects.removeAt(this.sinistarHealth-1);
			if(this.sinistarHealth == 7 ||
				this.sinistarHealth == 2 ||
				this.sinistarHealth == 0)
			{
				var scream = new Audio("resources/REE.mp3");
				scream.play();
			}

		}
		else
		{
			var scream = new Audio("resources/REE.mp3");
				scream.play();
			sinistarWin = true;
		}
		this.sinistarHealth--;
	}

	sinistarMovement()
	{
		var [pX, pY] = this.playerShip.localToGlobal(
			this.playerShip.getPositionX(), this.playerShip.getPositionY());
		var [sX, sY] = this.sinistar.localToGlobal(
			this.sinistar.getPositionX(), this.sinistar.getPositionY());

		var dX = sX - pX;
		var dY = sY - pY;

		var angle = Math.atan(dY/dX);
		if(dX > 0){angle += Math.PI;}
		var moveX = sinistarSpeed * Math.cos(angle);
		var moveY = sinistarSpeed * Math.sin(angle);
		sinistarForceX += moveX;
		sinistarForceY += moveY;

		sinistarVelocityX += sinistarForceX/30;
		sinistarVelocityY += sinistarForceY/30;

		this.sinistar.setPositionX(sinistarVelocityX + this.sinistar.getPositionX() + moveX);
		this.sinistar.setPositionY(sinistarVelocityY + this.sinistar.getPositionY() + moveY);


		if(this.sinistar.collidesWith(this.playerShip))
		{
			playerHealth--;
			sinistarLoss = true;
		}

		if(this.sinistar.getPositionX() > 3600)
		{
			this.sinistar.setPositionX(-3600);
		}
		else if(this.sinistar.getPositionX() < -3600)
		{
			this.sinistar.setPositionX(3600);
		}
		else if(this.sinistar.getPositionY() > 3000)
		{
			this.sinistar.setPositionY(-3000);
		}
		else if(this.sinistar.getPositionY() < -3000)
		{
			this.sinistar.setPositionY(3000);
		}

		if(sinistarVelocityX > 30){sinistarVelocityX = 30;}
		if(sinistarVelocityX < -30){sinistarVelocityX = -30;}
		if(sinistarVelocityY > 30){sinistarVelocityY = 30;}
		if(sinistarVelocityY < -30){sinistarVelocityY = -30;}

		if(!introductionGiven && sX > 0 && sX < 2000 && sY > 0 && sY < 800)
		{
			var intro = new Audio("resources/I AM SINISTAR.mp3");
			intro.play();
			introductionGiven = true;
		}
		if(sY > 0 && sY < 800 && sX < 600)
		{
			taunt1Given = false;
		}

		if(!taunt1Given && sX > 600 && sY > 0 && sY < 800)
		{
			var taunt = new Audio("resources/RUN, COWARD!.mp3");
			taunt.play();
			taunt1Given = true;
		}
	}



	bombMovement()
	{
		for(var b = 0; b < this.bombList.size(); b++)
		{

			var bomb = this.bombList.get(b);

			var [pX, pY] = bomb.localToGlobal(
				bomb.getPositionX(), bomb.getPositionY());
			var [sX, sY] = this.sinistar.localToGlobal(
				this.sinistar.getPositionX(), this.sinistar.getPositionY());

			var dX = pX - sX;
			var dY = pY - sY;

			var angle = Math.atan(dY/dX);
			if(dX > 0){angle += Math.PI;}
			var moveX = bombSpeed * Math.cos(angle);
			var moveY = bombSpeed * Math.sin(angle);

			var bombVelocityX = moveX/20;
			var bombVelocityY = moveY/20;

			bomb.setPositionX(bombVelocityX + bomb.getPositionX() + moveX);
			bomb.setPositionY(bombVelocityY + bomb.getPositionY() + moveY);


			if(bomb.collidesWith(this.sinistar))
			{
				this.damageSinistar();
				bomb.setVisible(false);
				this.bombList.removeAt(b);
			}
		}
	}



	asteroidChecks()
	{
		for(var a = 0; a < this.asteroidList.size(); a++)
		{
			var asteroid = this.asteroidList.get(a);
			var [gaX, gaY] = asteroid.localToGlobal(asteroid.getPositionX(),
						asteroid.getPositionY());
			if(gaX > 0 && gaX < 1800 && gaY > 0 && gaY < 800)
			{
				for(var b = 0; b < this.boltList.size(); b++)
				{
					var bolt = this.boltList.get(b);
					if(asteroid.collidesWith(bolt))
					{
						this.asteroidHealthList.set(a,
							this.asteroidHealthList.get(a)-1);
						bolt.setVisible(false);
						if(this.asteroidHealthList.get(a) <= 0)
						{
							asteroid.setVisible(false);
							this.asteroidList.removeAt(a);
							this.bombCount += 1;
						}
					}
				}
				if(asteroid.collidesWith(this.sinistar))
				{
					sinistarForceX -= sinistarVelocityX*50;
					sinistarForceY -= sinistarVelocityY*50;
				}
				if(asteroid.collidesWith(this.playerShip))
				{
					this.space.setPositionX(this.space.getPositionX()
									+ shipVelocityX * 1.5);
					this.space.setPositionY(this.space.getPositionY()
									+ shipVelocityY * 1.5);
				}
			}
		}
	}



	update(pressedKeys, gamepads)
	{
		if(warningGiven == false)
		{
			var warning = new Audio("resources/BEWARE, I LIVE!.mp3");
			warning.play();
			warningGiven = true;
		}


		this.controls(pressedKeys);
		this.bombMovement();
		this.asteroidChecks();
		this.sinistarMovement();

		for(var b = 0; b < this.boltList.size(); b++)
		{
			var bolt = this.boltList.get(b);
			bolt.tchang = 1;
			bolt.computePosX();
			bolt.computePosY();

			if(bolt.collidesWith(this.sinistar))
			{
				this.boltList.removeAt(b);
				bolt.setVisible(false);
			}
			var [x, y] = [bolt.getPositionX(), bolt.getPositionY()];
			if(x < -200 || x > 2000 || y < -200 || y > 1000)
			{
				this.boltList.removeAt(b);
			}
			console.log(x)
		}

		var bX = 30;
		for(var i = 0; i < this.bombCountList.size(); i++)
		{
			var bomb = this.bombCountList.get(i);
			if(i < this.bombCount){bomb.setVisible(true);}
			else{bomb.setVisible(false);}
		}

		if(this.sinistarHealth <= 0){
			sinistarComplete = true;
		}

		sinistarForceX = 0;
		sinistarForceY = 0;

		console.log(this.boltList.size());
		if(this.sinistarHealth <= 0){
			sinistarComplete = true;
		}



		this.bombMovement();
		this.asteroidChecks();

		if(pressedKeys.contains(48)){
			sinistarComplete = true;
		}

	}

  /**
   * Draws this image to the screen
   */
  draw(g)
  {
    super.draw(g);

  }


}
