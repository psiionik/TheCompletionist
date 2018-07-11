"use strict";

/**
 * Affine Transforms
 *
 * */
class AffineTransform{

	constructor(){
		this.transform = this.identity();
	}

	/* Returns the identity matrix as an array */
	identity(){
		return [[1.0,0.0,0.0],[0.0,1.0,0.0],[0.0,0.0,1.0]];
	}

	/* Takes a point in the local coordinate system and transforms it to global space given this AffineTransform */
	transformPoint(x, y){
		var ret = {};
		ret.x = this.transform[0][0]*x + this.transform[0][1]*y + this.transform[0][2];
		ret.y = this.transform[1][0]*x + this.transform[1][1]*y + this.transform[1][2];
		return ret;
	}

	/* Add another transform to this one, is basically just matrix multiply */
	concatenate(at){
		var fin = this.identity();

		/* Matrix Multiply */
		for(var i=0; i<3; i++){
			for(var j=0; j<3;j++){
				var tot = 0.0;
				for(var pos=0; pos<3; pos++){
					tot += this.transform[i][pos]*at.transform[pos][j];
				}
				fin[i][j] = tot;
			}
		}

		this.transform = fin;
	}

	/* Move points in the x and y direction */
	translate(x, y){
		var at = new AffineTransform();
		at.transform[0][2] = x;
		at.transform[1][2] = y;
		this.concatenate(at);
	}

	/* rotate points by r radians */
	rotate(r){
		var at = new AffineTransform();
		at.transform[0][0] = Math.cos(r);
		at.transform[0][1] = -1*Math.sin(r);
		at.transform[1][0] = Math.sin(r);
		at.transform[1][1] = Math.cos(r);
		this.concatenate(at);
	}

	/* scale in the x and y direction accordingly */
	scale(x, y){
		var at = new AffineTransform();
		at.transform[0][0] = x;
		at.transform[1][1] = y;
		this.concatenate(at);
	}

	/* NOTE: I did not implement shear, as I don't expect anyone to use it */
}
