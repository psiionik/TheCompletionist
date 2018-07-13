"use strict";

var levelComplete = false;
var endLevelSelector = false;

class LevelSelector extends DisplayObjectContainer{

  constructor(id, filename){
    super(id, filename);
    this.drawAll = new DisplayObjectContainer("drawAll", "");
    this.bowserHead = new Sprite("bowser", "heads/bowserhead.png");
    this.crashmanHead = new Sprite("crashman", "heads/crashmanhead.png");
    this.sinistarHead = new Sprite("sinistar", "heads/sinistarhead.png");
    this.zorkHead = new Sprite("zork", "heads/zork.png");
    this.deathHead = new Sprite("death", "death/deathhead.png");
    this.sansHead = new Sprite("sans", "sansface.png");

    this.ex1 = new Sprite("ex1", "final/exclamation.png");



    this.backgrounds = new Sprite("background", "/startscreenSprites/levelselectorbackground.png");
    this.backgrounds.setSize(1500,700);
    this.backgrounds.xPos = 750;
    this.backgrounds.yPos = 350;
    this.drawAll.addChild(this.backgrounds);
    this.drawAll.addChild(this.bowserHead);
    this.drawAll.addChild(this.crashmanHead);
    this.drawAll.addChild(this.sinistarHead);
    this.drawAll.addChild(this.zorkHead);
    this.drawAll.addChild(this.deathHead);
    this.drawAll.addChild(this.sansHead);





    this.bowserHead.xPos = 120;
    this.bowserHead.yPos = 200;
    this.bowserHead.setSize(75, 75);

    this.crashmanHead.xPos = 375;
    this.crashmanHead.yPos = 200;
    this.crashmanHead.setSize(75, 75);

    this.sinistarHead.xPos = 625;
    this.sinistarHead.yPos = 200;
    this.sinistarHead.setSize(75, 75);

    this.zorkHead.xPos = 875;
    this.zorkHead.yPos = 200;
    this.zorkHead.setSize(75, 75);

    this.deathHead.xPos = 1125;
    this.deathHead.yPos = 200;
    this.deathHead.setSize(75,75);

    this.sansHead.xPos = 1375;
    this.sansHead.yPos = 200;
    this.sansHead.setSize(75,75);

    this.selection = new ArrayList();
    this.current = 0;
    this.selection.add(this.bowserHead);
    this.selection.add(this.crashmanHead);
    this.selection.add(this.sinistarHead);
    this.selection.add(this.zorkHead);
    this.selection.add(this.deathHead);
    this.selection.add(this.sansHead);

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

    this.lastPressedRight = false;
    this.lastPressedLeft = false;
    this.lastPressedEnter = false;
    this.doing = false;
    this.cantMove = false;

    //Tweening
    this.tweening = new TweenJuggler();
    this.bowserHeadTween = new Tween(this.bowserHead, "easeInOutQuart");
    this.crashmanHeadTween = new Tween(this.crashmanHead, "easeInOutQuart");
    this.deathHeadTween = new Tween(this.deathHead, "easeInOutQuart");
    this.sinistarHeadTween = new Tween(this.sinistarHead, "easeInOutQuart");
    this.zorkHeadTween = new Tween(this.zorkHead, "easeInOutQuart");
    this.sansHeadTween = new Tween(this.sansHead, "easeInOutQuart");



    this.tweenTimer = new GameClock();



    this.bowserDone = false;
    this.crashmanDone = false;
    this.sinistarDone = false;
    this.zorkDone = false;
    this.deathDone = false;
    this.sansDone = false;

    this.ex1.yPos = 100;

    this.ready = new Sprite("ready", "final/ready.png");
    this.ready.setSize(278,84);
    this.readyTween = new Tween(this.ready, "easeInOutQuart");
    this.readySound = new Sound("ready sound", "resources/final/ready.mp3");

    this.go = new Sprite("go", "final/go.png");
    this.go.setSize(278,84);
    this.goTween = new Tween(this.go, "easeInOutQuart");
    this.goSound = new Sound("ready go", "resources/final/go.mp3");
    this.ready.yPos = 350;
    this.go.yPos =350;

    this.readyCounter= 0;

  }

