/** Oslo JavaScript Framework. */
define("@debug.entryPointRegistry",["@util","@asserts.util"],function(a,b){"use strict";var c=function(){};c.prototype.wrap,c.prototype.unwrap;var d=[],e=[],f=!1;return{register:function(b){if(d[d.length]=b,f)for(var c=e,g=0;g<c.length;g++)b(a.bind(c[g].wrap,c[g]))},monitorAll:function(b){f=!0;for(var c=a.bind(b.wrap,b),g=0;g<d.length;g++)d[g](c);e.push(b)},unmonitorAllIfPossible:function(c){var f=e;b.assert(c===f[f.length-1],"Only the most recent monitor can be unwrapped.");for(var g=a.bind(c.unwrap,c),h=0;h<d.length;h++)d[h](g);f.length--}}});