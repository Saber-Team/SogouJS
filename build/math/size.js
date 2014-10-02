/** 
 * Sogou JavaScript Library 
 * 2014-10-02 build 
 */
define("Sogou.Math.Size",[],function(){"use strict";var a=function(a,b){this.width=a,this.height=b};return a.equals=function(a,b){return a===b?!0:a&&b?a.width===b.width&&a.height===b.height:!1},a.prototype.clone=function(){return new a(this.width,this.height)},a.prototype.getLongest=function(){return Math.max(this.width,this.height)},a.prototype.getShortest=function(){return Math.min(this.width,this.height)},a.prototype.area=function(){return this.width*this.height},a.prototype.perimeter=function(){return 2*(this.width+this.height)},a.prototype.aspectRatio=function(){return this.width/this.height},a.prototype.isEmpty=function(){return!this.area()},a.prototype.ceil=function(){return this.width=Math.ceil(this.width),this.height=Math.ceil(this.height),this},a.prototype.fitsInside=function(a){return this.width<=a.width&&this.height<=a.height},a.prototype.floor=function(){return this.width=Math.floor(this.width),this.height=Math.floor(this.height),this},a.prototype.round=function(){return this.width=Math.round(this.width),this.height=Math.round(this.height),this},a.prototype.scale=function(a,b){var c="number"==typeof b?b:a;return this.width*=a,this.height*=c,this},a.prototype.scaleToFit=function(a){var b=this.aspectRatio()>a.aspectRatio()?a.width/this.width:a.height/this.height;return this.scale(b)},a});