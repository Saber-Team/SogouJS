/** 
 * Sogou JavaScript Library 
 * 2014-10-02 build 
 */
define("Sogou.Net.HttpStatus",[],function(){"use strict";var a={CONTINUE:100,SWITCHING_PROTOCOLS:101,OK:200,CREATED:201,ACCEPTED:202,NON_AUTHORITATIVE_INFORMATION:203,NO_CONTENT:204,RESET_CONTENT:205,PARTIAL_CONTENT:206,MULTIPLE_CHOICES:300,MOVED_PERMANENTLY:301,FOUND:302,SEE_OTHER:303,NOT_MODIFIED:304,USE_PROXY:305,TEMPORARY_REDIRECT:307,BAD_REQUEST:400,UNAUTHORIZED:401,PAYMENT_REQUIRED:402,FORBIDDEN:403,NOT_FOUND:404,METHOD_NOT_ALLOWED:405,NOT_ACCEPTABLE:406,PROXY_AUTHENTICATION_REQUIRED:407,REQUEST_TIMEOUT:408,CONFLICT:409,GONE:410,LENGTH_REQUIRED:411,PRECONDITION_FAILED:412,REQUEST_ENTITY_TOO_LARGE:413,REQUEST_URI_TOO_LONG:414,UNSUPPORTED_MEDIA_TYPE:415,REQUEST_RANGE_NOT_SATISFIABLE:416,EXPECTATION_FAILED:417,INTERNAL_SERVER_ERROR:500,NOT_IMPLEMENTED:501,BAD_GATEWAY:502,SERVICE_UNAVAILABLE:503,GATEWAY_TIMEOUT:504,HTTP_VERSION_NOT_SUPPORTED:505,QUIRK_IE_NO_CONTENT:1223};return a.isSuccess=function(b){switch(b){case a.OK:case a.CREATED:case a.ACCEPTED:case a.NO_CONTENT:case a.PARTIAL_CONTENT:case a.NOT_MODIFIED:case a.QUIRK_IE_NO_CONTENT:return!0;default:return!1}},a});