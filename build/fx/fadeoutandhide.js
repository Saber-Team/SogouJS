/** 
 * Sogou JavaScript Library 
 * 2014-10-09 build 
 */
sogou("Sogou.FX.FadeOutAndHide",["Sogou.Util","Sogou.FX.Fade"],function(a,b){"use strict";var c=function(a,c,d){b.call(this,a,1,0,c,d)};return a.inherits(c,b),c.prototype.onBegin=function(){this.show(),c.superClass_.onBegin.call(this)},c.prototype.onEnd=function(){this.hide(),c.superClass_.onEnd.call(this)},c});