/** 
 * Sogou JavaScript Library 
 * 2014-10-02 build 
 */
sogou("Sogou.FX.FadeInAndShow",["Sogou.Util","Sogou.FX.Fade"],function(a,b){"use strict";var c=function(a,c,d){b.call(this,a,0,1,c,d)};return a.inherits(c,b),c.prototype.onBegin=function(){this.show(),c.superClass_.onBegin.call(this)},c});