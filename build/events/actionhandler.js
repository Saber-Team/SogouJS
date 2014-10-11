/** 
 * Sogou JavaScript Library 
 * 2014-10-11 build 
 */
define("Sogou.Events.ActionHandler",["Sogou.Util","Sogou.Events.Util","Sogou.Events.BrowserEvent","Sogou.Events.EventTarget","Sogou.Events.EventType","Sogou.Events.KeyCodes","Sogou.UA.Util","Sogou.Events.ActionEvent","Sogou.Events.BeforeActionEvent"],function(a,b,c,d,e,f,g,h,i){"use strict";var j=g.isGECKO?e.KEYPRESS:e.KEYDOWN,k=function(a){d.call(this),this.element_=a,b.listen(a,j,this.handleKeyDown_,!1,this),b.listen(a,e.CLICK,this.handleClick_,!1,this)};return a.inherits(k,d),k.prototype.handleKeyDown_=function(a){(a.keyCode===f.ENTER||g.isWEBKIT&&a.keyCode===f.MAC_ENTER)&&this.dispatchEvents_(a)},k.prototype.handleClick_=function(a){this.dispatchEvents_(a)},k.prototype.dispatchEvents_=function(a){var b=new i(a);if(this.dispatchEvent(b)){var c=new h(a);try{this.dispatchEvent(c)}finally{a.stopPropagation()}}},k.prototype.disposeInternal=function(){k.superClass_.disposeInternal.call(this),b.unlisten(this.element_,j,this.handleKeyDown_,!1,this),b.unlisten(this.element_,e.CLICK,this.handleClick_,!1,this),delete this.element_},k});