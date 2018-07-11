"use strict";

/**
 * A very clock for keeping time (between frames or otherwise)
 *
 * */
class GameClock{

	constructor(){
		this.resetGameClock();
		this.cl;
		this.x;
	}

	/**
	 * Returns Milliseconds passed since the last time resetGameClock() was called
	 */
	getElapsedTime(){
		this.cl = new Date().getTime();
		this.x = this.cl - this.start;
		var seconds = this.x/1000;
		return seconds;
	}

	resetGameClock(){
		this.start = new Date().getTime();
	}

	pauseClock(val){
		this.cl.setSeconds(this.x/1000);
	}
}
