"use strict";

/**
 * A very basic arraylist for your convenience
 * 
 * */
class Gamepad{
	
	constructor(gamepad){
		this.gamepad = gamepad;
	}

	/**
	 * Gets a specific button by index. You don't really need to use this directly
	 */
	getButton(index){
		if(this.gamepad && this.gamepad.buttons && index>=0 && index<this.gamepad.buttons.length)
			return this.gamepad.buttons[index];
		return null;
	}

	/**
	 * given an index, returns boolean of whether or not that button is pressed
	 */
	buttonPressedByIndex(index){
		return this.buttonPressed(this.getButton(index));
	}

	/**
	 * Used internally, you don't need this one directly.
	 */
	buttonPressed(button) {
		if (typeof(button) == "object" && button) {
    		return button.pressed;
  		}
  		return button == 1.0;
	}

	/**
	 * Used internally, you don't need this one directly.
	 */
	getAxisById(index){
		if(this.gamepad && this.gamepad.axes && this.gamepad.axes[index]){
		 	return this.gamepad.axes[index];
		}
	}

	/**
	 * These next four methods get the values of the two stick axes (goes from -1 to 1)
	 */
	getLeftStickXAxis(){
		return this.getAxisById(0)
	}

	getLeftStickYAxis(){
		return this.getAxisById(1)
	}

	getRightStickXAxis(){
		return this.getAxisById(2)
	}

	getRightStickYAxis(){
		return this.getAxisById(3)
	}

	/**
	 * Useful for debugging info if you need to figure out which button is mapped to which integers, etc.
	 */
	printGamepadInfo(){
		if(!this.gamepad) return;
		for (var i = 0; i < this.gamepad.buttons.length; i++) {
			var button = this.gamepad.buttons[i];
			if(button && button.pressed) console.log("Button id: " + i + "; Pressed: " + button.pressed);
		}
		
		for (var i = 0; i < this.gamepad.axes.length; i++) {
			var axis = this.gamepad.axes[i];
			if(axis && Math.abs(axis)>0.5) console.log("Axis id: " + i + "; Value: " + axis);
		}
	}
}