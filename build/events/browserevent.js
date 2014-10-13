/** 
 * Sogou JavaScript Library 
 * 2014-10-14 build 
 */
define("Sogou.Events.BrowserEvent",["Sogou.Util","Sogou.Events.BrowserFeature","Sogou.Events.EventBase","Sogou.Events.EventType","Sogou.UA.Util"],function(a,b,c,d,e){"use strict";function f(a,b){a&&this.init(a,b)}return a.inherits(f,c),f.MouseButton={LEFT:0,MIDDLE:1,RIGHT:2},f.IEButtonMap=[1,4,2],a.mixin(f.prototype,{target:null,currentTarget:null,relatedTarget:null,offsetX:0,offsetY:0,clientX:0,clientY:0,screenX:0,screenY:0,button:0,keyCode:0,charCode:0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,state:null,platformModifierKey:!1,event_:null,init:function(b,f){var g=this.type=b.type;c.call(this,g),this.target=b.target||b.srcElement,this.currentTarget=f;var h=b.relatedTarget;if(h){var i=!1;try{a.nullFunction(h.nodeName),i=!0}catch(j){}e.isGECKO&&!i&&(h=null)}else g===d.MOUSEOVER?h=b.fromElement:g===d.MOUSEOUT&&(h=b.toElement);this.relatedTarget=h,this.offsetX=e.isWEBKIT||void 0!==b.offsetX?b.offsetX:b.layerX,this.offsetY=e.isWEBKIT||void 0!==b.offsetY?b.offsetY:b.layerY,this.clientX=void 0!==b.clientX?b.clientX:b.pageX,this.clientY=void 0!==b.clientY?b.clientY:b.pageY,this.screenX=b.screenX||0,this.screenY=b.screenY||0,this.button=b.button,this.keyCode=b.keyCode||0,this.charCode=b.charCode||("keypress"===g?b.keyCode:0),this.ctrlKey=b.ctrlKey,this.altKey=b.altKey,this.shiftKey=b.shiftKey,this.metaKey=b.metaKey,this.platformModifierKey=e.isMAC?b.metaKey:b.ctrlKey,this.state=b.state,this.event_=b,b.defaultPrevented&&this.preventDefault(),delete this.propagationStopped_},isButton:function(a){return b.HAS_W3C_BUTTON?this.event_.button===a:"click"===this.type?a===f.MouseButton.LEFT:!!(this.event_.button&f.IEButtonMap[a])},isMouseActionButton:function(){return this.isButton(f.MouseButton.LEFT)&&!(e.isWEBKIT&&e.isMAC&&this.ctrlKey)},stopPropagation:function(){f.superClass_.stopPropagation.call(this),this.event_.stopPropagation?this.event_.stopPropagation():this.event_.cancelBubble=!0},preventDefault:function(){f.superClass_.preventDefault.call(this);var a=this.event_;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,b.SET_KEY_CODE_TO_PREVENT_DEFAULT)try{var c=112,d=123;(a.ctrlKey||a.keyCode>=c&&a.keyCode<=d)&&(a.keyCode=-1)}catch(e){}},getBrowserEvent:function(){return this.event_},disposeInternal:function(){}}),f});