  update(pressedKeys, gamepads){
    super.update();
    this.tweening.nextFrame();
    this.readyCounter++;


    if(winCounter >= 3 && this.bowserDone == false){
      this.bowserHead.addChild(this.ex1);

    }

    if(winCounter >= 3 && this.crashmanDone == false){
      this.crashmanHead.addChild(this.ex1);

    }

    if(winCounter >= 3 && this.sinistarDone == false){
      this.sinistarHead.addChild(this.ex1);

    }

    if(winCounter >= 3 && this.zorkDone == false){
      this.zorkHead.addChild(this.ex1);

    }

    if(winCounter >= 3 && this.deathDone == false){
      this.deathHead.addChild(this.ex1);

    }

    if(winCounter >= 3 && this.sansDone == false){
      this.sansHead.addChild(this.ex1);

    }
    if(this.doing == false){
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
    }

    if(this.cantMove == false){
      if(pressedKeys.contains(39)){
        if(this.lastPressedRight == false){
          this.lastPressedRight = true;
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
        }

      }
      else{
        this.lastPressedRight = false
      }
      if(pressedKeys.contains(37)){
        if(this.lastPressedLeft == false){
          this.lastPressedLeft = true;
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
        }

      }
      else{
        this.lastPressedLeft = false;
      }
    }




    if(pressedKeys.contains(13)){
      if(this.lastPressedEnter == false){
        this.lastPressedEnter = true;
        if(this.selection.get(this.current).id == "bowser" && this.bowserDone == false){
          this.tweenTimer.resetGameClock();
          this.drawAll.removeChildObj(this.bowserHead);
          this.drawAll.addChild(this.bowserHead);
          this.tweening.addTween(this.bowserHeadTween);
          this.bowserHeadTween.animateTween("xscale", 2, 100, 2);
          this.bowserHeadTween.animateTween("yscale", 2, 100, 2);
          this.drawAll.addChild(this.ready);
          this.tweening.addTween(this.readyTween);
          this.readyTween.animateTween("xpos", 0, 750, .5);
          this.readySound.playSound();
          this.readyCounter=0;
          this.doing = true;
          this.cantMove = true;
        }
        if(this.selection.get(this.current).id == "crashman" && this.crashmanDone == false){
          this.tweenTimer.resetGameClock();
          this.drawAll.removeChildObj(this.crashmanHead);
          this.drawAll.addChild(this.crashmanHead);
          this.tweening.addTween(this.crashmanHeadTween);
          this.crashmanHeadTween.animateTween("xscale", 2, 100, 2);
          this.crashmanHeadTween.animateTween("yscale", 2, 100, 2);
          this.drawAll.addChild(this.ready);
          this.tweening.addTween(this.readyTween);
          this.readyTween.animateTween("xpos", 0, 750, .5);
          this.readySound.playSound();
          this.readyCounter=0;
          this.doing = true;
          this.cantMove = true;
        }
        if(this.selection.get(this.current).id == "death" && this.deathDone == false){
          this.tweenTimer.resetGameClock();
          this.drawAll.removeChildObj(this.deathHead);
          this.drawAll.addChild(this.deathHead);
          this.tweening.addTween(this.deathHeadTween);
          this.deathHeadTween.animateTween("xscale", 2, 100, 2);
          this.deathHeadTween.animateTween("yscale", 2, 100, 2);
          this.drawAll.addChild(this.ready);
          this.tweening.addTween(this.readyTween);
          this.readyTween.animateTween("xpos", 0, 750, .5);
          this.readySound.playSound();
          this.readyCounter=0;
          this.doing = true;
          this.cantMove = true;
        }
        if(this.selection.get(this.current).id == "sinistar" && this.sinistarDone == false){
          this.tweenTimer.resetGameClock();
          this.drawAll.removeChildObj(this.sinistarHead);
          this.drawAll.addChild(this.sinistarHead);
          this.tweening.addTween(this.sinistarHeadTween);
          this.sinistarHeadTween.animateTween("xscale", 2, 100, 2);
          this.sinistarHeadTween.animateTween("yscale", 2, 100, 2);
          this.drawAll.addChild(this.ready);
          this.tweening.addTween(this.readyTween);
          this.readyTween.animateTween("xpos", 0, 750, .5);
          this.readySound.playSound();
          this.readyCounter=0;
          this.doing = true;
          this.cantMove = true;
        }
        if(this.selection.get(this.current).id == "zork" && this.zorkDone == false){
          this.tweenTimer.resetGameClock();
          this.drawAll.removeChildObj(this.zorkHead);
          this.drawAll.addChild(this.zorkHead);
          this.tweening.addTween(this.zorkHeadTween);
          this.zorkHeadTween.animateTween("xscale", 2, 100, 2);
          this.zorkHeadTween.animateTween("yscale", 2, 100, 2);
          this.drawAll.addChild(this.ready);
          this.tweening.addTween(this.readyTween);
          this.readyTween.animateTween("xpos", 0, 750, .5);
          this.readySound.playSound();
          this.readyCounter = 0;
          this.doing = true;
          this.cantMove = true;
        }
        if(this.selection.get(this.current).id == "sans" && this.sansDone == false){
          this.tweenTimer.resetGameClock();
          this.drawAll.removeChildObj(this.sansHead);
          this.drawAll.addChild(this.sansHead);
          this.tweening.addTween(this.sansHeadTween);
          this.sansHeadTween.animateTween("xscale", 2, 100, 2);
          this.sansHeadTween.animateTween("yscale", 2, 100, 2);
          this.drawAll.addChild(this.ready);
          this.tweening.addTween(this.readyTween);
          this.readyTween.animateTween("xpos", 0, 750, .5);
          this.readySound.playSound();
          this.readyCounter = 0;
          this.doing = true;
          this.cantMove = true;
        }
      }
    }
    else{
      this.lastPressedEnter = false;
    }

    if(this.readyCounter == 30 && this.doing == true){
      this.drawAll.removeChildObj(this.ready);
      this.drawAll.addChild(this.go);
      this.tweening.addTween(this.goTween);
      this.goTween.animateTween("xpos", 0, 750, .5);
      this.goSound.playSound();
    }

    if(parseInt(this.tweenTimer.getElapsedTime()) == 2 && this.doing == true){
      this.drawAll.removeChildObj(this.go);
      this.selection.get(this.current).alphaVal = 0.2;
      this.selection.get(this.current).scaleX = 1;
      this.selection.get(this.current).scaleY = 1;
      if(this.bowserDone == false && this.selection.get(this.current).id == "bowser"){
        if(this.bowserHead.listObjects.contains(this.ex1)){
          this.bowserHead.removeChildObj(this.ex1);
        }
        bowserLoad = true;
        this.bowserDone = true;
      }
      if(this.crashmanDone == false && this.selection.get(this.current).id == "crashman"){
        if(this.crashmanHead.listObjects.contains(this.ex1)){
          this.crashmanHead.removeChildObj(this.ex1);
        }
        crashmanLoad = true;
        this.crashmanDone = true;
      }
      if(this.deathDone == false && this.selection.get(this.current).id == "death"){
        if(this.deathHead.listObjects.contains(this.ex1)){
          this.deathHead.removeChildObj(this.ex1);
        }
        deathLoad = true;
        this.deathDone = true;
      }
      if(this.sinistarDone == false && this.selection.get(this.current).id == "sinistar"){
        if(this.sinistarHead.listObjects.contains(this.ex1)){
          this.sinistarHead.removeChildObj(this.ex1);
        }
        sinistarLoad = true;
        this.sinistarDone = true;
      }
      if(this.zorkDone == false && this.selection.get(this.current).id == "zork"){
        if(this.zorkHead.listObjects.contains(this.ex1)){
          this.zorkHead.removeChildObj(this.ex1);
        }
        trollLoad = true;
        this.zorkDone = true;
      }
      if(this.sansDone == false && this.selection.get(this.current).id == "sans"){
        if(this.sansHead.listObjects.contains(this.ex1)){
          this.sansHead.removeChildObj(this.ex1);
        }
        sansLoad = true;
        this.sansDone = true;
      }
      this.doing = false;
      this.cantMove = false;
    }

  }

  draw(g){
    super.draw(g);
    this.drawAll.draw(g);

  }
}
