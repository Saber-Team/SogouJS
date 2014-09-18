/** 
 * Sogou JavaScript Library 
 * 2014-09-18 build 
 */
sogou("Sogou.Events.EventType",["Sogou.UA.Util"],function(a){"use strict";return{CLICK:"click",DBLCLICK:"dblclick",MOUSEDOWN:"mousedown",MOUSEUP:"mouseup",MOUSEOVER:"mouseover",MOUSEOUT:"mouseout",MOUSEMOVE:"mousemove",SELECTSTART:"selectstart",KEYPRESS:"keypress",KEYDOWN:"keydown",KEYUP:"keyup",BLUR:"blur",FOCUS:"focus",DEACTIVATE:"deactivate",FOCUSIN:a.isIE?"focusin":"DOMFocusIn",FOCUSOUT:a.isIE?"focusout":"DOMFocusOut",CHANGE:"change",SELECT:"select",SUBMIT:"submit",INPUT:"input",PROPERTYCHANGE:"propertychange",DRAGSTART:"dragstart",DRAG:"drag",DRAGENTER:"dragenter",DRAGOVER:"dragover",DRAGLEAVE:"dragleave",DROP:"drop",DRAGEND:"dragend",TOUCHSTART:"touchstart",TOUCHMOVE:"touchmove",TOUCHEND:"touchend",TOUCHCANCEL:"touchcancel",BEFOREUNLOAD:"beforeunload",CONSOLEMESSAGE:"consolemessage",CONTEXTMENU:"contextmenu",DOMCONTENTLOADED:"DOMContentLoaded",ERROR:"error",HELP:"help",LOAD:"load",LOSECAPTURE:"losecapture",READYSTATECHANGE:"readystatechange",RESIZE:"resize",SCROLL:"scroll",UNLOAD:"unload",HASHCHANGE:"hashchange",PAGEHIDE:"pagehide",PAGESHOW:"pageshow",POPSTATE:"popstate",COPY:"copy",PASTE:"paste",CUT:"cut",BEFORECOPY:"beforecopy",BEFORECUT:"beforecut",BEFOREPASTE:"beforepaste",ONLINE:"online",OFFLINE:"offline",MESSAGE:"message",CONNECT:"connect",TRANSITIONEND:a.isWEBKIT?"webkitTransitionEnd":a.isOPERA?"oTransitionEnd":"transitionend",MSGESTURECHANGE:"MSGestureChange",MSGESTUREEND:"MSGestureEnd",MSGESTUREHOLD:"MSGestureHold",MSGESTURESTART:"MSGestureStart",MSGESTURETAP:"MSGestureTap",MSGOTPOINTERCAPTURE:"MSGotPointerCapture",MSINERTIASTART:"MSInertiaStart",MSLOSTPOINTERCAPTURE:"MSLostPointerCapture",MSPOINTERCANCEL:"MSPointerCancel",MSPOINTERDOWN:"MSPointerDown",MSPOINTERMOVE:"MSPointerMove",MSPOINTEROVER:"MSPointerOver",MSPOINTEROUT:"MSPointerOut",MSPOINTERUP:"MSPointerUp",TEXTINPUT:"textinput",COMPOSITIONSTART:"compositionstart",COMPOSITIONUPDATE:"compositionupdate",COMPOSITIONEND:"compositionend",EXIT:"exit",LOADABORT:"loadabort",LOADCOMMIT:"loadcommit",LOADREDIRECT:"loadredirect",LOADSTART:"loadstart",LOADSTOP:"loadstop",RESPONSIVE:"responsive",SIZECHANGED:"sizechanged",UNRESPONSIVE:"unresponsive"}});