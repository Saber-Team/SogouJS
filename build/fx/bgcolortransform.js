/** Sogou JavaScript Framework.  2014-11-06 build */
define("Sogou.FX.BgColorTransform",["Sogou.Util","Sogou.Color","Sogou.Events.Util","Sogou.FX.EventType","Sogou.Style.Util","Sogou.FX.EffectBase"],function(a,b,c,d,e,f){"use strict";var g=function(a,b,c){if(3!==b.length||3!==c.length)throw Error("Start and end points must be 3D");f.apply(this,arguments)};return a.inherits(g,f),g.prototype.setColor=function(){for(var a=[],b=0;b<this.coords.length;b++)a[b]=Math.round(this.coords[b]);this.element.style.backgroundColor="rgb("+a.join(",")+")"},g.prototype.updateStyle=function(){this.setColor()},g.fadeIn=function(a,f,h,i){var j,k=a.style.backgroundColor||"",l=e.getBackgroundColor(a);j=l&&"transparent"!==l&&"rgba(0, 0, 0, 0)"!==l?b.hexToRgb(b.parse(l).hex):[255,255,255];var m=new g(a,f,j,h);function n(){a.style.backgroundColor=k}i?i.listen(m,d.END,n):c.listen(m,d.END,n),m.play()},g});