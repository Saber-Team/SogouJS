/** 
 * Sogou JavaScript Library 
 * 2014-10-09 build 
 */
define("Sogou.Dom.BrowserFeature",["Sogou.UA.Util"],function(a){"use strict";return{CAN_ADD_NAME_OR_TYPE_ATTRIBUTES:!a.isIE||a.isDocumentModeOrHigher(9),CAN_USE_CHILDREN_ATTRIBUTE:!a.isGECKO&&!a.isIE||a.isIE&&a.isDocumentModeOrHigher(9)||a.isGECKO&&a.isVersionOrHigher("1.9.1"),CAN_USE_INNER_TEXT:a.isIE&&!a.isVersionOrHigher("9"),CAN_USE_PARENT_ELEMENT_PROPERTY:a.isIE||a.isOPERA||a.isWEBKIT,INNER_HTML_NEEDS_SCOPED_ELEMENT:a.isIE}});