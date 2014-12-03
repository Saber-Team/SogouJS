/** Oslo JavaScript Framework. */
define("@debug.logBuffer",["@debug.logRecord"],function(a){"use strict";var b=null,c=function(){this.clear()};return c.getInstance=function(){return b||(b=new c),b},c.CAPACITY=0,c.prototype.buffer_=null,c.prototype.curIndex_=-1,c.prototype.isFull_=!1,c.prototype.addRecord=function(b,d,e){var f=(this.curIndex_+1)%c.CAPACITY;if(this.curIndex_=f,this.isFull_){var g=this.buffer_[f];return g.reset(b,d,e),g}return this.isFull_=f===c.CAPACITY-1,this.buffer_[f]=new a(b,d,e)},c.isBufferingEnabled=function(){return c.CAPACITY>0},c.prototype.clear=function(){this.buffer_=new Array(c.CAPACITY),this.curIndex_=-1,this.isFull_=!1},c.prototype.forEachRecord=function(a){var b=this.buffer_;if(b[0]){var d=this.curIndex_,e=this.isFull_?d:-1;do e=(e+1)%c.CAPACITY,a(b[e]);while(e!==d)}},c});