/** 
 * Sogou JavaScript Library 
 * 2014-09-10 build 
 */
sogou("Sogou.Net.Cookies",["Sogou.Util"],function(a){"use strict";var b=3950,c=/\s*;\s*/,d=function(a){this.document_=a};d.MAX_COOKIE_LENGTH=b,d.prototype.isEnabled=function(){return navigator.cookieEnabled},d.prototype.isValidName=function(a){return!/[;=\s]/.test(a)},d.prototype.isValidValue=function(a){return!/[;\r\n]/.test(a)},d.prototype.set=function(b,c,d,e,f,g){if(!this.isValidName(b))throw Error('Invalid cookie name "'+b+'"');if(!this.isValidValue(c))throw Error('Invalid cookie value "'+c+'"');a.isDef(d)||(d=-1);var h,i=f?";domain="+f:"",j=e?";path="+e:"",k=g?";secure":"";if(0>d)h="";else if(0===d){var l=new Date(1970,1,1);h=";expires="+l.toUTCString()}else{var m=new Date(a.now()+1e3*d);h=";expires="+m.toUTCString()}this.setCookie_(b+"="+c+i+j+h+k)},d.prototype.get=function(a,b){for(var c,d=a+"=",e=this.getParts_(),f=0;c=e[f];f++){if(0===c.lastIndexOf(d,0))return c.substr(d.length);if(c===a)return""}return b},d.prototype.remove=function(a,b,c){var d=this.containsKey(a);return this.set(a,"",0,b,c),d},d.prototype.getKeys=function(){return this.getKeyValues_().keys},d.prototype.getValues=function(){return this.getKeyValues_().values},d.prototype.isEmpty=function(){return!this.getCookie_()},d.prototype.getCount=function(){var a=this.getCookie_();return a?this.getParts_().length:0},d.prototype.containsKey=function(b){return a.isDef(this.get(b))},d.prototype.containsValue=function(a){for(var b=this.getKeyValues_().values,c=0;c<b.length;c++)if(b[c]===a)return!0;return!1},d.prototype.clear=function(){for(var a=this.getKeyValues_().keys,b=a.length-1;b>=0;b--)this.remove(a[b])},d.prototype.setCookie_=function(a){this.document_.cookie=a},d.prototype.getCookie_=function(){return this.document_.cookie},d.prototype.getParts_=function(){return(this.getCookie_()||"").split(c)},d.prototype.getKeyValues_=function(){for(var a,b,c=this.getParts_(),d=[],e=[],f=0;b=c[f];f++)a=b.indexOf("="),-1===a?(d.push(""),e.push(b)):(d.push(b.substring(0,a)),e.push(b.substring(a+1)));return{keys:d,values:e}};var e=new d(document);return{Cookies:d,cookies:e}});