/** Sogou JavaScript Framework.  2014-11-06 build */
define("Sogou.Async.Deferred",["Sogou.Util","Sogou.Array","Sogou.Debug.Error","Sogou.Functions"],function(a,b,c,d){"use strict";var e=function(a,b){if(this.sequence_=[],this.onCancelFunction_=a,this.defaultScope_=b||null,e.LONG_STACK_TRACES&&(this.constructorStack_=null,Error.captureStackTrace)){var c={stack:""};Error.captureStackTrace(c,e),"string"==typeof c.stack&&(this.constructorStack_=c.stack.replace(/^[^\n]*\n/,""))}};return e.prototype.fired_=!1,e.prototype.hadError_=!1,e.prototype.result_=void 0,e.prototype.blocked_=!1,e.prototype.blocking_=!1,e.prototype.silentlyCanceled_=!1,e.prototype.unhandledExceptionTimeoutId_,e.prototype.parent_,e.prototype.branches_=0,e.STRICT_ERRORS=a.DEBUG,e.LONG_STACK_TRACES=a.DEBUG,e.prototype.cancel=function(a){if(this.hasFired())this.result_ instanceof e&&this.result_.cancel();else{if(this.parent_){var b=this.parent_;delete this.parent_,a?b.cancel(a):b.branchCancel_()}this.onCancelFunction_?this.onCancelFunction_.call(this.defaultScope_,this):this.silentlyCanceled_=!0,this.hasFired()||this.errback(new e.CanceledError(this))}},e.prototype.branchCancel_=function(){this.branches_--,this.branches_<=0&&this.cancel()},e.prototype.continue_=function(a,b){this.blocked_=!1,this.updateResult_(a,b)},e.prototype.updateResult_=function(a,b){this.fired_=!0,this.result_=b,this.hadError_=!a,this.fire_()},e.prototype.check_=function(){if(this.hasFired()){if(!this.silentlyCanceled_)throw new e.AlreadyCalledError(this);this.silentlyCanceled_=!1}},e.prototype.callback=function(a){if(this.check_(),a instanceof e)throw"An execution sequence may not be initiated with a blocking Deferred.";this.updateResult_(!0,a)},e.prototype.errback=function(a){if(this.check_(),a instanceof e)throw"An execution sequence may not be initiated with a blocking Deferred.";this.makeStackTraceLong_(a),this.updateResult_(!1,a)},e.prototype.makeStackTraceLong_=function(b){e.LONG_STACK_TRACES&&this.constructorStack_&&a.isObject(b)&&b.stack&&/^[^\n]+(\n   [^\n]+)+/.test(b.stack)&&(b.stack=b.stack+"\nDEFERRED OPERATION:\n"+this.constructorStack_)},e.prototype.addCallback=function(a,b){return this.addCallbacks(a,null,b)},e.prototype.addErrback=function(a,b){return this.addCallbacks(null,a,b)},e.prototype.addBoth=function(a,b){return this.addCallbacks(a,a,b)},e.prototype.addCallbacks=function(a,b,c){return this.blocking_?this:(this.sequence_.push([a,b,c]),this.hasFired()&&this.fire_(),this)},e.prototype.chainDeferred=function(a){return this.addCallbacks(a.callback,a.errback,a),this},e.prototype.awaitDeferred=function(b){return this.addCallback(a.bind(b.branch,b))},e.prototype.branch=function(a){var b=new e;return this.chainDeferred(b),a&&(b.parent_=this,this.branches_++),b},e.prototype.hasFired=function(){return this.fired_},e.prototype.isError=function(a){return a instanceof Error},e.prototype.hasErrback_=function(){return b.some(this.sequence_,function(b){return a.isFunction(b[1])})},e.prototype.fire_=function(){this.unhandledExceptionTimeoutId_&&this.hasFired()&&this.hasErrback_()&&(a.global.clearTimeout(this.unhandledExceptionTimeoutId_),delete this.unhandledExceptionTimeoutId_),this.parent_&&(this.parent_.branches_--,delete this.parent_);for(var b=this.result_,c=!1,f=!1;this.sequence_.length&&!this.blocked_;){var g=this.sequence_.shift(),h=g[0],i=g[1],j=g[2],k=this.hadError_?i:h;if(k)try{var l=k.call(j||this.defaultScope_,b);a.isDef(l)&&(this.hadError_=this.hadError_&&(l==b||this.isError(l)),this.result_=b=l),b instanceof e&&(f=!0,this.blocked_=!0)}catch(m){b=m,this.hadError_=!0,this.makeStackTraceLong_(b),this.hasErrback_()||(c=!0)}}this.result_=b,f?(b.addCallbacks(a.bind(this.continue_,this,!0),a.bind(this.continue_,this,!1)),b.blocking_=!0):!e.STRICT_ERRORS||!this.isError(b)||b instanceof e.CanceledError||(this.hadError_=!0,c=!0),c&&(this.unhandledExceptionTimeoutId_=a.global.setTimeout(d.fail(b),0))},e.succeed=function(a){var b=new e;return b.callback(a),b},e.fail=function(a){var b=new e;return b.errback(a),b},e.canceled=function(){var a=new e;return a.cancel(),a},e.when=function(a,b,c){return a instanceof e?a.branch(!0).addCallback(b,c):e.succeed(a).addCallback(b,c)},e.AlreadyCalledError=function(a){c.call(this),this.deferred=a},a.inherits(e.AlreadyCalledError,c),e.AlreadyCalledError.prototype.message="Deferred has already fired",e.AlreadyCalledError.prototype.name="AlreadyCalledError",e.CanceledError=function(a){c.call(this),this.deferred=a},a.inherits(e.CanceledError,c),e.CanceledError.prototype.message="Deferred was canceled",e.CanceledError.prototype.name="CanceledError",e});