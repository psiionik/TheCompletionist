"use strict";

class Map{
  constructor(){
    this.mapList = [];
  }


  getValue(key){
    var result;

    this.mapList.forEach(pairs => {
      if (pairs[0] == key){
        result = pairs[1];
      }
    })

    return result;
  }

  getListValues(key){
    var resultList = [];

    this.mapList.forEach(pairs =>{
      if (pairs[0] == key){
        resultList.push(pairs[1]);
      }
    })
    return resultList;
  }

  setPair(key, value){
    this.mapList.push([key, value]);
  }

  setValue(key, newVal){
    this.mapList.forEach(pairs => {
      if (pairs[0] == key){
        pairs[1] = newVal;
      }
    })
  }

  removeValue(key, value){
    this.mapList.forEach(pairs => {
      if (pairs[1] == value){
        this.mapList.remove([key, value]);
      }
    })

  }
  size(){
		return this.mapList.length;
	}
}
