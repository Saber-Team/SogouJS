/** Sogou JavaScript Framework.  2014-11-06 build */
define("@memo",["@util"],function(a){"use strict";var b={};b.ENABLE_MEMOIZE=!0;var c="oslo_memoize_cache_";function d(a,b){for(var c=[a],d=b.length-1;d>=0;--d)c.push(typeof b[d],b[d]);return c.join("")}return b.clearCache=function(a){a[c]={}},b.memoize=function(e,f){var g=a.getUid(e),h=f||d;return function(){if(b.ENABLE_MEMOIZE){var d=this||a.global,f=d[c]||(d[c]={}),i=h(g,arguments);return f.hasOwnProperty(i)?f[i]:f[i]=e.apply(this,arguments)}return e.apply(this,arguments)}},b});