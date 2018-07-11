"use strict";

var levelComplete = false;
var endLevelSelector = false;

class LevelSelector extends DisplayObjectContainer{

  constructor(id, filename){
    super(id, filename);
    this.bowserHead = new Sprite("bowser", "heads/bowserhead.png");
    this.crashmanHead = new Sprite("crashman", "heads/crashmanhead.png");
    this.sinistarHead = new Sprite("sinistar", "heads/sinistarhead.png");
    this.zorkHead = new Sprite("zork", "heads/zork.png");
    this.deathHead = new Sprite("death", "death/deathhead.png");

    this.backgrounds = new Sprite("background", "/startscreenSprites/levelselectorbackground.png");
    this.backgrounds.setSize(2000,700);
    this.backgrounds.xPos = 600;
    this.backgrounds.yPos = 350;

    this.bowserHead.xPos = 120;
    this.bowserHead.yPos = 200;
    this.bowserHead.setSize(75, 75);

    this.crashmanHead.xPos = 430;
    this.crashmanHead.yPos = 200;
    this.crashmanHead.setSize(75, 75);

    this.sinistarHead.xPos = 765;
    this.sinistarHead.yPos = 200;
    this.sinistarHead.setSize(75, 75);

    this.zorkHead.xPos = 1090;
    this.zorkHead.yPos = 200;
    this.zorkHead.setSize(75, 75);

    this.deathHead.xPos = 1375;
    this.deathHead.yPos = 200;
    this.deathHead.setSize(75,75);

    this.selection = new ArrayList();
    this.current = 0;
    this.selection.add(this.bowserHead);
    this.selection.add(this.crashmanHead);
    this.selection.add(this.sinistarHead);
    this.selection.add(this.zorkHead);
    this.selection.add(this.deathHead);

    this.counter1 = 0;
    this.counter2 = 0;

    // this.eventList = new ArrayList();
    this.bowserEvent = new Event("bowser");
    this.crashmanEvent = new Event("crashman");
    this.sinistarEvent = new Event("sinistar");
    this.zorkEvent = new Event("zork");
    this.deathEvent = new Event("death");
    // this.eventList.add(this.bowserEvent);
    // this.eventList.add(this.crashmanEvent);
    // this.eventList.add(this.sinistarEvent);
    // this.eventList.add(this.zorkEvent);
    // this.eventList.add(this.deathEvent);

  }

  update(pressedKeys, gamepads){
    super.update();
    for(var i =0; i < this.selection.size(); i++){
      if ( i == this.current){
        this.selection.get(i).scaleX = 2;
        this.selection.get(i).scaleY = 2;
      }
      else{
        this.selection.get(i).scaleX = 1;
        this.selection.get(i).scaleY = 1;
      }
    }

    if(pressedKeys.contains(39)){
      this.counter1++;
      if(this.counter1 == 3){
        this.current++;
        // var x = 0;
        // for(var l = 0; l < this.selection.size(); l++){
        //   if(this.selection.get(l) ==0){
        //     x++;
        //   }
        // }
        // current += x;
        if(this.current >= this.selection.size()){
          this.current = 0;
        }
        this.counter1 = 0;
      }
    }
    if(pressedKeys.contains(37)){
      this.counter2++;
      if(this.counter2 == 3){
        this.current--;
        // var x = 0;
        // for(var l = 0; l < this.selection.size(); l++){
        //   if(this.selection.get(l) ==0){
        //     x--;
        //   }
        // }
        // current -= x;
        if(this.current < 0){
          this.current = this.selection.size() -1 ;
        }
        this.counter2 = 0;
      }
    }

    if(pressedKeys.contains(13)){
      pressedKeys.removeIns(13);
      if(this.selection.get(this.current).id == "bowser"){
        // this.parent.addChild(this.parent.parent.listOfGames(1));
        // this.parent.removeByIndex(0);
        this.selection.get(this.current).alphaVal = 0.2;
        this.selection.get(this.current).scaleX = 1;
        this.selection.get(this.current).scaleY = 1;
        // this.selection.set(0,0);
        bowserLoad= true;

      }
      if(this.selection.get(this.current).id == "crashman"){
        // this.parent.addChild(this.parent.parent.listOfGames(1));
        // this.parent.removeByIndex(0);
        this.selection.get(this.current).alphaVal = 0.2;
        this.selection.get(this.current).scaleX = 1;
        this.selection.get(this.current).scaleY = 1;
        // this.selection.removeIns(this.crashmanHead);
        crashmanLoad= true;
      }
      if(this.selection.get(this.current).id == "death"){
        // this.parent.addChild(this.parent.parent.listOfGames(1));
        // this.parent.removeByIndex(0);
        this.selection.get(this.current).alphaVal = 0.2;
        this.selection.get(this.current).scaleX = 1;
        this.selection.get(this.current).scaleY = 1;
        // this.selection.removeIns(this.deathHead);
        deathLoad= true;
      }
      if(this.selection.get(this.current).id == "sinistar"){
        // this.parent.addChild(this.parent.parent.listOfGames(1));
        // this.parent.removeByIndex(0);
        this.selection.get(this.current).alphaVal = 0.2;
        this.selection.get(this.current).scaleX = 1;
        this.selection.get(this.current).scaleY = 1;
        // this.selection.removeIns(this.sinistarHead);
        sinistarLoad= true;
      }
      if(this.selection.get(this.current).id == "zork"){
        // this.parent.addChild(this.parent.parent.listOfGames(1));
        // this.parent.removeByIndex(0);
        this.selection.get(this.current).alphaVal = 0.2;
        this.selection.get(this.current).scaleX = 1;
        this.selection.get(this.current).scaleY = 1;
        // this.selection.removeIns(this.zorkHead);
        trollLoad= true;
      }
    }

  }

  draw(g){
    super.draw(g);
    this.backgrounds.draw(g);
    this.bowserHead.draw(g);
    this.crashmanHead.draw(g)
    this.sinistarHead.draw(g);
    this.zorkHead.draw(g);
    this.deathHead.draw(g);

  }
}
