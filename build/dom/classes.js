/** 
 * Sogou JavaScript Library 
 * 2014-10-09 build 
 */
sogou("Sogou.Dom.Classes",["Sogou.Util","Sogou.Array"],function(a,b){"use strict";function c(a,b){a.className=b}function d(b){var c=b.className;return a.isString(c)&&c.match(/\S+/g)||[]}function e(a){var b=d(a),e=Array.prototype.slice.call(arguments,1),f=b.length+e.length;return g(b,e),c(a,b.join(" ")),b.length==f}function f(a){var b=d(a),e=Array.prototype.slice.call(arguments,1),f=h(b,e);return c(a,f.join(" ")),f.length==b.length-e.length}function g(a,c){for(var d=0;d<c.length;d++)b.contains(a,c[d])||a.push(c[d])}function h(a,c){return b.filter(a,function(a){return!b.contains(c,a)})}function i(a,b,e){for(var f=d(a),g=!1,h=0;h<f.length;h++)f[h]==b&&(f.splice(h--,1),g=!0);return g&&(f.push(e),c(a,f.join(" "))),g}function j(e,f,i){var j=d(e);a.isString(f)?b.remove(j,f):a.isArray(f)&&(j=h(j,f)),a.isString(i)&&!b.contains(j,i)?j.push(i):a.isArray(i)&&g(j,i),c(e,j.join(" "))}function k(a,c){return b.contains(d(a),c)}function l(a,b,c){c?e(a,b):f(a,b)}function m(a,b){var c=!k(a,b);return l(a,b,c),c}return{set:c,get:d,add:e,remove:f,swap:i,addRemove:j,has:k,enable:l,toggle:m}});