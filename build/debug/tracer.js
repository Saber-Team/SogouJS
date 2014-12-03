/** Oslo JavaScript Framework. */
goog.provide("goog.debug.Trace"),goog.require("goog.array"),goog.require("goog.iter"),goog.require("goog.log"),goog.require("goog.structs.Map"),goog.require("goog.structs.SimplePool"),goog.debug.Trace_=function(){this.events_=[],this.outstandingEvents_=new goog.structs.Map,this.startTime_=0,this.tracerOverheadStart_=0,this.tracerOverheadEnd_=0,this.tracerOverheadComment_=0,this.stats_=new goog.structs.Map,this.tracerCount_=0,this.commentCount_=0,this.nextId_=1,this.eventPool_=new goog.structs.SimplePool(0,4e3),this.eventPool_.createObject=function(){return new goog.debug.Trace_.Event_},this.statPool_=new goog.structs.SimplePool(0,50),this.statPool_.createObject=function(){return new goog.debug.Trace_.Stat_};var a=this;this.idPool_=new goog.structs.SimplePool(0,2e3),this.idPool_.createObject=function(){return String(a.nextId_++)},this.idPool_.disposeObject=function(){},this.defaultThreshold_=3},goog.debug.Trace_.prototype.logger_=goog.log.getLogger("goog.debug.Trace"),goog.debug.Trace_.prototype.MAX_TRACE_SIZE=1e3,goog.debug.Trace_.EventType={START:0,STOP:1,COMMENT:2},goog.debug.Trace_.Stat_=function(){this.count=0,this.time=0,this.varAlloc=0},goog.debug.Trace_.Stat_.prototype.type,goog.debug.Trace_.Stat_.prototype.toString=function(){var a=[];return a.push(this.type," ",this.count," (",Math.round(10*this.time)/10," ms)"),this.varAlloc&&a.push(" [VarAlloc = ",this.varAlloc,"]"),a.join("")},goog.debug.Trace_.Event_=function(){},goog.debug.Trace_.Event_.prototype.type,goog.debug.Trace_.Event_.prototype.toTraceString=function(a,b,c){var d=[];if(-1==b?d.push("    "):d.push(goog.debug.Trace_.longToPaddedString_(this.eventTime-b)),d.push(" ",goog.debug.Trace_.formatTime_(this.eventTime-a)),this.eventType==goog.debug.Trace_.EventType.START)d.push(" Start        ");else if(this.eventType==goog.debug.Trace_.EventType.STOP){d.push(" Done ");var e=this.stopTime-this.startTime;d.push(goog.debug.Trace_.longToPaddedString_(e)," ms ")}else d.push(" Comment      ");return d.push(c,this),this.totalVarAlloc>0&&d.push("[VarAlloc ",this.totalVarAlloc,"] "),d.join("")},goog.debug.Trace_.Event_.prototype.toString=function(){return null==this.type?this.comment:"["+this.type+"] "+this.comment},goog.debug.Trace_.prototype.setStartTime=function(a){this.startTime_=a},goog.debug.Trace_.prototype.initCurrentTrace=function(a){this.reset(a)},goog.debug.Trace_.prototype.clearCurrentTrace=function(){this.reset(0)},goog.debug.Trace_.prototype.reset=function(a){this.defaultThreshold_=a;for(var b=0;b<this.events_.length;b++){var c=this.eventPool_.id;c&&this.idPool_.releaseObject(c),this.eventPool_.releaseObject(this.events_[b])}this.events_.length=0,this.outstandingEvents_.clear(),this.startTime_=goog.debug.Trace_.now(),this.tracerOverheadStart_=0,this.tracerOverheadEnd_=0,this.tracerOverheadComment_=0,this.tracerCount_=0,this.commentCount_=0;for(var d=this.stats_.getKeys(),b=0;b<d.length;b++){var e=d[b],f=this.stats_.get(e);f.count=0,f.time=0,f.varAlloc=0,this.statPool_.releaseObject(f)}this.stats_.clear()},goog.debug.Trace_.prototype.startTracer=function(a,b){var c=goog.debug.Trace_.now(),d=this.getTotalVarAlloc(),e=this.outstandingEvents_.getCount();if(this.events_.length+e>this.MAX_TRACE_SIZE){if(goog.log.warning(this.logger_,"Giant thread trace. Clearing to avoid memory leak."),this.events_.length>this.MAX_TRACE_SIZE/2){for(var f=0;f<this.events_.length;f++){var g=this.events_[f];g.id&&this.idPool_.releaseObject(g.id),this.eventPool_.releaseObject(g)}this.events_.length=0}e>this.MAX_TRACE_SIZE/2&&this.outstandingEvents_.clear()}goog.debug.Logger.logToProfilers("Start : "+a);var g=this.eventPool_.getObject();g.totalVarAlloc=d,g.eventType=goog.debug.Trace_.EventType.START,g.id=Number(this.idPool_.getObject()),g.comment=a,g.type=b,this.events_.push(g),this.outstandingEvents_.set(String(g.id),g),this.tracerCount_++;var h=goog.debug.Trace_.now();return g.startTime=g.eventTime=h,this.tracerOverheadStart_+=h-c,g.id},goog.debug.Trace_.prototype.stopTracer=function(a,b){var c,d=goog.debug.Trace_.now();c=0===b?0:b?b:this.defaultThreshold_;var e=this.outstandingEvents_.get(String(a));if(null==e)return null;this.outstandingEvents_.remove(String(a));var f,g=d-e.startTime;if(c>g)for(var h=this.events_.length,i=h-1;i>=0;i--){var j=this.events_[i];if(j==e){this.events_.splice(i,1),this.idPool_.releaseObject(e.id),this.eventPool_.releaseObject(e);break}}else f=this.eventPool_.getObject(),f.eventType=goog.debug.Trace_.EventType.STOP,f.startTime=e.startTime,f.comment=e.comment,f.type=e.type,f.stopTime=f.eventTime=d,this.events_.push(f);var k=e.type,l=null;k&&(l=this.getStat_(k),l.count++,l.time+=g),f&&(goog.debug.Logger.logToProfilers("Stop : "+f.comment),f.totalVarAlloc=this.getTotalVarAlloc(),l&&(l.varAlloc+=f.totalVarAlloc-e.totalVarAlloc));var m=goog.debug.Trace_.now();return this.tracerOverheadEnd_+=m-d,g},goog.debug.Trace_.prototype.setGcTracer=function(a){this.gcTracer_=a},goog.debug.Trace_.prototype.getTotalVarAlloc=function(){var a=this.gcTracer_;return a&&a.isTracing()?a.totalVarAlloc:-1},goog.debug.Trace_.prototype.addComment=function(a,b,c){var d=goog.debug.Trace_.now(),e=c?c:d,f=this.eventPool_.getObject();if(f.eventType=goog.debug.Trace_.EventType.COMMENT,f.eventTime=e,f.type=b,f.comment=a,f.totalVarAlloc=this.getTotalVarAlloc(),this.commentCount_++,c){for(var g=this.events_.length,h=0;g>h;h++){var i=this.events_[h],j=i.eventTime;if(j>e){goog.array.insertAt(this.events_,f,h);break}}h==g&&this.events_.push(f)}else this.events_.push(f);var k=f.type;if(k){var l=this.getStat_(k);l.count++}this.tracerOverheadComment_+=goog.debug.Trace_.now()-d},goog.debug.Trace_.prototype.getStat_=function(a){var b=this.stats_.get(a);return b||(b=this.statPool_.getObject(),b.type=a,this.stats_.set(a,b)),b},goog.debug.Trace_.prototype.getFormattedTrace=function(){return this.toString()},goog.debug.Trace_.prototype.toString=function(){for(var a=[],b=-1,c=[],d=0;d<this.events_.length;d++){var e=this.events_[d];e.eventType==goog.debug.Trace_.EventType.STOP&&c.pop(),a.push(" ",e.toTraceString(this.startTime_,b,c.join(""))),b=e.eventTime,a.push("\n"),e.eventType==goog.debug.Trace_.EventType.START&&c.push("|  ")}if(0!=this.outstandingEvents_.getCount()){var f=goog.debug.Trace_.now();a.push(" Unstopped timers:\n"),goog.iter.forEach(this.outstandingEvents_,function(b){a.push("  ",b," (",f-b.startTime," ms, started at ",goog.debug.Trace_.formatTime_(b.startTime),")\n")})}for(var g=this.stats_.getKeys(),d=0;d<g.length;d++){var h=this.stats_.get(g[d]);h.count>1&&a.push(" TOTAL ",h,"\n")}return a.push("Total tracers created ",this.tracerCount_,"\n","Total comments created ",this.commentCount_,"\n","Overhead start: ",this.tracerOverheadStart_," ms\n","Overhead end: ",this.tracerOverheadEnd_," ms\n","Overhead comment: ",this.tracerOverheadComment_," ms\n"),a.join("")},goog.debug.Trace_.longToPaddedString_=function(a){a=Math.round(a);var b="";return 1e3>a&&(b=" "),100>a&&(b="  "),10>a&&(b="   "),b+a},goog.debug.Trace_.formatTime_=function(a){a=Math.round(a);var b=a/1e3%60,c=a%1e3;return String(100+b).substring(1,3)+"."+String(1e3+c).substring(1,4)},goog.debug.Trace_.now=function(){return goog.now()},goog.debug.Trace=new goog.debug.Trace_;