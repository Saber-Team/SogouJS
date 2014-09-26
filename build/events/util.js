/** 
 * Sogou JavaScript Library 
 * 2014-09-26 build 
 */
sogou("Sogou.Events.Util",["Sogou.Util","Sogou.Events.BrowserEvent","Sogou.Events.BrowserFeature","Sogou.Events.EventTarget","Sogou.Events.Listener","Sogou.Array","Sogou.Object"],function(a,b,c,d,e,f,g){"use strict";var h="__sogou_events_fn_"+(1e9*Math.random()>>>0),i={},j={},k={},l="on",m={};function n(b){var c=!1;if(0===+b.keyCode)try{return b.keyCode=-1,void 0}catch(d){c=!0}(c||a.isNull(b.returnValue))&&(b.returnValue=!0)}function o(b){return b.keyCode<0||!a.isNull(b.returnValue)}function p(a,d,e){if(d.removed)return!0;var f,g=d.type,h=i;if(!(g in h))return!0;h=h[g];var j,k;if(!c.HAS_W3C_EVENT_SUPPORT){var l,m=e||window.event,p=!0 in h,q=!1 in h;if(p){if(o(m))return!0;n(m)}var r=new b;r.init(m,a),j=!0;try{if(p){f=[];for(var s=r.currentTarget;s;s=s.parentNode)f.push(s);for(k=h[!0],l=f.length-1;!r.propagationStopped_&&l>=0;l--)r.currentTarget=f[l],j&=D(k,f[l],g,!0,r);if(q)for(k=h[!1],l=0;!r.propagationStopped_&&l<f.length;l++)r.currentTarget=f[l],j&=D(k,f[l],g,!1,r)}else j=E(d,r)}finally{f&&(f.length=0)}return j}var t=new b(e,a);return j=E(d,t),j}function q(a){return a in m?m[a]:m[a]=l+a}function r(b){if(a.isNull(b))throw new Error("Listener can not be null.");if(a.isFunction(b))return b;if(a.isNull(b.handleEvent))throw new Error("An object listener must have handleEvent method.");return b[h]||(b[h]=function(a){return b.handleEvent(a)})}function s(b,c,d,f,g,h){if(!c)throw Error("Invalid event type");var l=!!g,m=i;c in m||(m[c]={count_:0}),m=m[c],l in m||(m[l]={count_:0},m.count_++),m=m[l];var n,o,p=a.getUid(b);if(m[p]){n=m[p];for(var r=0;r<n.length;r++)if(o=n[r],o.listener===d&&o.handler===h){if(o.removed)break;return f||(n[r].callOnce=!1),n[r]}}else n=m[p]=[],m.count_++;var s=x();o=new e(d,s,b,c,l,h),o.callOnce=f,s.src=b,s.listener=o,n.push(o),j[p]||(j[p]=[]),j[p].push(o),b.addEventListener?b.addEventListener(c,s,l):b.attachEvent(q(c),s);var t=o.key;return k[t]=o,o}function t(b,c,d){var e=i;if(c in e&&(e=e[c],d in e)){e=e[d];var f=a.getUid(b);if(e[f])return e[f]}return null}function u(a,b,c){return a instanceof d?a.getListeners(b,c):t(a,b,c)||[]}function v(a,b,c,e,f){var g=!!e;if(a instanceof d)return a.getListener(b,c,g,f);var h=t(a,b,g);if(h)for(var i=0;i<h.length;i++)if(!h[i].removed&&h[i].listener===c&&h[i].capture===g&&h[i].handler===f)return h[i];return null}function w(b,c,e){if(b instanceof d)return b.hasListener(c,e);var g=a.getUid(b),h=j[g];if(h){var k=!a.isNull(c),l=!a.isNull(e);if(k&&l){var m=i[c];return!!m&&!!m[e]&&g in m[e]}return k||l?f.some(h,function(a){return k&&a.type===c||l&&a.capture===e}):!0}return!1}function x(){var a=c.HAS_W3C_EVENT_SUPPORT?function(b){return p(a.src,a.listener,b)}:function(b){var c=p(a.src,a.listener,b);return c?void 0:c};return a}function y(b,c,e,f,g){if(a.isArray(c)){for(var h=0;h<c.length;h++)y(b,c[h],e,f,g);return null}return e=r(e),b instanceof d?b.listen(c,e,f,g):s(b,c,e,!1,f,g)}function z(b,c,e,f,g){var h;if(a.isArray(c)){for(h=0;h<c.length;h++)z(b,c[h],e,f,g);return null}if(b instanceof d)return b.unlisten(c,e,f,g);var i=!!f,j=t(b,c,i);if(!j)return!1;for(h=0;h<j.length;h++)if(j[h].listener===e&&j[h].capture===i&&j[h].handler===g)return B(j[h]);return!1}function A(b,c,e,f,g){if(a.isArray(c)){for(var h=0;h<c.length;h++)A(b,c[h],e,f,g);return null}var i;return e=r(e),i=b instanceof d?b.listenOnce(c,e,f,g):s(b,c,e,!0,f,g),i}function B(b){if(a.isNumber(b))return!1;var c=b;if(!c)return!1;if(c.removed)return!1;var e=c.src;if(e instanceof d)return e.unlistenByKey(c);var g=c.type,h=c.proxy,l=c.capture;e.removeEventListener?e.removeEventListener(g,h,l):e.detachEvent&&e.detachEvent(q(g),h);var m=a.getUid(e);if(j[m]){var n=j[m];f.remove(n,c),0===n.length&&delete j[m]}c.markAsRemoved();var o=i[g][l][m];return o&&(f.remove(o,c),0===o.length&&(delete i[g][l][m],i[g][l].count_--),0===i[g][l].count_&&(delete i[g][l],i[g].count_--),0===i[g].count_&&delete i[g]),delete k[c.key],!0}function C(a,b,c,e){if(a instanceof d)return a.fireListeners(b,c,e);var f=i;return b in f&&(f=f[b],c in f)?D(f[c],a,b,c,e):!0}function D(b,c,d,e,g){var h=1,i=a.getUid(c);if(b[i])for(var j=f.toArray(b[i]),k=0;k<j.length;k++){var l=j[k];l&&!l.removed&&(h&=E(l,g)!==!1)}return!!h}function E(a,b){var c=a.listener,d=a.handler||a.src;return a.callOnce&&B(a),c.call(d,b)}function F(a,b,c,d,e){b.listen(a,c,d,e)}function G(a,b,c,d,e){b.unlisten(a,c,d,e)}function H(b,c){var e=0,f=a.isNull(b),h=a.isNull(c);if(f)g.forEach(k,function(a){B(a),e++});else{if(b&&b instanceof d)return b.removeAllListeners(c);var i=a.getUid(b);if(j[i])for(var l=j[i],m=l.length-1;m>=0;m--){var n=l[m];(h||c===n.type)&&(B(n),e++)}}return e}function I(){var a=0;return g.forEach(k,function(b){B(b),a++}),a}return{listen:y,unlisten:z,getListeners:u,getListener:v,hasListener:w,listenOnce:A,unlistenByKey:B,fireListeners:C,fireListener:E,listenWithWrapper:F,unlistenWithWrapper:G,removeAll:H,removeAllNativeListeners:I}});