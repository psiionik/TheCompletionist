"use strict";

/**
 * A very basic display object for a javascript based gaming engine
 *
 * */

class DisplayObject extends EventDispatcher{

	constructor(id, filename){
		super(id);
		this.id = id;
		this.loaded = false;
		this.loadImage(filename);
		this.s = true;
		this.rotateVal = 0;
		this.alphaVal = 1;
		this.scaleX = 1;
		this.scaleY = 1;
		this.visible = true;
		this.start = true;
		this.parent;
		this.parentList = [];
		this.xSize = 80;
    this.ySize = 80;
		this.x;
		this.y = 0;
		this.pivX = this.xSize/2;
		this.pivY = this.ySize/2;
		this.changY =0;
		this.changX = 0;
		this.isCircle = false;
		// this.rect = new Rectangle(-this.pivX, -this.pivY, this.xSize, this.ySize);
	}

	/**
	 * Loads the image, sets a flag called 'loaded' when the image is ready to be drawn
	 */
	loadImage(filename){
		var t = this;
		this.displayImage = new Image();
		this.displayImage.src = 'resources/' + filename;

  		this.displayImage.onload = function(){
  			t.loaded = true;
				// this.imgHeight = this.displayImage.clientHeight;
				// this.imgWidth = this.displayImage.width;
  		};
			this.x = this.displayImage.width;
			this.y = this.displayImage.naturalHeight;
	}

	setImage(name){
		this.displayImage.src = 'resources/' + name;
	}

	centerPivot(x, y){
		this.pivX = x;
		this.pivY = y;
	}

	getParents(){
		if (this.parent != null){
			this.parentList = this.parent.getParents();
			this.parentList.push(this.parent);
		}
		else{
			this.parentList = [];
		}
		return this.parentList.slice();
	}

	//My iteration of the hitbox

	// getLocalHitBox(){
	// 	return this.rect;
	// }
	//
	// getGlobalHitBox(){
	// 	var ar = this.localToGlobal(this.xPos,this.yPos)
	// 	var tempRect = new Rectangle(ar[0] - this.pivX, ar[1] - this.pivY, this.xSize, this.ySize);
	// 	return tempRect;
	//
	// }
	//
	//
	//
	localToGlobal(x, y){
		var l = this.getParents();
		for (var i =0; i < l.length; i++){
			x += l[i].xPos;
			y += l[i].yPos;
		}
		return [x, y];
	}
	//
	// globalToLocal(x, y){
	// 	var q = this.localtoGlobal(0, 0);
	// 	return [x - q[0], y - q[1]];
	// }
	//
	//
	// collidesWith(obj){
	// 	var obj1 = this.getGlobalHitBox();
	// 	var obj2 = obj.getGlobalHitBox();
	//
	// 	// console.log("obj1 x: " + obj1.x);
	// 	// console.log("obj1 y: " + obj1.y);
	// 	// console.log("obj2 x: " + obj2.x);
	// 	// console.log("obj2 y: " + obj2.y);
	// 	// console.log(obj2.x + " " + obj2.y + " " + obj2.x + obj2.wid + " " + obj2.y + obj2.hei)
	// 	if(obj1.x + obj1.wid >= obj2.x && obj1.x <= (obj2.x + obj2.wid) && obj1.y + obj1.hei >= obj2.y && obj1.y <= obj2.y + obj2.hei){
	//
	// 		return true;
	// 	}
	// 	else{
	// 		return false;
	// 	}
	// }

	//Professors iteration of the hitbox with the affinetransform
	/*
	 * Gets the local transformation of this DO
	 * */
	getLocalTransform(){
		var at = new AffineTransform();
		at.translate(this.xPos, this.yPos);
		at.rotate(this.rotateVal*Math.PI/180);
		at.scale(this.scaleX, this.scaleY);
		at.translate(-1*this.pivX, -1*this.pivY);
		return at;
	}

	getGlobalTransform(){
		var at = new AffineTransform();
		if(this.parent != null){
			at = this.parent.getGlobalTransform();
			at.translate(this.parent.pivX, this.parent.pivY);
		}

		at.concatenate(this.getLocalTransform());
		return at;
	}

