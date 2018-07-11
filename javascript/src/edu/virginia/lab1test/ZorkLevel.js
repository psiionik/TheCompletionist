"use strict";

var trollComplete = false;
var trollLoad = false;

var trollLose = false;

class ZorkLevel extends DisplayObjectContainer
{

	constructor(id, filename)
	{
		super(id,filename);
		this.lines = new ArrayList();
		this.canvas = document.getElementById("game");
		this.ctx = this.canvas.getContext("2d");
		this.ctx.font = "30px Courier";
		this.ctx.fillStyle = "green";
		this.textY = 50;
		this.ctx.fillText("Hello World",10,50);
		this.lines.add("The Troll Room");
		this.lines.add("------------------------------------");
		this.lines.add("This is a small room with passages off in all directions.");
		this.lines.add("Bloodstains and deep scratches (perhaps made by an axe) mar the walls.");
		this.lines.add("A nasty-looking troll, brandishing a bloody axe, ");
		this.lines.add("blocks all passages out of the room.");
		this.lines.add("");
		this.lines.add("Your sword has begun to glow very brightly.");
		this.lines.add("");


		this.previouslyPressedKeys = new ArrayList();
		this.input = "";

		this.swingNumber = 0;
		this.hasBeenHit = false;
		this.lit = true;

	}

	hit()
	{
		if(!this.hasBeenHit)
		{
			switch(this.swingNumber)
			{
				case 0:
					this.lines.add("Clang! Crash! The troll parries.");
					this.lines.add("The troll's axe barely misses your ear.");
					break;
				case 1:
					this.lines.add("You've knocked the troll down!");
					this.lines.add("The troll's axe barely misses your ear.");
					break;
				case 2:
					this.lines.add("The troll is confused and can't fight back.");
					this.lines.add("The troll slowly regains his feet.");
					break;
				case 3:
					this.lines.add("The troll is knocked out!");
					break;
				case 4:
					this.lines.add("The unarmed troll cannot defend himself.");
					this.lines.add("He dies.");
					this.lines.add("");
					this.lines.add("Almost as soon as the troll breathes his last breath,");
					this.lines.add("a cloud of sinister black fog envelops him,");
					this.lines.add("and when the fog lifts, the carcass has disappeared.");
					this.lines.add("");
					this.lines.add("Your sword is no longer glowing.");

					break;
			}
			this.swingNumber++;
		}
		else
		{
			lines.add("You are still recovering from the last blow, so your attack is ineffective.");
			lines.add("The troll's axe barely misses your ear.");
			this.hasBeenHit = false;
		}
	}

	handleInput(input)
	{
		var text = input.toLowerCase();
		console.log(text);
		if(this.lit)
		{
			if((text.includes("hit") || text.includes("strike") ||
					 text.includes("swing") || text.includes("kill")))
			{
				if(text.includes("troll"))
				{
					if(text.includes("sword"))
					{
						this.hit();
					}
					else
					{
						this.lines.add("Hit the troll with what?");
						this.lines.add("");
					}
				}
				else if(text.includes("self") || text.includes("me"))
				{
					this.lines.add("Guess you'll die!");
					trollLose = true;
					playerHealth--;
				}
			}
			else if(text.includes("go"))
			{
				this.lines.add("The troll growls menacingly, blocking your way.");
			}
			else if(text == "i" || text.includes("inventory"))
			{
				this.lines.add("Sword");
				this.lines.add("Lamp");
			}
			else if(text.includes("lamp") && text.includes("off"))
			{
				this.lines.add("The room is pitch black.");
				this.lines.add("You are likely to be eaten by a gru.");
			}
			else
			{
				this.lines.add("I'm not sure what you mean by that.");
				playerHealth--;
			}
		}
		else
		{
			this.lines.add("While trying to do that,");
			this.lines.add("you fall into a pit and die.")
			trollLose = true;
			playerHealth = 0;
		}
	}


	update(pressedKeys, gamepads)
	{
		super.update(pressedKeys, gamepads);


		for(var i = 0; i < pressedKeys.size(); i++)
		{
			var c = String.fromCharCode(pressedKeys.get(i));
			console.log(c);
			if(!this.previouslyPressedKeys.contains(c))
			{
				if(pressedKeys.get(i) >= 65 && pressedKeys.get(i) <= 90 || pressedKeys.get(i) == 32)
				{
					this.input = this.input + c;
				}
				else if(c == "\r")
				{
					this.lines.add(this.input);
					this.handleInput(this.input);
					this.lines.add("");
					this.input = "";
				}
				else if(c == "\b")
				{
					this.input = this.input.substring(0, this.input.length-1);
				}
			}
			c = c.toLowerCase();
			//if(pressedKeys.contains(20)){c = c.toUpperCase();}
			this.previouslyPressedKeys.add(c);
		}

		this.previouslyPressedKeys = new ArrayList();
		for(var i = 0; i < pressedKeys.size(); i++)
		{
			var c = String.fromCharCode(pressedKeys.get(i));
			this.previouslyPressedKeys.add(c);
		}


		if(this.swingNumber == 5){
			trollComplete = true;
		}

		if(pressedKeys.contains(48)){
			trollComplete = true;
		}

	}

	draw(g)
	{
		super.draw(g);

		var lastLinePosition = 600;
		for(var i = this.lines.size()-1; i >= 0; i--)
		{
			var l = this.lines.get(i);
			this.ctx.fillText(l, 10, lastLinePosition);
			lastLinePosition -= 30;
		}

		this.ctx.fillText(">" + this.input, 10, 630);
	}


}
