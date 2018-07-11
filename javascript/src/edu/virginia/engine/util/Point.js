"use strict";


class Point{
  constructor(x, y){
    this.poin = [[x], [y], [1]];
  }

  getDistance(point){
    var x2 = point.poin[0][0];
    var y2 = point.poin[1][0];

    return Math.hypot(x2-this.poin[0][0], y2-this.poin[1][0]);
  }
}