	/* Returns the four corner points of the hitbox in global coordinate system  */
	getGlobalHitbox(){
		var t = this.getGlobalTransform();

		var p_1 = t.transformPoint(this.xSize*.1,this.ySize*.1);
		var p_2 = t.transformPoint(this.xSize*.8, this.ySize*.1);
		var p_3 = t.transformPoint(this.xSize*.1, this.ySize);
		var p_4 = t.transformPoint(this.xSize*.8, this.ySize);

		return {p1:p_1, p2:p_2, p3:p_3, p4:p_4};
	}

	// getGlobalCircleHitbox(){
	// 	var t = this.getGlobalTransform();
	//
	// 	var p_1 = t.transformPoint(0,0);
	// 	var p_2 = t.transformPoint(this.xSize, 0);
	// 	var p_3 = t.transformPoint(0, this.ySize);
	// 	var p_4 = t.transformPoint(this.xSize, this.ySize);
	//
	// 	return {p1:p_1, p2:p_2, p3:p_3, p4:p_4};
	// }

	/**
	Our overall strategy for hit detection is to take two hitboxes and see if any of the four corners of one hitbox is inside the other hitbox.
	To figure this out, given one point and one hitbox, we cast a line segment from the point to the right well beyond the bounds of the box (100 px)
	We then figure out how many of the hitboxes sides that new line segment intersects. If that number is odd, then the point is inside. If 0 or 2, then it is outside
	Because this line segment we create from this point is horizontal, the calculations are MUCH easier.
	*/

	/* Helper func: Returns true iff horizontal line segment at y height with xMin, xMax as bounds intersects the line segment between points p1 and p2 */
	horLineIntersects(y, xMin, xMax, p1, p2){
		/*.if y range doesn't match, just say no */
		if(!(y>=Math.min(p1.y,p2.y) && y<=Math.max(p1.y,p2.y))) return false;

		//Check special case where p1 and p2 make vertical line
		if(p1.x == p2.x) return p1.x >= xMin && p1.x <= xMax;

		//find formula of the line
		var m = (p2.y - p1.y) / (p2.x - p1.x);
		var b = p1.y - (m * p1.x);

		//find where this line segment has a y-value of exactly y (param)
		var lineX = (y - b) / m;

		return lineX >= xMin && lineX <= xMax;
	}

	/*.Given one other point, return true iff that point (in global space) is inside this object's global hitbox*/
	isInsideHitbox(p){
		var hb = this.getGlobalHitbox();

		//Get an x-coordinate well past the right edge of the hitbox
		var xMax = 100+Math.max(hb.p1.x, hb.p2.x, hb.p3.x, hb.p4.x);

		/* Our line segment is horizontal from p. So p and xMax,p.y */
		/*.For each edge of hb, see if this hor line intersects it */
		var count = 0;
		if(this.horLineIntersects(p.y, p.x, xMax, hb.p1, hb.p2)) count++;
		if(this.horLineIntersects(p.y, p.x, xMax, hb.p2, hb.p3)) count++;
		if(this.horLineIntersects(p.y, p.x, xMax, hb.p3, hb.p4)) count++;
		if(this.horLineIntersects(p.y, p.x, xMax, hb.p4, hb.p1)) count++;

 		/*.return true if odd (i.e., point started inside and crossed once to exit rectangle) */
		return (count%2) == 1;
	}

	/*.Finally, the collides with method. Just check if each corner is inside the other rectangle */
	collidesWith(other){
		var hb1 = this.getGlobalHitbox();
		var hb2 = other.getGlobalHitbox();

		if(this.isInsideHitbox(hb2.p1)) return true;
		if(this.isInsideHitbox(hb2.p2)) return true;
		if(this.isInsideHitbox(hb2.p3)) return true;
		if(this.isInsideHitbox(hb2.p4)) return true;

		if(other.isInsideHitbox(hb1.p1)) return true;
		if(other.isInsideHitbox(hb1.p2)) return true;
		if(other.isInsideHitbox(hb1.p3)) return true;
		if(other.isInsideHitbox(hb1.p4)) return true;

		return false;

	}









