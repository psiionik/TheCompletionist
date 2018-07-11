"use strict";


class DisplayObjectContainer extends DisplayObject{

  constructor(id, filename){
    super(id, filename);


    this.listObjects = new ArrayList();

  }


  update(pressedKeys, gamepads){
    super.update();
    for (var i = 0; i < this.listObjects.size(); i++){
      this.listObjects.get(i).update(pressedKeys, gamepads);
    }
	}

	/**
	 * Draws this image to the screen
	 */
	draw(g){
		super.draw(g);
    this.applyTransformations(g);

    for (var i = 0; i < this.listObjects.size(); i++){
      // console.log(this.getGlobalHitBox().x,this.getGlobalHitBox().y,this.getGlobalHitBox().wid, this.getGlobalHitBox().hei)
      // console.log("-------");
      // console.log(this.getLocalHitBox().x, this.getLocalHitBox().y, this.getLocalHitBox().wid, this.getLocalHitBox().hei);
      // g.lineWidth = 5;
      // g.strokeStyle = "#FFFFFF"
      // g.strokeRect(  this.listObjects.get(i).getGlobalHitBox().x,this.listObjects.get(i).getGlobalHitBox().y,this.listObjects.get(i).getGlobalHitBox().wid, this.listObjects.get(i).getGlobalHitBox().hei);
      // // g.strokeRect(this.getLocalHitBox().x,this.getLocalHitBox().y,this.getLocalHitBox().wid, this.getLocalHitBox().hei);
      //
      // g.clearRect(this.listObjects.get(i).getGlobalHitBox().x,this.listObjects.get(i).getGlobalHitBox().y,this.listObjects.get(i).getGlobalHitBox().wid, this.listObjects.get(i).getGlobalHitBox().hei);



      // this.drawHitbox(g, this.listObjects.get(i));



      this.listObjects.get(i).draw(g);
    }
    this.reverseTransformations(g);
	}

  drawHitbox(g, dobj){
    // if(dobj.isCircle){
    //
    // }
    // else{
      var hb = dobj.getGlobalHitbox();
  		g.lineWidth = 2.0;
  		g.strokeStyle = 'red';
  		// create the path
  		g.beginPath();
  		g.moveTo (hb.p1.x,hb.p1.y);   g.lineTo (hb.p2.x,hb.p2.y);
  		g.moveTo (hb.p2.x,hb.p2.y);   g.lineTo (hb.p4.x,hb.p4.y);
  		g.moveTo (hb.p4.x,hb.p4.y);   g.lineTo (hb.p3.x,hb.p3.y);
  		g.moveTo (hb.p3.x,hb.p3.y);   g.lineTo (hb.p1.x,hb.p1.y);
  		g.stroke();
    // }
	}

  addChild(obj){
    obj.parent = this;
    obj.parentList.push(this);
    // obj.centerPivot(this.pivX, this.pivY);
    this.listObjects.add(obj);
	}

	addChildAtIndex(obj, ind){
    var newStuff = [];
    obj.parent = this;
    obj.parentList.push(this);
    for (var i = 0; i <ind; i++){
      newStuff.push(this.listObjects[i]);
    }
    newStuff.push(obj);
    for (var j  = ind; ind < this.listObjects.length; j++){
      newStuff.push(this.listObjects[j]);
    }
    this.listObjects = newStuff;
	}


	removeChildObj(obj){
    this.listObjects.removeIns(obj);
	}

	removeByIndex(ind){
    this.listObjects.removeAt(ind);
	}


	removeAll(){
    this.listObjects.empty();
	}

  contains(obj){
    if (this.listObject.contains(obj)){
      return true;
    }
    else{
      return false;
    }
  }

  retrieveId(ids){
    var res;
    for (var i = 0; i < this.listObjects.length; i++){
      if(ids == this.listObjects.get(i).id){
        res = this.listObjects.get(i);
      }
    }
    if(res){
      return res;
    }
    else{
      return "Not in the list";
    }
  }

  retrieveInd(inde){
    return this.listObjects.get(inde);
  }

  getChildren(){
    return this.listObjects;
  }
}
