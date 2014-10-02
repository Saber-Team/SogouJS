/** 
 * Sogou JavaScript Library 
 * 2014-10-02 build 
 */
define("Sogou.Math.Coordinate",["Sogou.Util","Sogou.Math.Util"],function(a,b){"use strict";var c=function(b,c){this.x=a.isNull(b)?0:b,this.y=a.isNull(c)?0:c};return c.prototype.clone=function(){return new c(this.x,this.y)},c.equals=function(a,b){return a===b?!0:a&&b?a.x===b.x&&a.y===b.y:!1},c.distance=function(a,b){var c=a.x-b.x,d=a.y-b.y;return Math.sqrt(c*c+d*d)},c.magnitude=function(a){return Math.sqrt(a.x*a.x+a.y*a.y)},c.azimuth=function(a){return b.angle(0,0,a.x,a.y)},c.squaredDistance=function(a,b){var c=a.x-b.x,d=a.y-b.y;return c*c+d*d},c.difference=function(a,b){return new c(a.x-b.x,a.y-b.y)},c.sum=function(a,b){return new c(a.x+b.x,a.y+b.y)},c.prototype.ceil=function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},c.prototype.floor=function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},c.prototype.round=function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},c.prototype.translate=function(b,d){return b instanceof c?(this.x+=b.x,this.y+=b.y):(this.x+=b,a.isNumber(d)&&(this.y+=d)),this},c.prototype.scale=function(b,c){var d=a.isNumber(c)?c:b;return this.x*=b,this.y*=d,this},c});