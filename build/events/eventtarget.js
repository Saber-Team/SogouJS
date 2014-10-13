/** 
 * Sogou JavaScript Library 
 * 2014-10-14 build 
 */
define("Sogou.Events.EventTarget",["Sogou.Util","Sogou.Disposable","Sogou.Array","Sogou.Events.EventBase","Sogou.Events.ListenerMap","Sogou.Object"],function(a,b,c,d,e,f){"use strict";var g=100,h=function(b,c,e){var g,h=c.type||c;if(a.isString(c))c=new d(c,b);else if(c instanceof d)c.target=c.target||b;else{var i=c;c=new d(h,b),f.extend(c,i)}var j,k=!0;if(e)for(g=e.length-1;!c.propagationStopped_&&g>=0;g--)j=c.currentTarget=e[g],k=j.fireListeners(h,!0,c)&&k;if(c.propagationStopped_||(j=c.currentTarget=b,k=j.fireListeners(h,!0,c)&&k,c.propagationStopped_||(k=j.fireListeners(h,!1,c)&&k)),e)for(g=0;!c.propagationStopped_&&g<e.length;g++)j=c.currentTarget=e[g],k=j.fireListeners(h,!1,c)&&k;return k};function i(){b.call(this),this.eventTargetListeners_=new e(this),this.actualEventTarget_=this}return a.inherits(i,b),a.mixin(i.prototype,{isListenable:!0,parentEventTarget_:null,getParentEventTarget:function(){return this.parentEventTarget_},setParentEventTarget:function(a){this.parentEventTarget_=a},dispatchEvent:function(a){var b,c=this.getParentEventTarget();if(c){b=[];for(var d=1;c;c=c.getParentEventTarget())if(b.push(c),++d>=g)throw""}return h(this.actualEventTarget_,a,b)},disposeInternal:function(){i.superClass_.disposeInternal.call(this),this.removeAllListeners(),this.parentEventTarget_=null},listen:function(a,b,c,d){return this.eventTargetListeners_.add(a,b,!1,c,d)},listenOnce:function(a,b,c,d){return this.eventTargetListeners_.add(a,b,!0,c,d)},unlisten:function(a,b,c,d){return this.eventTargetListeners_.remove(a,b,c,d)},unlistenByKey:function(a){return this.eventTargetListeners_.removeByKey(a)},removeAllListeners:function(a){return this.eventTargetListeners_?this.eventTargetListeners_.removeAll(a):0},fireListeners:function(a,b,d){var e=this.eventTargetListeners_.listeners[a];if(!e)return!0;e=c.toArray(e);for(var f=!0,g=0;g<e.length;++g){var h=e[g];if(h&&!h.removed&&h.capture===b){var i=h.listener,j=h.handler||h.src;h.callOnce&&this.unlistenByKey(h),f=i.call(j,d)!==!1&&f}}return f&&d.returnValue_!==!1},getListeners:function(a,b){return this.eventTargetListeners_.getListeners(a,b)},getListener:function(a,b,c,d){return this.eventTargetListeners_.getListener(a,b,c,d)},hasListener:function(a,b){return this.eventTargetListeners_.hasListener(a,b)}}),i});