	/**
	 * Invoked every frame, manually for now, but later automatically if this DO is in DisplayTree
	 */
	update(){


		//rightarrow = 39
		//leftarrow = 37
		//uparrow = 38
		//downarrow = 40

		//q(clockwise) = 81
		//w(counterclockwise) = 87

		//a(scale up) = 65
		//s(scale down) = 83

		//z(more opaque) = 90
		//x(less opaque) = 88

		//v(hidden) = 86

		//i(pivot up) = 73
		//j(pivot left) = 74
		//k(pivot down) =  75
		//l(pivot right) = 76



	}

	/**
	 * Draws this image to the screen
	 */
	draw(g){
		if(this.displayImage){
			this.applyTransformations(g);
			if(this.loaded){


				g.drawImage(this.displayImage, -1*this.pivX, -1*this.pivY, this.xSize,this.ySize);

			}
			this.reverseTransformations(g);
		}
	}

	/**
	 * Applies transformations for this display object to the given graphics
	 * object
	 * */
	applyTransformations(g) {

		g.translate(this.xPos, this.yPos);
		g.scale(this.scaleX, this.scaleY);
		g.rotate(this.rotateVal*Math.PI / 180);
		g.globalAlpha = this.alphaVal;
		if(this.visible == false){
			// document.getElementById("game").style.visibility = "hidden";
			g.globalAlpha = 0;

		}
		else{
			// document.getElementById("game").style.visibility = "visible";
			g.globalAlpha = this.alphaVal;
		}
	}

	/**
	 * Reverses transformations for this display object to the given graphics
	 * object
	 * */
	reverseTransformations(g) {
		g.rotate(-1*this.rotateVal*Math.PI / 180);

		g.scale(1/this.scaleX, 1/this.scaleY);
		g.translate(-1*this.xPos, -1*this.yPos);

		// g.globalAlpha = 1;
	}


	ellipse(val ,offset, gap){
		// if (this.s == true){
		// 		val += 5;
		// 		if (val >= gap + offset){
		// 			this.s = false;
		// 		}
		// }
		// else{
		// 	val -= 5;
		// 	if(val <= 0 + offset){
		// 		this.s = true;
		// 	}
		// }
	// return val;
	// this.chag = val;
		return (gap*((Math.cos((val*Math.PI /180)) + 3)/4)) + offset;



	}


	/**
	 * THIS AREA CONTAINS MOSTLY GETTERS AND SETTERS!
	 *
	 */

	 getPivotX(){
	 	return this.pivX;
	 }

	 getPivotY(){
	 	return this.pivY;
	 }

	 setPivotX(val){
	 	this.pivX = val;
	 }

	 setPivotY(val){
	 	this.pivY = val;
	 }

	 getPositionX(){
		 return this.xPos;
	 }

	 getPositionY(){
		 return this.yPos;
	 }

	 setPositionX(val){
		 this.xPos = val;
	 }

	 setPositionY(val){
		 this.yPos = val;
	 }

	 getScaleX(){
		 return this.scaleX;
	 }

	 getScaleY(){
		 return this.scaleY;
	 }

	 setScaleX(val){
		 this.scaleX = val;
	 }

	 setScaleY(val){
		 this.scaleY = val;
	 }

	 getVisible(){
		 return this.visible;
	 }

	 setVisible(booleanVal){
		 this.visible = booleanVal;
	 }

	 getRotation(){
		 return this.rotateVal;
	 }

	 setRotation(val){
		 this.rotateVal = val;
	 }

	 getAlpha(){
		 return this.alphaVal;
	 }

	 setAlpha(val){
		 this.alphaVal = val;
	 }

	setId(id){this.id = id;}
	getId(){return this.id;}

	setDisplayImage(image){this.displayImage = image;} //image needs to already be loaded!
	getDisplayImage(){return this.displayImage;}

	getUnscaledHeight(){
		return this.displayImage.height;
	}
	getUnscaledWidth(){
		return this.displayImage.width;
	}

	setSize(x, y){
		this.xSize = x;
		this.ySize = y;
		this.pivX = this.xSize/2;
		this.pivY = this.ySize/2;
		// this.rect.x = -this.pivX;
		// this.rect.y = -this.pivY;
		// this.rect.wid = this.xSize;
		// this.rect.hei = this.ySize;
	}



}
