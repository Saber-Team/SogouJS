/** 
 * Sogou JavaScript Library 
 * 2014-10-09 build 
 */
sogou("Sogou.FX.Scroll",["Sogou.Util","Sogou.Style.Bidi","Sogou.FX.EffectBase"],function(a,b,c){"use strict";var d=function(a,b,d){if(2!=b.length||2!=d.length)throw Error("Start and end points must be 2D");c.apply(this,arguments)};return a.inherits(d,c),d.prototype.updateStyle=function(){this.isRightPositioningForRtlEnabled()?b.setScrollOffset(this.element,Math.round(this.coords[0])):this.element.scrollLeft=Math.round(this.coords[0]),this.element.scrollTop=Math.round(this.coords[1])},d});