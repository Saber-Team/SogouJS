/** 
 * Sogou JavaScript Library 
 * 2014-10-02 build 
 */
sogou("Sogou.FX.AnimationEvent",["Sogou.Util","Sogou.Array","Sogou.Events.EventBase"],function(a,b,c){"use strict";var d=function(a,b){c.call(this,a),this.coords=b.coords,this.x=b.coords[0],this.y=b.coords[1],this.z=b.coords[2],this.duration=b.duration,this.progress=b.getProgress(),this.fps=b.fps_,this.state=b.getStateInternal()};return a.inherits(d,c),d.prototype.coordsAsInts=function(){return b.map(this.coords,Math.round)},d});