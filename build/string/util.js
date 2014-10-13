/** 
 * Sogou JavaScript Library 
 * 2014-10-14 build 
 */
define("Sogou.String.Util",["Sogou.Util"],function(a){"use strict";function b(a,b){return b>a?-1:a>b?1:0}function c(){return Array.prototype.join.call(arguments,"")}function d(a){return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")}function e(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")}function f(a){return a.replace(/^[\s\xa0]+/,"")}function g(a){return a.replace(/[\s\xa0]+$/,"")}var h=/&/g,i=/</g,j=/>/g,k=/\"/g,l=/[&<>\"]/;function m(a,b){return a.toLowerCase()===b.toLowerCase()}function n(a,b){return-1!==a.indexOf(b)}function o(a,b){return n(a.toLowerCase(),b.toLowerCase())}function p(a,b){return b?a.replace(h,"&amp;").replace(i,"&lt;").replace(j,"&gt;").replace(k,"&quot;"):l.test(a)?(-1!==a.indexOf("&")&&(a=a.replace(h,"&amp;")),-1!==a.indexOf("<")&&(a=a.replace(i,"&lt;")),-1!==a.indexOf(">")&&(a=a.replace(j,"&gt;")),-1!==a.indexOf('"')&&(a=a.replace(k,"&quot;")),a):a}function q(a){for(var b=a.split("%s"),c="",d=Array.prototype.slice.call(arguments,1);d.length&&b.length>1;)c+=b.shift()+d.shift();return c+b.join("%s")}return{startsWith:function(a,b){return 0===a.lastIndexOf(b,0)},endsWith:function(a,b){var c=a.length-b.length;return c>=0&&a.indexOf(b,c)===c},isEmpty:function(a){return/^[\s\xa0]*$/.test(a)},stripNewlines:function(a){return a.replace(/(\r\n|\r|\n)+/g," ")},caseInsensitiveEquals:m,caseInsensitiveContains:o,canonicalizeNewlines:function(a){return a.replace(/(\r\n|\r|\n)/g,"\n")},urlEncode:function(a){return encodeURIComponent(String(a))},urlDecode:function(a){return decodeURIComponent(a.replace(/\+/g," "))},newLineToBr:function(a,b){return a.replace(/(\r\n|\r|\n)/g,b?"<br />":"<br>")},htmlEscape:p,buildString:c,subs:q,toCamelCase:function(a){return String(a).replace(/\-([a-z])/g,function(a,b){return b.toUpperCase()})},toTitleCase:function(b,c){var e=a.isString(c)?d(c):"\\s";e=e?"|["+e+"]+":"";var f=new RegExp("(^"+e+")([a-z])","g");return b.replace(f,function(a,b,c){return b+c.toUpperCase()})},trim:e,trimLeft:f,trimRight:g,contains:n,getRandomString:function(){var a=2147483648;return Math.floor(Math.random()*a).toString(36)+Math.abs(Math.floor(Math.random()*a)^+new Date).toString(36)},compareVersions:function(a,c){for(var d=0,f=e(""+a).split("."),g=e(""+c).split("."),h=Math.max(f.length,g.length),i=0;0===d&&h>i;i++){var j=f[i]||"",k=g[i]||"",l=new RegExp("(\\d*)(\\D*)","g"),m=new RegExp("(\\d*)(\\D*)","g");do{var n=l.exec(j)||["","",""],o=m.exec(k)||["","",""];if(0===n[0].length&&0===o[0].length)break;var p=0===n[1].length?0:parseInt(n[1],10),q=0===o[1].length?0:parseInt(o[1],10);d=b(p,q)||b(0===n[2].length,0===o[2].length)||b(n[2],o[2])}while(0===d)}return d}}});