/** 
 * Sogou JavaScript Library 
 * 2014-10-09 build 
 */
define("Sogou.FX.TransitionBase",["Sogou.Util","Sogou.Events.EventTarget","Sogou.FX.EventType"],function(a,b,c){"use strict";var d=function(){b.call(this),this.state_=d.State.STOPPED,this.startTime=null,this.endTime=null};return a.inherits(d,b),d.State={STOPPED:0,PAUSED:-1,PLAYING:1},d.prototype.play=a.abstractMethod,d.prototype.stop=a.abstractMethod,d.prototype.pause=a.abstractMethod,d.prototype.getStateInternal=function(){return this.state_},d.prototype.setStatePlaying=function(){this.state_=d.State.PLAYING},d.prototype.setStatePaused=function(){this.state_=d.State.PAUSED},d.prototype.setStateStopped=function(){this.state_=d.State.STOPPED},d.prototype.isPlaying=function(){return this.state_==d.State.PLAYING},d.prototype.isPaused=function(){return this.state_==d.State.PAUSED},d.prototype.isStopped=function(){return this.state_==d.State.STOPPED},d.prototype.onBegin=function(){this.dispatchAnimationEvent(c.BEGIN)},d.prototype.onEnd=function(){this.dispatchAnimationEvent(c.END)},d.prototype.onFinish=function(){this.dispatchAnimationEvent(c.FINISH)},d.prototype.onPause=function(){this.dispatchAnimationEvent(c.PAUSE)},d.prototype.onPlay=function(){this.dispatchAnimationEvent(c.PLAY)},d.prototype.onResume=function(){this.dispatchAnimationEvent(c.RESUME)},d.prototype.onStop=function(){this.dispatchAnimationEvent(c.STOP)},d.prototype.dispatchAnimationEvent=function(a){this.dispatchEvent(a)},d});