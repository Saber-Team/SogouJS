/** 
 * Sogou JavaScript Library 
 * 2014-10-02 build 
 */
sogou("Sogou.FX.Easing",[],function(){"use strict";function a(a){var b,c=7.5625,d=2.75;return 1/d>a?b=c*Math.pow(a,2):2/d>a?(a-=1.5/d,b=c*Math.pow(a,2)+.75):2.5/d>a?(a-=2.25/d,b=c*Math.pow(a,2)+.9375):(a-=2.625/d,b=c*Math.pow(a,2)+.984375),b}return{easeIn:function(a){return a*a*a},easeOut:function(a){return 1-Math.pow(1-a,3)},inAndOut:function(a){return 3*a*a-2*a*a*a},backIn:function(a){var b=1.70158;return Math.pow(a,2)*((b+1)*a-b)},backOut:function(a){a-=1;var b=1.70158;return Math.pow(a,2)*((b+1)*a+b)+1},bounceIn:function(b){return 1-a(1-b)},bounceOut:a}});