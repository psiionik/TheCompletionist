"use strict";

class SoundManager{
  constructor(){
    this.soundList = new ArrayList();
  }

  addSound(sound){
    this.soundList.add(sound);
  }

  removeSound(sound){
    this.soundList.removeIns(sound);
  }

  playSoundEffect(id){
    for (var i = 0; i < this.soundList.size(); i++){
      if(this.soundList[i].id == id){
        this.soundList[i].playSound();
      }
    }
  }

  stopSoundEffect(id){
    for (var i = 0; i < this.soundList.size(); i++){
      if(this.soundList[i].id == id){
        this.soundList[i].stopSound();
      }
    }
  }
}
