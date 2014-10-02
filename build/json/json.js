/** 
 * Sogou JavaScript Library 
 * 2014-10-02 build 
 */
define("Sogou.JSON.Util",["Sogou.Util"],function(util){"use strict";function isValid_(a){if(/^\s*$/.test(a))return!1;var b=/\\["\\\/bfnrtu]/g,c=/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,d=/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,e=/^[\],:{}\s\u2028\u2029]*$/;return e.test(a.replace(b,"@").replace(c,"]").replace(d,""))}function parse(s){var o=String(s);if(isValid_(o))try{return eval("("+o+")")}catch(ex){}throw Error("Invalid JSON string: "+o)}function unsafeParse(s){return eval("("+s+")")}var Replacer,Reviver;function serialize(a,b){return new Serializer(b).serialize(a)}var Serializer=function(a){this.replacer_=a};return Serializer.prototype.serialize=function(a){var b=[];return this.serialize_(a,b),b.join("")},Serializer.prototype.serialize_=function(a,b){switch(typeof a){case"string":this.serializeString_(a,b);break;case"number":this.serializeNumber_(a,b);break;case"boolean":b.push(a);break;case"undefined":b.push("null");break;case"object":if(null==a){b.push("null");break}if(util.isArray(a)){this.serializeArray(a,b);break}this.serializeObject_(a,b);break;case"function":break;default:throw Error("Unknown type: "+typeof a)}},Serializer.charToJsonCharCache_={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","	":"\\t","":"\\u000b"},Serializer.charsToReplace_=/\uffff/.test("￿")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g,Serializer.prototype.serializeString_=function(a,b){b.push('"',a.replace(Serializer.charsToReplace_,function(a){if(a in Serializer.charToJsonCharCache_)return Serializer.charToJsonCharCache_[a];var b=a.charCodeAt(0),c="\\u";return 16>b?c+="000":256>b?c+="00":4096>b&&(c+="0"),Serializer.charToJsonCharCache_[a]=c+b.toString(16)}),'"')},Serializer.prototype.serializeNumber_=function(a,b){b.push(isFinite(a)&&!isNaN(a)?a:"null")},Serializer.prototype.serializeArray=function(a,b){var c=a.length;b.push("[");for(var d="",e=0;c>e;e++){b.push(d);var f=a[e];this.serialize_(this.replacer_?this.replacer_.call(a,String(e),f):f,b),d=","}b.push("]")},Serializer.prototype.serializeObject_=function(a,b){b.push("{");var c="";for(var d in a)if(Object.prototype.hasOwnProperty.call(a,d)){var e=a[d];"function"!=typeof e&&(b.push(c),this.serializeString_(d,b),b.push(":"),this.serialize_(this.replacer_?this.replacer_.call(a,d,e):e,b),c=",")}b.push("}")},{parse:parse,unsafeParse:unsafeParse,serialize:serialize,Serializer:Serializer}});