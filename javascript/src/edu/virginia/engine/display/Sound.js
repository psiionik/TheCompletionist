"use strict";

class Sound{
  constructor(id, filename){
    // this.sound = document.createElement("AUDIO");

    // this.sound.src = filename;
    // this.id = id;
    // // this.sound.setAttribute("preload", "auto");
    // this.sound.setAttribute("controls", "none");
    // this.sound.style.display = "none";
    // document.body.appendChild(this.sound);
    // this.sound.autoplay = true;
    // this.sound.loop = true;
    this.sound = new Audio(filename);
    this.sound.loop = false;
  }

  playSound(){
    this.sound.play();
  }

  stopSound(){
    this.sound.pause();
  }
}
