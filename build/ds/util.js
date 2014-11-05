/** Sogou JavaScript Framework.  2014-11-06 build */
define("Sogou.DS.Util",["Sogou.Util","Sogou.Array","Sogou.Object"],function(a,b,c){"use strict";function d(b){return"function"==typeof b.getCount?b.getCount():a.isArrayLike(b)||a.isString(b)?b.length:c.getCount(b)}function e(b){if("function"==typeof b.getValues)return b.getValues();if(a.isString(b))return b.split("");if(a.isArrayLike(b)){for(var d=[],e=b.length,f=0;e>f;f++)d.push(b[f]);return d}return c.getValues(b)}function f(b){if("function"==typeof b.getKeys)return b.getKeys();if("function"==typeof b.getValues)return void 0;if(a.isArrayLike(b)||a.isString(b)){for(var d=[],e=b.length,f=0;e>f;f++)d.push(f);return d}return c.getKeys(b)}function g(d,e){return"function"==typeof d.contains?d.contains(e):"function"==typeof d.containsValue?d.containsValue(e):a.isArrayLike(d)||a.isString(d)?b.contains(d,e):c.containsValue(d,e)}function h(b){return"function"==typeof b.isEmpty?b.isEmpty():a.isArrayLike(b)||a.isString(b)?0===b.length:c.isEmpty(b)}function i(d){"function"==typeof d.clear?d.clear():a.isArrayLike(d)?b.clear(d):c.clear(d)}function j(c,d,g){if("function"==typeof c.forEach)c.forEach(d,g);else if(a.isArrayLike(c))b.forEach(c,d,g);else for(var h=f(c),i=e(c),j=i.length,k=0;j>k;k++)d.call(g,i[k],h&&h[k],c)}function k(c,d,g){if("function"==typeof c.filter)return c.filter(d,g);if(a.isArrayLike(c))return b.filter(c,d,g);var h,i,j=f(c),k=e(c),l=k.length;if(j)for(h={},i=0;l>i;i++)d.call(g,k[i],j[i],c)&&(h[j[i]]=k[i]);else for(h=[],i=0;l>i;i++)d.call(g,k[i],void 0,c)&&h.push(k[i]);return h}function l(c,d,g){if("function"==typeof c.map)return c.map(d,g);if(a.isArrayLike(c))return b.map(c,d,g);var h,i,j=f(c),k=e(c),l=k.length;if(j)for(h={},i=0;l>i;i++)h[j[i]]=d.call(g,k[i],j[i],c);else for(h=[],i=0;l>i;i++)h[i]=d.call(g,k[i],void 0,c);return h}function m(c,d,g){if("function"==typeof c.some)return c.some(d,g);if(a.isArrayLike(c))return b.some(c,d,g);for(var h=f(c),i=e(c),j=i.length,k=0;j>k;k++)if(d.call(g,i[k],h&&h[k],c))return!0;return!1}function n(c,d,g){if("function"==typeof c.every)return c.every(d,g);if(a.isArrayLike(c))return b.every(c,d,g);for(var h=f(c),i=e(c),j=i.length,k=0;j>k;k++)if(!d.call(g,i[k],h&&h[k],c))return!1;return!0}return{getCount:d,getValues:e,getKeys:f,contains:g,isEmpty:h,clear:i,forEach:j,filter:k,map:l,some:m,every:n}});