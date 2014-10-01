/** 
 * Sogou JavaScript Library 
 * 2014-10-01 build 
 */
define("Sogou.Events.FocusHandler",["Sogou.Util","Sogou.Events.Util","Sogou.Events.BrowserEvent","Sogou.Events.EventTarget","Sogou.UA.Util"],function(a,b,c,d,e){"use strict";var f=function(a){d.call(this),this.element_=a;var c=e.isIE?"focusin":"focus",f=e.isIE?"focusout":"blur";this.listenKeyIn_=b.listen(this.element_,c,this,!e.isIE),this.listenKeyOut_=b.listen(this.element_,f,this,!e.isIE)};return a.inherits(f,d),f.EventType={FOCUSIN:"focusin",FOCUSOUT:"focusout"},f.prototype.handleEvent=function(a){var b=a.getBrowserEvent(),d=new c(b);d.type="focusin"===a.type||"focus"===a.type?f.EventType.FOCUSIN:f.EventType.FOCUSOUT,this.dispatchEvent(d)},f.prototype.disposeInternal=function(){f.superClass_.disposeInternal.call(this),b.unlistenByKey(this.listenKeyIn_),b.unlistenByKey(this.listenKeyOut_),delete this.element_},f});