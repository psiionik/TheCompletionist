"use strict";

class TweenTransition{
  constructor(){

  }

  applyTransition(transition, percentDone){
    if(transition == "linear"){
      return this.linear(percentDone);
    }
    if(transition == "easeInOutQuart"){
      return this.easeInOutQuart(percentDone);
    }

    if(transition =="easeInOutBounce"){
      return this.easeInOutBounce(percentDone);
    }

    if(transition == "easeOutBounce"){
      return this.easeOutBounce(percentDone);
    }

    if(transition == "easeInOutCubic"){
      return this.easeInOutCubic(percentDone);
    }

    if (transition == "easeInOutExpo"){
      return this.easeInOutExpo(percentDone);
    }

  }

  linear(percentDone){
    return percentDone;
  }

  easeInOutQuart(percentDone){
    if(percentDone < 0.5){
      percentDone *= percentDone;
      return 8*percentDone*percentDone;
    }
    else{
      percentDone = (--percentDone)*percentDone;
      return 1- 8*percentDone*percentDone;
    }
  }

  easeInOutBounce(percentDone){
    if( percentDone < 0.5 ) {
        return 8 * Math.pow( 2, 8 * (percentDone - 1) ) * Math.abs( Math.sin( percentDone * Math.PI * 7 ) );
    } else {
        return 1 - 8 * Math.pow( 2, -8 * percentDone ) * Math.abs( Math.sin( percentDone * Math.PI * 7 ) );
    }
  }

  easeOutBounce( percentDone ) {
    return 1 - Math.pow( 2, -6 * percentDone) * Math.abs( Math.cos( percentDone * Math.PI * 3.5 ) );
  }

  easeInOutCubic( percentDone ) {
    return percentDone < 0.5 ? 4 * percentDone * percentDone * percentDone : 1 + (--percentDone) * (2 * (--percentDone)) * (2 * percentDone);
  }

easeInOutExpo( percentDone ) {
    if( percentDone < 0.5 ) {
        return (Math.pow( 2, 16 * percentDone ) - 1) / 510;
    } else {
        return 1 - 0.5 * Math.pow( 2, -16 * (percentDone - 0.5) );
    }
  }
}
