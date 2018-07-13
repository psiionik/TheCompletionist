"use strict";


class PlayerSprite extends PhysicsSprite{

  constructor(id, filename){
    super(id, filename);

  }

  update(pressedKeys, gamepads){
    super.update();
  }

  draw(g){
    super.draw(g);
  }

  getGlobalHitbox(){
    var t = this.getGlobalTransform();

    var p_1 = t.transformPoint(this.xSize*.1,this.ySize*.1);
    var p_2 = t.transformPoint(this.xSize*.8, this.ySize*.1);
    var p_3 = t.transformPoint(this.xSize*.1, this.ySize);
    var p_4 = t.transformPoint(this.xSize*.8, this.ySize);

    return {p1:p_1, p2:p_2, p3:p_3, p4:p_4};
  }
}
