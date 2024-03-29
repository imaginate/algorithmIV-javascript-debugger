/** @preserve blank line */

/**
 * -----------------------------------------------------------------------------
 * Algorithm IV Debugger (v1.1.4)
 * -----------------------------------------------------------------------------
 * @file Algorithm IV's debugger is a console wrapper that fixes cross-browser
 *   console issues and provides a set of new console methods that make your
 *   console more powerful. It will allow you to reduce the amount of time and
 *   code it takes to find a bug, automatically insert breakpoints, profiles,
 *   and timers, and switch everything on or off with one command. With proper
 *   use you will know and control the actions of every JavaScript method in
 *   your code base!
 * @module aIVConsole
 * @version 1.1.4
 * @author Adam Smith [imagineadamsmith@gmail.com]{@link mailto:imagineadamsmith@gmail.com}
 * @copyright 2022 Adam A Smith [github.com/imaginate]{@link https://github.com/imaginate}
 * @license The Apache License [www.apache.org/licenses/LICENSE-2.0]{@link http://www.apache.org/licenses/LICENSE-2.0}
 * @desc More details about aIV.console:
 * <ol>
 *   <li>annotations: 
 *       [See Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 *       and [See JSDoc3]{@link http://usejsdoc.org/}
 *   </li>
 *   <li>contributing: 
 *       [See our guideline]{@link https://github.com/imaginate/algorithmIV-javascript-debugger/blob/master/CONTRIBUTING.md}
 *   </li>
 * </ol>
 */

/**
 * -----------------------------------------------------------------------------
 * Pre-Defined JSDoc Types
 * -----------------------------------------------------------------------------
 * @typedef {*} val
 * @typedef {Array<*>} vals
 * @typedef {Array<string>} strings
 * @typedef {Array<number>} numbers
 * @typedef {Array<Object>} objects
 * @typedef {Array<boolean>} booleans
 */

////////////////////////////////////////////////////////////////////////////////
// The Dependencies
////////////////////////////////////////////////////////////////////////////////

/* -----------------------------------------------------------------------------
 * Algorithm IV JavaScript Shortcuts (dependencies/algorithmIV-utils.min.js)
 * -------------------------------------------------------------------------- */

/* JSON3 v3.3.2 | https://bestiejs.github.io/json3 | Copyright 2012-2015, Kit Cambridge, Benjamin Tan | http://kit.mit-license.org */
(function(){function M(r,q){function p(a,l){try{a()}catch(c){l&&l()}}function k(a){if(null!=k[a])return k[a];var l;if("bug-string-char-index"==a)l="a"!="a"[0];else if("json"==a)l=k("json-stringify")&&k("date-serialization")&&k("json-parse");else if("date-serialization"==a){if(l=k("json-stringify")&&v){var c=q.stringify;p(function(){l='"-271821-04-20T00:00:00.000Z"'==c(new z(-864E13))&&'"+275760-09-13T00:00:00.000Z"'==c(new z(864E13))&&'"-000001-01-01T00:00:00.000Z"'==c(new z(-621987552E5))&&'"1969-12-31T23:59:59.999Z"'==
c(new z(-1))})}}else{var b;if("json-stringify"==a){var c=q.stringify,e="function"==typeof c;e&&((b=function(){return 1}).toJSON=b,p(function(){e="0"===c(0)&&"0"===c(new B)&&'""'==c(new A)&&c(t)===u&&c(u)===u&&c()===u&&"1"===c(b)&&"[1]"==c([b])&&"[null]"==c([u])&&"null"==c(null)&&"[null,null,null]"==c([u,t,null])&&'{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}'==c({a:[b,!0,!1,null,"\x00\b\n\f\r\t"]})&&"1"===c(null,b)&&"[\n 1,\n 2\n]"==c([1,2],null,1)},function(){e=!1}));l=e}if("json-parse"==a){var n=
q.parse,d;"function"==typeof n&&p(function(){0===n("0")&&!n(!1)&&(b=n('{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}'),d=5==b.a.length&&1===b.a[0])&&(p(function(){d=!n('"\t"')}),d&&p(function(){d=1!==n("01")}),d&&p(function(){d=1!==n("1.")}))},function(){d=!1});l=d}}return k[a]=!!l}r||(r=f.Object());q||(q=f.Object());var B=r.Number||f.Number,A=r.String||f.String,E=r.Object||f.Object,z=r.Date||f.Date,I=r.SyntaxError||f.SyntaxError,J=r.TypeError||f.TypeError,K=r.Math||f.Math,F=r.JSON||f.JSON;"object"==
typeof F&&F&&(q.stringify=F.stringify,q.parse=F.parse);var E=E.prototype,t=E.toString,G=E.hasOwnProperty,u,v=new z(-0xc782b5b800cec);p(function(){v=-109252==v.getUTCFullYear()&&0===v.getUTCMonth()&&1===v.getUTCDate()&&10==v.getUTCHours()&&37==v.getUTCMinutes()&&6==v.getUTCSeconds()&&708==v.getUTCMilliseconds()});k["bug-string-char-index"]=k["date-serialization"]=k.json=k["json-stringify"]=k["json-parse"]=null;if(!k("json")){var N=k("bug-string-char-index"),C=function(a,b){var c=0,g,e,n;(g=function(){this.valueOf=
0}).prototype.valueOf=0;e=new g;for(n in e)G.call(e,n)&&c++;g=e=null;c?C=function(a,c){var b="[object Function]"==t.call(a),l,e;for(l in a)b&&"prototype"==l||!G.call(a,l)||(e="constructor"===l)||c(l);(e||G.call(a,l="constructor"))&&c(l)}:(e="valueOf toString toLocaleString propertyIsEnumerable isPrototypeOf hasOwnProperty constructor".split(" "),C=function(a,c){var b="[object Function]"==t.call(a),l,g=!b&&"function"!=typeof a.constructor&&D[typeof a.hasOwnProperty]&&a.hasOwnProperty||G;for(l in a)b&&
"prototype"==l||!g.call(a,l)||c(l);for(b=e.length;l=e[--b];g.call(a,l)&&c(l));});return C(a,b)};if(!k("json-stringify")||!k(" date-serialization")){var L={92:"\\\\",34:'\\"',8:"\\b",12:"\\f",10:"\\n",13:"\\r",9:"\\t"},x=function(a,b){return("000000"+(b||0)).slice(-a)},V=function(a){a=a.charCodeAt(0);var b=L[a];return b?b:"\\u00"+x(2,a.toString(16))},O=/[\x00-\x1f\x22\x5c]/g,S=function(a){O.lastIndex=0;return'"'+(O.test(a)?a.replace(O,V):a)+'"'},P=function(a){var b,c,g,e,n,d,h,f,m;if(v)b=function(a){c=
a.getUTCFullYear();g=a.getUTCMonth();e=a.getUTCDate();d=a.getUTCHours();h=a.getUTCMinutes();f=a.getUTCSeconds();m=a.getUTCMilliseconds()};else{var w=K.floor,k=[0,31,59,90,120,151,181,212,243,273,304,334],p=function(a,c){return k[c]+365*(a-1970)+w((a-1969+(c=+(1<c)))/4)-w((a-1901+c)/100)+w((a-1601+c)/400)};b=function(a){e=w(a/864E5);for(c=w(e/365.2425)+1970-1;p(c+1,0)<=e;c++);for(g=w((e-p(c,0))/30.42);p(c,g+1)<=e;g++);e=1+e-p(c,g);n=(a%864E5+864E5)%864E5;d=w(n/36E5)%24;h=w(n/6E4)%60;f=w(n/1E3)%60;
m=n%1E3}}P=function(a){a>-1/0&&a<1/0?(b(a),a=(0>=c||1E4<=c?(0>c?"-":"+")+x(6,0>c?-c:c):x(4,c))+"-"+x(2,g+1)+"-"+x(2,e)+"T"+x(2,d)+":"+x(2,h)+":"+x(2,f)+"."+x(3,m)+"Z",c=g=e=d=h=f=m=null):a=null;return a};return P(a)},Q=function(a,b,c,g,e,n,d){var h,f,m,k,q,r;p(function(){h=b[a]});"object"==typeof h&&h&&(h.getUTCFullYear&&"[object Date]"==t.call(h)&&h.toJSON===z.prototype.toJSON?h=P(h):"function"==typeof h.toJSON&&(h=h.toJSON(a)));c&&(h=c.call(b,a,h));if(h==u)return h===u?h:"null";f=typeof h;"object"==
f&&(m=t.call(h));switch(m||f){case "boolean":case "[object Boolean]":return""+h;case "number":case "[object Number]":return h>-1/0&&h<1/0?""+h:"null";case "string":case "[object String]":return S(""+h)}if("object"==typeof h){for(f=d.length;f--;)if(d[f]===h)throw J();d.push(h);k=[];r=n;n+=e;if("[object Array]"==m){q=0;for(f=h.length;q<f;q++)m=Q(q,h,c,g,e,n,d),k.push(m===u?"null":m);f=k.length?e?"[\n"+n+k.join(",\n"+n)+"\n"+r+"]":"["+k.join(",")+"]":"[]"}else C(g||h,function(a){var b=Q(a,h,c,g,e,n,
d);b!==u&&k.push(S(a)+":"+(e?" ":"")+b)}),f=k.length?e?"{\n"+n+k.join(",\n"+n)+"\n"+r+"}":"{"+k.join(",")+"}":"{}";d.pop();return f}};q.stringify=function(a,b,c){var g,e,f,d;if(D[typeof b]&&b)if(d=t.call(b),"[object Function]"==d)e=b;else if("[object Array]"==d){f={};for(var h=0,m=b.length,k;h<m;k=b[h++],(d=t.call(k),"[object String]"==d||"[object Number]"==d)&&(f[k]=1));}if(c)if(d=t.call(c),"[object Number]"==d){if(0<(c-=c%1))for(g="",10<c&&(c=10);g.length<c;g+=" ");}else"[object String]"==d&&(g=
10>=c.length?c:c.slice(0,10));return Q("",(k={},k[""]=a,k),e,f,g,"",[])}}if(!k("json-parse")){var W=A.fromCharCode,X={92:"\\",34:'"',47:"/",98:"\b",116:"\t",110:"\n",102:"\f",114:"\r"},b,H,m=function(){b=H=null;throw I();},y=function(){for(var a=H,l=a.length,c,g,e,f,d;b<l;)switch(d=a.charCodeAt(b),d){case 9:case 10:case 13:case 32:b++;break;case 123:case 125:case 91:case 93:case 58:case 44:return c=N?a.charAt(b):a[b],b++,c;case 34:c="@";for(b++;b<l;)if(d=a.charCodeAt(b),32>d)m();else if(92==d)switch(d=
a.charCodeAt(++b),d){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:c+=X[d];b++;break;case 117:g=++b;for(e=b+4;b<e;b++)d=a.charCodeAt(b),48<=d&&57>=d||97<=d&&102>=d||65<=d&&70>=d||m();c+=W("0x"+a.slice(g,b));break;default:m()}else{if(34==d)break;d=a.charCodeAt(b);for(g=b;32<=d&&92!=d&&34!=d;)d=a.charCodeAt(++b);c+=a.slice(g,b)}if(34==a.charCodeAt(b))return b++,c;m();default:g=b;45==d&&(f=!0,d=a.charCodeAt(++b));if(48<=d&&57>=d){for(48==d&&(d=a.charCodeAt(b+1),48<=d&&57>=d)&&m();b<
l&&(d=a.charCodeAt(b),48<=d&&57>=d);b++);if(46==a.charCodeAt(b)){for(e=++b;e<l&&(d=a.charCodeAt(e),48<=d&&57>=d);e++);e==b&&m();b=e}d=a.charCodeAt(b);if(101==d||69==d){d=a.charCodeAt(++b);43!=d&&45!=d||b++;for(e=b;e<l&&(d=a.charCodeAt(e),48<=d&&57>=d);e++);e==b&&m();b=e}return+a.slice(g,b)}f&&m();c=a.slice(b,b+4);if("true"==c)return b+=4,!0;if("fals"==c&&101==a.charCodeAt(b+4))return b+=5,!1;if("null"==c)return b+=4,null;m()}return"$"},R=function(a){var b,c;"$"==a&&m();if("string"==typeof a){if("@"==
(N?a.charAt(0):a[0]))return a.slice(1);if("["==a){for(b=[];;){a=y();if("]"==a)break;c?","==a?(a=y(),"]"==a&&m()):m():c=!0;","==a&&m();b.push(R(a))}return b}if("{"==a){for(b={};;){a=y();if("}"==a)break;c?","==a?(a=y(),"}"==a&&m()):m():c=!0;","!=a&&"string"==typeof a&&"@"==(N?a.charAt(0):a[0])&&":"==y()||m();b[a.slice(1)]=R(y())}return b}m()}return a},U=function(a,b,c){c=T(a,b,c);c===u?delete a[b]:a[b]=c},T=function(a,b,c){var g=a[b],e;if("object"==typeof g&&g)if("[object Array]"==t.call(g))for(e=g.length;e--;U(g,
e,c));else C(g,function(a){U(g,a,c)});return c.call(a,b,g)};q.parse=function(a,f){var c,g;b=0;H=""+a;c=R(y());"$"!=y()&&m();b=H=null;return f&&"[object Function]"==t.call(f)?T((g={},g[""]=c,g),"",f):c}}}q.runInContext=M;return q}var I=typeof define==="function"&&define.amd,D={"function":!0,object:!0},A=D[typeof exports]&&exports&&!exports.nodeType&&exports,f=D[typeof window]&&window||this,p=A&&D[typeof module]&&module&&!module.nodeType&&"object"==typeof global&&global;!p||p.global!==p&&p.window!==
p&&p.self!==p||(f=p);if(A&&!I)M(f,A);else{var J=f.JSON,K=f.JSON3,L=!1,B=M(f,f.JSON3={noConflict:function(){L||(L=!0,f.JSON=J,f.JSON3=K,J=K=null);return B}});f.JSON={parse:B.parse,stringify:B.stringify}}I&&define(function(){return B})}).call(this);

/* Algorithm IV JavaScript Polyfills (v0.0.2) (imagineadamsmith@gmail.com)
 * Author: Adam Smith (imagineadamsmith@gmail.com)
 * Copyright (c) 2022 Adam A Smith (github.com/imaginate)
 * The Apache License (www.apache.org/licenses/LICENSE-2.0) */
(function(h,m,n){h.console=h.console||{};(function(a,b){a.log||(a.log=b);a.error||(a.error=a.log);a.assert||(a.assert=function(b){var c;if(!b)return c=1<arguments.length?Array.prototype.slice.call(arguments,1):["A console.assert call failed."],a.error.apply(this,c)});a.clear||(a.clear=b);a.count||(a.count=b);a.debug||(a.debug=a.log);a.dir||(a.dir=a.log);a.dirxml||(a.dirxml=a.log);a.exception||(a.exception=a.error);a.group||(a.group=b);a.groupCollapsed||(a.groupCollapsed=a.group);a.groupEnd||(a.groupEnd=
b);a.info||(a.info=a.log);a.markTimeline||(a.markTimeline=a.timeStamp?a.timeStamp:b);a.profile||(a.profile=b);a.profileEnd||(a.profileEnd=b);a.table||(a.table=b);a.time||(a.time=b);a.timeEnd||(a.timeEnd=b);a.timeline||(a.timeline=b);a.timelineEnd||(a.timelineEnd=b);a.timeStamp||(a.timeStamp=a.markTimeline);a.trace||(a.trace=a.log);a.warn||(a.warn=a.error);(function(b,c,e,h){var f,k,l,g;if(b)if(l=["assert","error","info","log","warn"],g=["clear","dir","profile","profileEnd"],g=l.concat(g),c)for(f=
g.length;f--;)k=a[g[f]],a[g[f]]=c.call(k,a);else for(f=l.length;f--;)k=a[l[f]],e.call(k,a,h.call(arguments))})("object"===typeof a.log,Function.prototype.bind,Function.prototype.call,Array.prototype.slice)})(h.console,function(){});Object.keys||(Object.keys=function(){var a,b;a=!{toString:null}.propertyIsEnumerable("toString");b="toString toLocaleString valueOf hasOwnProperty isPrototypeOf propertyIsEnumerable constructor".split(" ");return function(d){var c,e;if(!d||"object"!==typeof d&&"function"!==
typeof d)throw new TypeError("An Object.keys call received an invalid object parameter. Note: It only accepts non-null objects and functions.");e=[];for(c in d)d.hasOwnProperty(c)&&e.push(c);if(a)for(c=b.length;c--;)d.hasOwnProperty(b[c])&&e.push(b[c]);return e}}());Object.freeze||(Object.freeze=function(a){if(!a||"object"!==typeof a&&"function"!==typeof a)throw new TypeError("An Object.freeze call received an invalid object parameter. Note: It only accepts non-null objects and functions.");return a});
try{Object.freeze(function(){})}catch(p){Object.freeze=function(a){return function(b){return"function"===typeof b?b:a(b)}}(Object.freeze)}Object.isFrozen||(Object.isFrozen=function(a){if(!a||"object"!==typeof a&&"function"!==typeof a)throw new TypeError("An Object.isFrozen call received an invalid object parameter. Note: It only accepts non-null objects and functions.");return!0});Array.isArray||(Array.isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)});(function(a){a&&
(a=[8,9],a=-1===a.indexOf(8,2)&&-1===a.indexOf(9,-1));return a})(!!Array.prototype.indexOf)||(Array.prototype.indexOf=function(a,b){var d,c,e;if(!Array.isArray(this))throw new TypeError("An Array.prototype.indexOf call was made on a non-array.");"number"!==typeof b&&(b=0);c=this.length;d=-1;if(0!==c&&Math.abs(b)<c)for(0>b&&(c-=b),e=0>b?-1:--b;++e<c;)if(this[e]===a){d=e;break}return d});XMLHttpRequest||(XMLHttpRequest=function(){var a;try{a=new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(b){try{a=new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(d){try{a=
new ActiveXObject("Microsoft.XMLHTTP")}catch(c){throw Error("Your browser does not support XMLHttpRequest.");}}}return a})})(window,document);

/* Algorithm IV JavaScript Shortcuts (v1.0.6) (imagineadamsmith@gmail.com)
 * Author: Adam Smith (imagineadamsmith@gmail.com)
 * Copyright (c) 2022 Adam A Smith (github.com/imaginate)
 * The Apache License (www.apache.org/licenses/LICENSE-2.0) */
(function(g,v){g.aIV=g.aIV||{};aIV.utils=aIV.utils||v})(window,function(g,v,z){var d={},l={checkArgsErrorMsg:"A function call had an invalid parameter data type.",getElemByClassRoot:v,getElemsByClassRoot:v,getElemByTagRoot:v,getElemsByTagRoot:v,types:{checkArgsErrorMsg:"string|function",getElemByClassRoot:"!(Document|Element)",getElemsByClassRoot:"!(Document|Element)",getElemByTagRoot:"!(Document|Element)",getElemsByTagRoot:"!(Document|Element)"}};Object.freeze(l);Object.freeze(l.types);var p={checkArgsErrorMsg:l.checkArgsErrorMsg,
getElemByClassRoot:l.getElemByClassRoot,getElemsByClassRoot:l.getElemsByClassRoot,getElemByTagRoot:l.getElemByTagRoot,getElemsByTagRoot:l.getElemsByTagRoot};g={};g.freezeRegExpBug=function(){var c,b;c=/0/g;Object.freeze(c);b=!0;try{"T00 many zer0s... replace them.".replace(c,"o")}catch(a){b=!1}return!b}();Object.freeze(g);d.checkType=function(){var c=/^string$|^number$|^boolean$|^function$|^undefined$/,b=/^string$|^number$|^boolean$|^object$|^function$|^undefined$/,a=/^elem$|^element$|^document$/,
f=/^array$|^strings$|^numbers$|^booleans$|^objects$|^arrays$|^elems$|^elements$|^functions$/,d=/^stringmap$|^numbermap$|^booleanmap$|^objectmap$|^arraymap$|^functionmap$|^elemmap$|^elementmap$/,m=/\!/,g=/\?/,n=/\=/,v=/\*/,p=function(a,b){return null===a?!1:typeof a===b},l=function(a,b){return a&&p(a,"object")&&a.nodeType?a.nodeType==={elem:1,element:1,document:9}[b]:!1};return function(k,e,r){var t,w,q,h;if(!p(e,"string"))throw new TypeError("An aIV.utils.checkType call received an invalid (a non-string) type parameter.");
if(v.test(e)){if(1<e.length)throw k="An aIV.utils.checkType call received an invalid type string. When using an asterisk, '*', no other values should be given as the asterisk guarantees the check will ",k+="pass.",Error(k);return!0}if(t=k===z&&n.test(e))h=!0;else{h=e;var u;u=(q=null===k)?m.test(h):!0;q&&g.test(h)&&(u=!u);h=u}q=t||!h||m.test(e)?!1:g.test(e);t=t||q&&h;if(!r||!t)if(e=e.toLowerCase(),e=e.replace(x.exceptLowerAlphaAndPipe,""),w=e.split("|"),!r)for(e=w,u=!0,r=e.length;u&&r--;)if(u=x.allDataTypes.test(e[r]),
!u)throw k=void 0,k="An aIV.utils.checkType call received an invalid type ",k+="string. The value '"+e[r]+"' was incorrect. ",k+="Check aIV.utils.checkType's documentation for a ",k+="list of acceptable type strings.",Error(k);if(!t){if(null===k){k=w;t=q;e=!1;for(w=k.length;!e&&w--;)h||(t=!c.test(k[w])),e=t;k=e}else{t=w;h=!1;for(w=t.length;!h&&w--;){e=t[w];if("any"===e){h=!0;break}if(b.test(e))h=p(k,e);else if(a.test(e))h=l(k,e);else if(f.test(e))if(h=k,u=q=r=void 0,Array.isArray(h))if("array"===
e)h=!0;else{e=e.slice(0,-1);u="array"===e?Array.isArray:a.test(e)?l:p;q=!0;for(r=h.length;q&&r--;)q=u(h[r],e);h=q}else h=!1;else if(d.test(e))if(h=k,u=q=r=void 0,p(h,"object")){e=e.slice(0,-3);u="array"===e?Array.isArray:a.test(e)?l:p;q=!0;for(r in h)if(h.hasOwnProperty(r)&&(q=u(h[r],e),!q))break;h=q}else h=!1}k=h}t=k}return t}}();d.isValidTypeString=function(c){var b,a;if("string"!==typeof c)throw new TypeError("An aIV.utils.isValidTypeString call received an invalid (a non-string) typeString parameter.");
c=c.toLowerCase();c=c.replace(x.exceptLowerAlphaAndPipe,"");a=c.split("|");b=!0;for(c=a.length;b&&c--;)b=x.allDataTypes.test(a[c]);return b};d.checkArgs=function(){var c=d.checkType,b=d.isValidTypeString;return function(){var a,f,d,m,g,n,l;f=arguments.length;if(2>f||f%2)throw Error("An aIV.utils.checkArgs call was missing parameters.");g=Array.prototype.slice.call(arguments,0);n=!0;for(a=-1;++a<f;)if(a%2){m=g[a];l=(l=c(m,"string",!0))&&b(m);if(!l)throw n=void 0,n="An aIV.utils.checkArgs call received an invalid type ",
n+="string. The value '"+m+"' was incorrect. ",n+="Check aIV.utils.checkType's documentation for a ",n+="list of acceptable type strings.",Error(n);n=n&&c(d,m,!0)}else d=g[a];if(!n&&(m=p.checkArgsErrorMsg,(m=c(m,"string")?m:m())&&c(m,"string")))throw new TypeError(m);return n}}();d.getTypeOf=function(){var c=d.checkType;return function(b){var a;a=typeof b;"object"===a&&c(b,"document|element|array")&&(a=null===b?"null":Array.isArray(b)?"array":1===b.nodeType?"element":"document");return a}}();d.freezeObj=
function(c){var b=function(a){var f;Object.freeze(a);for(f in a)!a.hasOwnProperty(f)||!a[f]||"object"!==typeof a[f]&&"function"!==typeof a[f]||c&&a[f]instanceof RegExp||b(a[f])};return function(a,f){if(!a||"object"!==typeof a&&"function"!==typeof a)throw new TypeError("An aIV.utils.freezeObj call received an invalid obj parameter.");if(c&&a instanceof RegExp)return a;"boolean"!==typeof f&&(f=!1);f?b(a):Object.freeze(a);return a}}(g.freezeRegExpBug);d.hasOwnProp=function(c,b){var a;if(!c||"object"!==
typeof c&&"function"!==typeof c)throw new TypeError("An aIV.utils.hasOwnProp call received an invalid obj parameter.");if(!b||"string"!==typeof b&&"number"!==typeof b)throw a="An aIV.utils.hasOwnProp call received an invalid prop parameter.",new TypeError(a);return c.hasOwnProperty(b)};var x={allDataTypes:/^any$|^string$|^number$|^boolean$|^object$|^array$|^function$|^elem$|^element$|^undefined$|^null$|^document$|^strings$|^numbers$|^booleans$|^objects$|^arrays$|^elems$|^elements$|^functions$|^stringmap$|^numbermap$|^booleanmap$|^objectmap$|^arraymap$|^functionmap$|^elemmap$|^elementmap$/,
exceptLowerAlphaAndPipe:/[^a-z\|]/g};d.freezeObj(x,!0);g={};g.textContent="textContent"in v;Object.freeze(g);d.getElemById=function(c){if(!c||"string"!==typeof c)throw new TypeError("An aIV.utils.getElemById call received an invalid id parameter (should be a string).");c=v.getElementById(c);if(!c)throw c="An aIV.utils.getElemById call received an invalid id parameter (i.e. no element with the id was found).",new RangeError(c);return c};d.getElemByClass=function(c,b,a){if(!c||"string"!==typeof c)throw new TypeError("An aIV.utils.getElemByClass call received an invalid class name parameter.");
b="number"!==typeof b||-1>b?0:Math.floor(b);a&&"object"===typeof a&&(a instanceof Element||a instanceof Document)||(a=p.getElemByClassRoot);c=a.getElementsByClassName?a.getElementsByClassName(c):y.getElementsByClassNameAlt(c,a);if(0>b||b>=c.length)b=c.length-1;b=c[b];if(!b)throw b="An aIV.utils.getElemByClass call received an invalid class name parameter ",b+="(i.e. no element with the class name was found).",new RangeError(b);return b};d.getElemsByClass=function(c,b){if(!c||"string"!==typeof c)throw new TypeError("An aIV.utils.getElemsByClass call received an invalid class name parameter.");
b&&"object"===typeof b&&(b instanceof Element||b instanceof Document)||(b=p.getElemsByClassRoot);return b.getElementsByClassName?b.getElementsByClassName(c):y.getElementsByClassNameAlt(c,b)};d.getElemByTag=function(c,b,a){if(!c||"string"!==typeof c)throw new TypeError("An aIV.utils.getElemByTag call received an invalid tag name parameter.");b="number"!==typeof b||-1>b?0:Math.floor(b);a&&"object"===typeof a&&(a instanceof Element||a instanceof Document)||(a=p.getElemByTagRoot);c=a.getElementsByTagName(c);
if(0>b||b>=c.length)b=c.length-1;b=c[b];if(!b)throw b="An aIV.utils.getElemByTag call received an invalid tag name parameter ",b+="(i.e. no element with the tag name was found).",new RangeError(b);return b};d.getElemsByTag=function(c,b){if(!c||"string"!==typeof c)throw new TypeError("An aIV.utils.getElemsByTag call received an invalid tag name parameter.");b&&"object"===typeof b&&(b instanceof Element||b instanceof Document)||(b=p.getElemsByTagRoot);return b.getElementsByTagName(c)};d.setElemText=
function(c,b){return function(a,f){var d;if(!c(a,"!element"))throw new TypeError("An aIV.utils.setElemText call received an invalid elem parameter (should be a DOM Element).");if(!c(f,"string"))throw d="An aIV.utils.setElemText call received an invalid text parameter (should be a string).",new TypeError(d);b?a.textContent=f:a.innerText=f;return a}}(d.checkType,g.textContent);d.makeElem=function(c,b){return function(a){var f;c(a,"string")?f=a:c(a,"!object")?f=a.tag||a.tagName:a=null;f=v.createElement(f||
"div");a&&(a.text&&c(a.text,"string")&&b(f,a.text),a.html&&c(a.html,"string")&&(f.innerHTML=a.html),a.id&&c(a.id,"string")&&(f.id=a.id),a.className&&c(a.className,"string")&&(f.className=a.className));return f}}(d.checkType,d.setElemText);d.addElemText=function(c,b){return function(a,f){var d;if(!c(a,"!element"))throw new TypeError("An aIV.utils.addElemText call received an invalid elem parameter (should be a DOM Element).");if(!c(f,"string"))throw d="An aIV.utils.addElemText call received an invalid text parameter (should be a string).",
new TypeError(d);f&&(b?a.textContent+=f:a.innerText+=f);return a}}(d.checkType,g.textContent);var y={getElementsByClassNameAlt:function(c,b){var a,d,g,m,l,n;if(b.querySelectorAll)m=b.querySelectorAll("."+c);else if(v.evaluate)for(m=[],g='"'+(" "+c+" ")+'")]',a=v.evaluate(g,b,null,0,null),g=a.iterateNext();g;)m.push(g),g=a.iterateNext();else for(n=new RegExp("(^|s)"+c+"(s|$)"),l=b.getElementsByTagName("*"),m=[],d=l.length,a=-1;++a<d;)g=l[a],n.test(g.className)&&m.push(g);return m}};d.freezeObj(y,!0);
d.set=function(){var c=d.checkType;return function(b){var a;if(!b||"object"!==typeof b)throw new TypeError("An aIV.utils.set call received an invalid settings parameter (should be an object).");for(a in p)if(p.hasOwnProperty(a)&&b.hasOwnProperty(a))if(c(b[a],l.types[a]))p[a]=b[a];else throw b=void 0,b="An aIV.utils.set call received an invalid "+a,b+=" settings parameter (should be a "+l.types[a],b+=").",new TypeError(b);return!0}}();d.reset=function(){var c,b,a;c=(c=arguments.length)?1<c?Array.prototype.slice.call(arguments,
0):Array.isArray(arguments[0])?arguments[0]:[arguments[0]]:Object.keys(p);if(!d.checkType(c,"!strings"))throw new TypeError("An aIV.utils.reset call received an invalid setting parameter (should be a string or an array of strings).");for(a=c.length;a--;)b=c[a],p.hasOwnProperty(b)&&(p[b]=l[b]);return!0};d.freezeObj(d,!0);return d}(window,document));

////////////////////////////////////////////////////////////////////////////////
// The Public API
////////////////////////////////////////////////////////////////////////////////

(function setupTheDebugPublicAPI(window, debugModuleAPI) {
  "use strict";

/* -----------------------------------------------------------------------------
 * The Public API (public-api.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------------------
   * Global Object (aIV)
   * ---------------------------------------------------------------
   * @desc Holds the public API for aIV's apps, tools, and libraries.
   * @struct
   * @global
   */
  window.aIV = window.aIV || {};

  /**
   * ---------------------------------------------------------------
   * Global Object (aIV.console)
   * ---------------------------------------------------------------
   * @desc Holds the public API for aIV's console.
   * @struct
   * @global
   */
  aIV.console = debugModuleAPI.console;

  /**
   * ---------------------------------------------------------------
   * Global Method (aIV.console.create) (SAME AS aIV.debug)
   * ---------------------------------------------------------------
   * @desc Creates or retrieves an instance of aIV's Debug class.
   * @param {?(string|Object)=} settings - A string of the Debug instance's
   *   class name or an object with the Debug instance's settings.
   * @param {string=} settings.classTitle - The Debug instance's class name.
   * @param {string=} settings.className - The same as settings.classTitle.
   * @param {!(string|strings)=} settings.turnOffMethods - Contains the methods
   *   to disable for this Debug instance. The options are 'all', 'none',
   *   'init', 'start', 'end', 'args', 'fail', 'group', 'state', and 'misc'.
   *   This setting does override the module defaults.
   * @param {!(string|strings)=} settings.turnOffTypes - The same as
   *   settings.turnOffMethods. Maintains backward compatibility.
   * @param {!(string|strings)=} settings.addBreakpoints - Contains the methods
   *   to add debugger breakpoints to for this Debug instance. The options are
   *   'all', 'none', 'init', 'start', 'end', 'args', 'fail', 'group', 'state',
   *   and 'misc'. This setting does override the module defaults.
   * @param {!(string|strings)=} settings.turnOnDebuggers - The same as
   *   settings.addBreakpoints. Maintains backward compatibility.
   * @param {boolean=} settings.turnOnGroups - Enables/disables automatic
   *   grouping of all logs, timers, and profiles between every start and end
   *   method for this Debug instance.
   * @param {boolean=} settings.openGroups - For enabled automatic log grouping
   *   determines whether groups should be open or collapsed for this Debug
   *   instance (i.e. if turnOnGroups is enabled then openGroups controls
   *   whether the auto log groups are open or collapsed).
   * @param {boolean=} settings.turnOnProfiles - Enables/disables automatic
   *   profiling for all logic between every start and end method for this
   *   Debug instance.
   * @param {boolean=} settings.turnOnTimers - Enables/disables automatic
   *   timing for all logic between every start and end method for this
   *   Debug instance.
   * @return {!Debug} A new or existing Debug object.
   * @global
   */
  aIV.console.create = debugModuleAPI.init;

  /**
   * ---------------------------------------------------------------
   * Global Method (aIV.console.set) (SAME AS aIV.debug.set)
   * ---------------------------------------------------------------
   * @desc Allows you to configure the default settings for each new Debug class
   *   instance and enable/disable inserted breakpoints for user errors that
   *   occur upon any Debug class method call (e.g. if you forget to add the
   *   method's name to a debug.start call an error will be logged and if
   *   errorBreakpoints is enabled a debugger breakpoint will be inserted
   *   after the error has been logged).
   * @param {!Object} settings - The Debug module's settings.
   * @param {boolean=} settings.errorBreakpoints - Controls if
   *   debugger breakpoints are inserted when any Debug class method call
   *   encounters an error.
   * @param {boolean=} settings.errorDebuggers - The same as
   *   settings.errorBreakpoints.
   * @param {string=} settings.classTitle - The default class title.
   * @param {string=} settings.className - The same as settings.classTitle.
   * @param {!(string|strings)=} settings.turnOffMethods - The default methods
   *   to disable for all new Debug instances created after this call.
   * @param {!(string|strings)=} settings.turnOffTypes - The same as
   *   settings.turnOffMethods. Maintains backward compatibility.
   * @param {!(string|strings)=} settings.addBreakpoints - The default
   *   methods to add debugger breakpoints to for all new Debug instances
   *   created after this call.
   * @param {!(string|strings)=} settings.turnOnDebuggers - The same as
   *   settings.addBreakpoints. Maintains backward compatibility.
   * @param {boolean=} settings.turnOnGroups - The default setting for automatic
   *   grouping of all logs, timers, and profiles between every start and end
   *   method.
   * @param {boolean=} settings.openGroups - The default open or collapsed
   *   setting for automatic log grouping (i.e. if turnOnGroups is enabled then
   *   openGroups determines if the auto log groups are open or collapsed).
   * @param {boolean=} settings.turnOnProfiles - The default setting for
   *   automatic profiling for all logic between every start and end method.
   * @param {boolean=} settings.turnOnTimers - The default setting for automatic
   *   timing for all logic between every start and end method.
   * @param {boolean=} settings.formatElementsAsObj - Controls whether elements
   *   are logged as JavaScript objects or DOM elements. For more details on the
   *   differences between the two logging styles (specifier '%o' vs '%O')
   *   [see Google's Console API Reference]{@link https://developer.chrome.com/devtools/docs/console-api#consolelogobject-object}.
   * @global
   */
  aIV.console.set = debugModuleAPI.set;

  /**
   * ---------------------------------------------------------------
   * Global Method (aIV.console.reset) (SAME AS aIV.debug.reset)
   * ---------------------------------------------------------------
   * @desc Allows you to reset any of the settings for the debugger.
   * @param {...(string|strings)=} setting - A setting to reset. If no arguments
   *   are given this method will automatically reset all of the options.
   * @return {boolean} The success of the new settings update.
   */
  aIV.console.reset = debugModuleAPI.reset;

  /**
   * ---------------------------------------------------------------
   * Global Method (aIV.debug) (SAME AS aIV.console.create)
   * ---------------------------------------------------------------
   * @desc The same as {@link aIV.console.create}.
   * @type {function(!Object)}
   * @global
   */
  aIV.debug = debugModuleAPI.init;

  /**
   * ---------------------------------------------------------------
   * Global Method (aIV.debug.set) (SAME AS aIV.console.set)
   * ---------------------------------------------------------------
   * @desc The same as {@link aIV.console.set}.
   * @type {function(!Object)}
   * @global
   */
  aIV.debug.set = debugModuleAPI.set;

  /**
   * ---------------------------------------------------------------
   * Global Method (aIV.debug.reset) (SAME AS aIV.console.reset)
   * ---------------------------------------------------------------
   * @desc The same as {@link aIV.console.reset}.
   * @type {function}
   * @global
   */
  aIV.debug.reset = debugModuleAPI.reset;

  /**
   * ---------------------------------------------------------------
   * Global Method (aIV.debug.setConfig) (SAME AS aIV.console.set)
   * ---------------------------------------------------------------
   * @desc The same as {@link aIV.console.set}. Maintains backward
   *   compatibility.
   * @type {function(!Object)}
   * @global
   */
  aIV.debug.setConfig = debugModuleAPI.set;

})(window,

////////////////////////////////////////////////////////////////////////////////
// The Debug Module
////////////////////////////////////////////////////////////////////////////////

(function setupTheDebugModule(window, document, undefined) {
  "use strict";

/* -----------------------------------------------------------------------------
 * The Public Module Variables (module-vars.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Variable (debugInstances)
   * -----------------------------------------------------
   * @desc Saves a reference to all of the created Debug instances.
   * @type {!Object<string, !Debug>}
   */
  var debugInstances = {};

  /**
   * ----------------------------------------------- 
   * Public Variable (errorBreakpoints)
   * -----------------------------------------------
   * @desc Controls whether debugger breakpoints are included with error logs.
   * @type {boolean}
   */
  var errorBreakpoints = true;

  /**
   * -----------------------------------------------
   * Public Variable (Debug_DEFAULTS)
   * -----------------------------------------------
   * @desc The original default settings for a new Debug instance.
   * @type {!{
   *   classTitle    : string,
   *   turnOffMethods: string,
   *   addBreakpoints: string,
   *   turnOnGroups  : boolean,
   *   openGroups    : boolean,
   *   turnOnProfiles: boolean,
   *   turnOnTimers  : boolean
   * }}
   */
  var Debug_DEFAULTS = {
    classTitle    : 'unknown',
    turnOffMethods: 'none',
    addBreakpoints: 'args fail',
    turnOnGroups  : true,
    openGroups    : false,
    turnOnProfiles: false,
    turnOnTimers  : false
  };

  /**
   * -----------------------------------------------
   * Public Variable (Debug_DEFAULT_TYPES)
   * -----------------------------------------------
   * @desc The data types for each settings property.
   * @type {!Object<string, string>}
   */
  var Debug_DEFAULT_TYPES = {
    classTitle    : 'string',
    turnOffMethods: 'string|!strings',
    addBreakpoints: 'string|!strings',
    turnOnGroups  : 'boolean',
    openGroups    : 'boolean',
    turnOnProfiles: 'boolean',
    turnOnTimers  : 'boolean'
  };

/* -----------------------------------------------------------------------------
 * The Public Module Methods (module-methods.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Method (makeNewDebugInst)
   * -----------------------------------------------------
   * @desc Creates a new Debug object instance. For more details about the
   *   parameters [see debugModuleAPI.init]{@link debugModuleAPI#init}.
   * @param {string} classTitle
   * @param {Object} settings
   * @param {(string|!strings)=} settings.turnOffMethods
   * @param {(string|!strings)=} settings.addBreakpoints
   * @param {boolean=} settings.turnOnGroups
   * @param {boolean=} settings.openGroups
   * @param {boolean=} settings.turnOnProfiles
   * @param {boolean=} settings.turnOnTimers
   */
  function makeNewDebugInst(classTitle, settings) {

    /** @type {!Object} */
    var defaultTypes;
    /** @type {!Object} */
    var newSettings;
    /** @type {!Object} */
    var defaults;
    /** @type {string} */
    var propName;
    /** @type {*} */
    var propVal;

    newSettings = {};
    defaults = Debug.defaults;

    // Set the new instance's settings to the defaults
    for (propName in defaults) {
      if ( hasOwnProp(defaults, propName) ) {
        newSettings[ propName ] = defaults[ propName ];
      }
    }

    // Update the new instance's settings with any local settings
    if (settings) {
      defaultTypes = Debug_DEFAULT_TYPES;
      for (propName in settings) {
        if (hasOwnProp(settings, propName) && hasOwnProp(defaults, propName)) {
          propVal = settings[ propName ];
          if ( checkType(propVal, defaultTypes[ propName ]) ) {
            if ( checkType(propVal, '!strings') ) {
              propVal = propVal.join(' ');
            }
            newSettings[ propName ] = propVal;
          }
        }
      }
    }

    // Update the new instance's class title
    newSettings.classTitle = classTitle;

    // Setup and save the new Debug instance
    debugInstances[ classTitle ] = new Debug(newSettings);
  };

  /**
   * -----------------------------------------------------
   * Public Method (insertErrorBreakpoint)
   * -----------------------------------------------------
   * @desc Handles whether a debugger breakpoint is inserted for an error.
   * @return {boolean} Whether a breakpoint was inserted.
   */
  function insertErrorBreakpoint() {

    if (errorBreakpoints) {
      debugger;
    }

    return errorBreakpoints;
  };

  /**
   * ---------------------------------------------------
   * Public Method (freezeObj)
   * ---------------------------------------------------
   * @desc A shortcut for the Object.freeze method with a deep freeze option.
   * @param {!(Object|function)} obj - The object to freeze.
   * @param {boolean=} deep - Deep freeze the object. The default is false.
   * @return {!(Object|function)} The frozen object.
   */
  var freezeObj = aIV.utils.freezeObj;

  /**
   * ---------------------------------------------------
   * Public Method (hasOwnProp)
   * ---------------------------------------------------
   * @desc A shortcut for the Object.prototype.hasOwnProperty method.
   * @param {!(Object|function)} obj - The object to check.
   * @param {string} prop - The property to check.
   * @return {boolean} The result of the check.
   */
  var hasOwnProp = aIV.utils.hasOwnProp;

  /**
   * ---------------------------------------------------
   * Public Method (checkType)
   * ---------------------------------------------------
   * @desc Checks a value's data type against the given optional types.
   * @param {*} val - The value to be evaluated.
   * @param {string} type - A string of the data types to evaluate the value
   *   against. For a complete list of acceptable strings
   *   [see aIV.utils.checkType]{@link https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/js-methods/checkType.js}.
   * @param {boolean=} noTypeValCheck - If true skips the data type string checks.
   *   The default is false. Use to avoid duplicating checks.
   * @return {boolean} The evaluation result.
   */
  var checkType = aIV.utils.checkType;

  /**
   * ---------------------------------------------------
   * Public Method (isValidTypeString)
   * ---------------------------------------------------
   * @desc Evaluates whether a string is a valid data type string.
   * @param {string} type - The string to evaluate.
   * @return {boolean} The evaluation result.
   */
  var isValidTypeString = aIV.utils.isValidTypeString;

  /**
   * ---------------------------------------------------
   * Public Method (getTypeOf)
   * ---------------------------------------------------
   * @desc A shortcut for the native typeof operator that additionally
   *   distinguishes null, array, document, and element types from an
   *   object type.
   * @param {*} val - The value to get the typeof.
   * @return {string} The value's type.
   */
  var getTypeOf = aIV.utils.getTypeOf;

  /**
   * -----------------------------------------------------
   * Public Method (makeResetString)
   * -----------------------------------------------------
   * @desc Makes an array of strings representing each value to be reset.
   * @param {Array<string>=} settings - The settings to reset.
   * @return {Array<string>} The array of strings to reset.
   */
  var makeResetString = (function setup_makeResetString() {

    /** @type {!Object<string, string>} */
    var props;
    /** @type {string} */
    var propName;

    // A hash map of propName => propName
    props = {
      errorBreakpoints   : 'errorBreakpoints',
      errorDebuggers     : 'errorBreakpoints',
      className          : 'classTitle',
      turnOffTypes       : 'turnOffMethods',
      turnOnDebuggers    : 'addBreakpoints',
      formatElementsAsObj: 'formatElementsAsObj'
    };

    for (propName in Debug_DEFAULTS) {
      if ( hasOwnProp(Debug_DEFAULTS, propName) ) {
        props[ propName ] = propName;
      }
    }

    return function makeResetString(settings) {

      /** @type {!Array<string>} */
      var result;
      /** @type {string} */
      var prop;
      /** @type {number} */
      var len;
      /** @type {number} */
      var i;

      if ( checkType(settings, '?null=') ) {
        result = [];
        // Add all props to the result
        for (prop in props) {
          if ( hasOwnProp(props, prop) ) {
            result.push(props[ prop ]);
          }
        }
      }
      else {
        if ( checkType(settings, '!strings') ) {
          result = [];
          // Add the correct props to the result
          i = settings.length;
          while (i--) {
            prop = args[i];
            if ( hasOwnProp(props, prop) ) {
              result.push(props[ prop ]);
            }
          }
        }
        else {
          result = null;
        }
      }

      return result;
    };
  })();

/* -----------------------------------------------------------------------------
 * The Debug Module API (module-api.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Variable (debugModuleAPI)
   * -----------------------------------------------------
   * @desc Holds the module's public properties and methods.
   * @type {!Object<string, function>}
   * @struct
   */
  var debugModuleAPI = {};


  /**
   * -----------------------------------------------------
   * Public Object (debugModuleAPI.console)
   * -----------------------------------------------------
   * @desc The container for aIV's console.
   * @type {!Object<string, function(*)>}
   */
  debugModuleAPI.console = {};

  /**
   * -----------------------------------------------------
   * Public Method (debugModuleAPI.init)
   * -----------------------------------------------------
   * @desc Creates or retrieves an instance of the Debug class.
   * @param {?(string|Object)=} settings - A string of the Debug instance's
   *   class name or an object with the Debug instance's settings.
   * @param {string=} settings.classTitle - The Debug instance's class name.
   * @param {string=} settings.className - The same as settings.classTitle.
   * @param {!(string|strings)=} settings.turnOffMethods - Contains the methods
   *   to disable for this Debug instance. The options are 'all', 'none',
   *   'init', 'start', 'end', 'args', 'fail', 'group', 'state', and 'misc'.
   *   This setting does override the module defaults.
   * @param {!(string|strings)=} settings.turnOffTypes - The same as
   *   settings.turnOffMethods. Maintains backward compatibility.
   * @param {!(string|strings)=} settings.addBreakpoints - Contains the methods
   *   to add debugger breakpoints to for this Debug instance. The options are
   *   'all', 'none', 'init', 'start', 'end', 'args', 'fail', 'group', 'state',
   *   and 'misc'. This setting does override the module defaults.
   * @param {!(string|strings)=} settings.turnOnDebuggers - The same as
   *   settings.addBreakpoints. Maintains backward compatibility.
   * @param {boolean=} settings.turnOnGroups - Enables/disables automatic
   *   grouping of all logs, timers, and profiles between every start and end
   *   method for this Debug instance.
   * @param {boolean=} settings.openGroups - For enabled automatic log grouping
   *   determines whether groups should be open or collapsed for this Debug
   *   instance (i.e. if turnOnGroups is enabled then openGroups controls
   *   whether the auto log groups are open or collapsed).
   * @param {boolean=} settings.turnOnProfiles - Enables/disables automatic
   *   profiling for all logic between every start and end method for this
   *   Debug instance.
   * @param {boolean=} settings.turnOnTimers - Enables/disables automatic
   *   timing for all logic between every start and end method for this
   *   Debug instance.
   * @return {!Debug} A new or existing Debug object.
   */
  debugModuleAPI.init = function(settings) {

    /** @type {string} */
    var classTitle;

    // Catch incorrect data types for settings
    if ( !checkType(settings, '?(string|object)') ) {
      settings = null;
    }

    // Setup classTitle
    classTitle = Debug.defaults.classTitle;
    if ( checkType(settings, 'string') ) {
      classTitle = settings;
      settings = null;
    }

    // Correct any old/alternate properties used
    if (settings) {
      settings = Debug.replaceOldSettings(settings);
      if (settings.classTitle && checkType(settings.classTitle, 'string')) {
        classTitle = settings.classTitle;
      }
    }

    // Create a new Debug instance
    if ( !hasOwnProp(debugInstances, classTitle) ) {
      makeNewDebugInst(classTitle, settings);
    }

    return debugInstances[ classTitle ];
  };

  /**
   * -----------------------------------------------------
   * Public Method (debugModuleAPI.set)
   * -----------------------------------------------------
   * @desc Allows you to configure the default settings for each new Debug class
   *   instance and enable/disable inserted breakpoints for user errors that
   *   occur upon any Debug class method call (e.g. if you forget to add the
   *   method's name to a debug.start call an error will be logged and if
   *   errorBreakpoints is enabled a debugger breakpoint will be inserted
   *   after the error has been logged).
   * @param {!Object} settings - The Debug module's settings.
   * @param {boolean=} settings.errorBreakpoints - Controls if
   *   debugger breakpoints are inserted when any Debug class method call
   *   encounters an error.
   * @param {boolean=} settings.errorDebuggers - The same as
   *   settings.errorBreakpoints.
   * @param {string=} settings.classTitle - The default class title.
   * @param {string=} settings.className - The same as settings.classTitle.
   * @param {!(string|strings)=} settings.turnOffMethods - The default methods
   *   to disable for all new Debug instances created after this call.
   * @param {!(string|strings)=} settings.turnOffTypes - The same as
   *   settings.turnOffMethods. Maintains backward compatibility.
   * @param {!(string|strings)=} settings.addBreakpoints - The default
   *   methods to add debugger breakpoints to for all new Debug instances
   *   created after this call.
   * @param {!(string|strings)=} settings.turnOnDebuggers - The same as
   *   settings.addBreakpoints. Maintains backward compatibility.
   * @param {boolean=} settings.turnOnGroups - The default setting for automatic
   *   grouping of all logs, timers, and profiles between every start and end
   *   method.
   * @param {boolean=} settings.openGroups - The default open or collapsed
   *   setting for automatic log grouping (i.e. if turnOnGroups is enabled then
   *   openGroups determines if the auto log groups are open or collapsed).
   * @param {boolean=} settings.turnOnProfiles - The default setting for
   *   automatic profiling for all logic between every start and end method.
   * @param {boolean=} settings.turnOnTimers - The default setting for automatic
   *   timing for all logic between every start and end method.
   * @param {boolean=} settings.formatElementsAsObj - Controls whether elements
   *   are logged as JavaScript objects or DOM elements. For more details on the
   *   differences between the two logging styles (specifier '%o' vs '%O')
   *   [see Google's Console API Reference]{@link https://developer.chrome.com/devtools/docs/console-api#consolelogobject-object}.
   */
  debugModuleAPI.set = (function setup_set() {

    /** @type {!Object} */
    var defaultTypes;
    /** @type {string} */
    var propName;
    /** @type {!Object<string, function(*)>} */
    var setters;

    setters = {};

    // Setup the non-default setters
    setters.errorBreakpoints = function(newVal) {
      if ( checkType(newVal, 'boolean') ) {
        errorBreakpoints = newVal;
      }
    };
    setters.formatElementsAsObj = function(newVal) {
      if ( checkType(newVal, 'boolean') ) {
        Debug.formatElementsAsObj = newVal;
      }
    };

    // Setup the default setters
    defaultTypes = Debug_DEFAULT_TYPES;
    for (propName in defaultTypes) {
      if ( hasOwnProp(defaultTypes, propName) ) {
        setters[ propName ] = (function(propName, propType) {
          return function setADebugDefault(propVal) {
            if ( checkType(propVal, propType) ) {
              if ( checkType(propVal, '!strings') ) {
                propVal = propVal.join(' ');
              }
              Debug.defaults[ propName ] = propVal;
            }
          };
        })(propName, defaultTypes[ propName ]);
      }
    }

    return function set(settings) {

      /** @type {string} */
      var propName;
      /** @type {*} */
      var propVal;

      if ( checkType(settings, '!object') ) {

        // Replace any old property names with the correct property name
        if (hasOwnProp(settings, 'errorDebuggers') &&
            !hasOwnProp(settings, 'errorBreakpoints')) {
          settings.errorBreakpoints = settings.errorDebuggers;
        }
        settings = Debug.replaceOldSettings(settings);

        // Set each new setting
        for (propName in settings) {
          if (hasOwnProp(settings, propName) &&
              hasOwnProp(setters, propName)) {
            propVal = settings[ propName ];
            setters[ propName ](propVal);
          }
        }
      }
      else {
        Errors.setConsoleTypeError( getTypeOf(settings) );
        insertErrorBreakpoint();
      }
    };
  })();

  /**
   * -----------------------------------------------------
   * Public Method (debugModuleAPI.reset)
   * -----------------------------------------------------
   * @desc Allows you to reset any of the settings for the debugger.
   * @param {...(string|strings)=} setting - A setting to reset. If no arguments
   *   are given this method will automatically reset all of the options.
   * @return {boolean} The success of the new settings update.
   */
  debugModuleAPI.reset = (function setup_reset() {

    /** @type {string} */
    var propName;
    /** @type {!Object<string, function>} */
    var setters;

    setters = {};

    // Setup the non-default setters
    setters.errorBreakpoints = function() {
      errorBreakpoints = true;
    };
    setters.formatElementsAsObj = function() {
      Debug.formatElementsAsObj = true;
    };

    // Setup the default setters
    for (propName in Debug_DEFAULTS) {
      if ( hasOwnProp(Debug_DEFAULTS, propName) ) {
        setters[ propName ] = (function(propName) {
          return function resetADebugDefault() {
            Debug.defaults[ propName ] = Debug_DEFAULTS[ propName ];
          };
        })(propName);
      }
    }

    return function reset() {

      /** @type {!Array<string>} */
      var args;
      /** @type {string} */
      var prop;
      /** @type {number} */
      var len;
      /** @type {number} */
      var i;

      len  = arguments.length;
      args = ( (!len) ?
        null : (len > 1) ?
          Array.prototype.slice.call(arguments, 0) : (Array.isArray(arguments[0])) ?
            arguments[0] : [ arguments[0] ]
      );
      args = makeResetString(args);

      if (args) {
        // Reset each value
        i = args.length;
        while (i--) {
          prop = args[i];
          setters[ prop ]();
        }
      }
      else {
        Errors.resetConsoleTypeError();
        insertErrorBreakpoint();
      }

      return !!args;
    };
  })();

/* -----------------------------------------------------------------------------
 * The Errors Class (classes/errors.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (Errors)
   * -----------------------------------------------------
   * @desc Throws all of the Errors for the debugger.
   * @type {!Object<string, function>}
   * @struct
   */
  var Errors = {};

  /**
   * -----------------------------------------------------
   * Public Method (Errors.setConsoleTypeError)
   * -----------------------------------------------------
   * @desc Throws a TypeError for an invalid settings param in aIV.console.set.
   * @param {string} settingsType - The invalid data type for the settings param.
   */
  Errors.setConsoleTypeError = function(settingsType) {

    /** @type {string} */
    var message;

    message = 'An aIV.console.set call was missing a valid object for the new ';
    message += 'settings parameter (the first and only parameter). It should ';
    message += 'be an object with string => value pairs that match the module ';
    message += 'properties you want to set and their new value (e.g. property ';
    message += '=> value). The invalid settings data type was \'';
    message += settingsType + '\'';

    throw new TypeError(message);
  };

  /**
   * -----------------------------------------------------
   * Public Method (Errors.resetConsoleTypeError)
   * -----------------------------------------------------
   * @desc Throws a TypeError for an invalid setting param in aIV.console.reset.
   * @type {function}
   */
  Errors.resetConsoleTypeError = function() {

    /** @type {string} */
    var message;

    message = 'An aIV.console.reset call received an invalid setting ';
    message += 'parameter (should be a string or an array of strings).';

    throw new TypeError(message);
  };

  /**
   * -----------------------------------------------------
   * Public Method (Errors.invalidGetName)
   * -----------------------------------------------------
   * @desc Creates an error message for an invalid method/type name
   *   parameter in a Debug get method.
   * @param {string} method - The name of the method that failed.
   * @param {string} name - The user's method/type name parameter.
   * @return {string} The error message.
   */
  Errors.invalidGetName = function(method, name) {

    /** @type {string} */
    var message;

    message = 'An aIV.console ' + method + ' call was missing a valid method ';
    message += 'or type name parameter (the first parameter). It should be a ';
    message += 'string of the method/type name that ' + method + ' is to get. ';
    message += 'The invalid name was \'' + name + '\'.';

    return message;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Errors.missingMethodName)
   * -----------------------------------------------------
   * @desc Creates an error message for a missing method name
   *   parameter in a Debug logging method.
   * @param {string} method - The name of the method that failed.
   * @param {*} methodName - The user's method name parameter.
   * @return {string} The error message.
   */
  Errors.missingMethodName = function(method, methodName) {

    /** @type {string} */
    var message;

    message = 'An aIV.console ' + method + ' call was missing a valid method ';
    message += 'name parameter (the first parameter). It should be a string ';
    message += 'of the method\'s name that ' + method + ' is recording. The ';
    message += 'invalid method name parameter\'s data type follows: ';
    message += (methodName === null) ? 'null' : typeof methodName;

    return message;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Errors.missingTypeStrings)
   * -----------------------------------------------------
   * @desc Creates an error message for missing type string parameters
   *   in a Debug logging method.
   * @param {string} method - The name of the method that failed.
   * @return {string} The error message.
   */
  Errors.missingTypeStrings = function(method) {

    /** @type {string} */
    var message;

    message = 'An aIV.console ' + method + ' call was missing valid data ';
    message += 'type strings to use for testing arguments. For all arguments ';
    message += 'you should include a string of each argument\'s possible data ';
    message += 'types (e.g. \'!string|object\') as a parameter immediately ';
    message += 'following the argument parameter.';

    return message;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Errors.missingTestArgs)
   * -----------------------------------------------------
   * @desc Creates an error message for missing type string parameters
   *   in a Debug logging method.
   * @return {string} The error message.
   */
  Errors.missingTestArgs = function() {

    /** @type {string} */
    var message;

    message = 'An aIV.console args call was missing arguments to test. ';
    message += 'The args method requires that at least one argument be ';
    message += 'tested. After the first parameter (the method name), the ';
    message += 'second parameter should be an argument to test, and the ';
    message += 'third parameter should be a string of the argument\'s ';
    message += 'optional data types. You can include as many pairs of ';
    message += 'arguments and optional data types as you like.';

    return message;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Errors.invalidGroupType)
   * -----------------------------------------------------
   * @desc Creates an error message for an invalid console group type
   *   in a Debug logging method.
   * @param {*} groupType - The invalid group type.
   * @return {string} The error message.
   */
  Errors.invalidGroupType = function(groupType) {

    /** @type {string} */
    var message;

    message = 'An aIV.console group call was given an incorrect group ';
    message += 'type value for its second parameter. The  group\'s data ';
    message += 'type was \'';
    message += (groupType === null) ? 'null' : typeof groupType;
    message += '\',  and its value converted to a string was \'';
    message += groupType + '\'. It should be either \'open\', \'coll\', ';
    message += 'or \'end\'.';

    return message;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Errors.missingErrorMessage)
   * -----------------------------------------------------
   * @desc Creates an error message for a missing error message parameter
   *   in a Debug logging method.
   * @param {string} logMessage - The log message.
   * @return {string} The error message.
   */
  Errors.missingErrorMessage = function(logMessage) {

    /** @type {string} */
    var message;

    message = 'An aIV.console fail call was missing a valid log message ';
    message += 'parameter (its third parameter). It should be a string ';
    message += 'of the error message to log upon test failure. The ';
    message += 'invalid message\'s data type was \'';
    message += (logMessage === null) ? 'null' : typeof logMessage;
    message += '\'';

    return message;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Errors.missingStateValues)
   * -----------------------------------------------------
   * @desc Creates an error message for missing values in a Debug.proto.state
   *   call.
   * @return {string} The error message.
   */
  Errors.missingStateValues = function() {

    /** @type {string} */
    var message;

    message = 'An aIV.console state call was missing a state to log. After ';
    message += 'the first parameter (the method name), the second parameter ';
    message += 'should be a log message with $$ in the places where you would ';
    message += 'like the variable states to be inserted. The remaining ';
    message += 'parameters should be the variables to capture.';

    return message;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Errors.missingLogMessage)
   * -----------------------------------------------------
   * @desc Creates an error message for a missing log message parameter
   *   in a Debug logging method.
   * @param {string} logMessage - The log message.
   * @return {string} The error message.
   */
  Errors.missingLogMessage = function(logMessage) {

    /** @type {string} */
    var message;

    message = 'An aIV.console misc call was missing a valid log message ';
    message += 'parameter (its second parameter). It should be a string ';
    message += 'of the message to log. The invalid message\'s data type ';
    message += 'was \'';
    message += (logMessage === null) ? 'null' : typeof logMessage;
    message += '\'';

    return message;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Errors.invalidSetName)
   * -----------------------------------------------------
   * @desc Creates an error message for an invalid method/type name
   *   parameter in a Debug controlling method.
   * @param {string} method - The name of the method that failed.
   * @param {*} name - The user's method/type name parameter.
   * @return {string} The error message.
   */
  Errors.invalidSetName = function(method, name) {

    /** @type {string} */
    var message;

    message = 'An aIV.console ' + method + ' call was missing a valid method ';
    message += 'or type name parameter. It should be either a string or array ';
    message += 'of strings of the method/type name that ' + method + ' is to ';
    message += 'update. The invalid names follow: ' + name;

    return message;
  };

  freezeObj(Errors, true);

/* -----------------------------------------------------------------------------
 * The Debug Class Constructor (classes/debug/constructor.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (Debug)
   * -----------------------------------------------------
   * @desc Contains the debugging properties and methods.
   * @param {!Object<string, (string|boolean)>} settings - The class settings.
   * @param {string} settings.classTitle - The name of the class.
   * @param {string} settings.turnOffMethods - The class methods to disable. If
   *   'all' is provided then all methods are disabled.
   * @param {string} settings.addBreakpoints - The methods to add debugger
   *   breakpoints to. If 'all' is provided then breakpoints are added to all
   *   methods.
   * @param {boolean} settings.turnOnGroups - Enables/disables automatic
   *   grouping of all logs, timers, and profiles between every start and end
   *   method.
   * @param {boolean} settings.openGroups - For enabled automatic log grouping
   *   determines whether groups should be open or collapsed for this Debug
   *   instance (i.e. if turnOnGroups is enabled then openGroups controls
   *   whether the auto log groups are open or collapsed).
   * @param {boolean} settings.turnOnProfiles - Enables/disables automatic
   *   profiling for all logic between every start and end method.
   * @param {boolean} settings.turnOnTimers - Enables/disables automatic
   *   timing for all logic between every start and end method.
   * @constructor
   */
  var Debug = function(settings) {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Public Property (Debug.classTitle)
     * ---------------------------------------------------
     * @desc The class name for this instance.
     * @type {string}
     */
    this.classTitle = settings.classTitle + '.';

    /**
     * ---------------------------------------------------
     * Public Property (Debug.openGroups)
     * ---------------------------------------------------
     * @desc Whether auto log groups should be open or collapsed.
     * @type {boolean}
     */
    this.openGroups = settings.openGroups;

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -----------------------------------------------------
     * Protected Property (methods)
     * -----------------------------------------------------
     * @desc Allows disabling of specific methods per class instance.
     *   <ol>
     *     <li>start: Logs the start of every method.</li>
     *     <li>end: Logs the end of every method.</li>
     *     <li>args: Evaluations that assert method's arguments and
     *         log error messages when they are incorrect.</li>
     *     <li>fail: Applies custom evaluations and logs errors when
     *         they occur.</li>
     *     <li>group: Groups console logs and shares any supplied
     *         properties.</li>
     *     <li>state: Logs the state of the supplied properties.</li>
     *     <li>misc: Logs a custom message and properties.</li>
     *   </ol>
     * @type {{
     *   init : boolean,
     *   start: boolean,
     *   end  : boolean,
     *   args : boolean,
     *   fail : boolean,
     *   group: boolean,
     *   state: boolean,
     *   misc : boolean
     * }}
     * @private
     */
    var methods;

    /**
     * -----------------------------------------------------
     * Protected Property (breakpoints)
     * -----------------------------------------------------
     * @desc Allows disabling of debugger breakpoints for specific methods.
     * @type {{
     *   init : boolean,
     *   start: boolean,
     *   end  : boolean,
     *   args : boolean,
     *   fail : boolean,
     *   group: boolean,
     *   state: boolean,
     *   misc : boolean
     * }}
     * @private
     */
    var breakpoints;

    /**
     * -----------------------------------------------------
     * Protected Property (groups)
     * -----------------------------------------------------
     * @desc Allows automatic grouping of all logs, timers, and profiles between
     *   every start and end method.
     * @type {boolean}
     * @private
     */
    var groups;

    /**
     * -----------------------------------------------------
     * Protected Property (profiles)
     * -----------------------------------------------------
     * @desc Allows automatic profiling for all logic between every start and
     *   end method.
     * @type {boolean}
     * @private
     */
    var profiles;

    /**
     * -----------------------------------------------------
     * Protected Property (timers)
     * -----------------------------------------------------
     * @desc Allows automatic timing for all logic between every start and end
     *   method.
     * @type {boolean}
     * @private
     */
    var timers;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    settings.turnOffMethods = settings.turnOffMethods.toLowerCase();
    settings.addBreakpoints = settings.addBreakpoints.toLowerCase();

    methods = {
      init :  !/init|all/.test(settings.turnOffMethods),
      start: !/start|all/.test(settings.turnOffMethods),
      end  :   !/end|all/.test(settings.turnOffMethods),
      args :  !/args|all/.test(settings.turnOffMethods),
      fail :  !/fail|all/.test(settings.turnOffMethods),
      group: !/group|all/.test(settings.turnOffMethods),
      state: !/state|all/.test(settings.turnOffMethods),
      misc :  !/misc|all/.test(settings.turnOffMethods)
    };

    breakpoints = {
      init :  /init|all/.test(settings.addBreakpoints),
      start: /start|all/.test(settings.addBreakpoints),
      end  :   /end|all/.test(settings.addBreakpoints),
      args :  /args|all/.test(settings.addBreakpoints),
      fail :  /fail|all/.test(settings.addBreakpoints),
      group: /group|all/.test(settings.addBreakpoints),
      state: /state|all/.test(settings.addBreakpoints),
      misc :  /misc|all/.test(settings.addBreakpoints)
    };

    groups   = settings.turnOnGroups;
    profiles = settings.turnOnProfiles;
    timers   = settings.turnOnTimers;

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Public Method (Debug.getMethod)
     * ---------------------------------------------------
     * @desc Gets a method's current value for whether it is active.
     * @param {string} method - The method value to get.
     * @return {boolean} The method's current enabled/disabled state.
     * @return {(boolean|undefined)} The method's current enabled/disabled
     *   state or undefined for an error.
     */
    this.getMethod = function(method) {

      if (!checkType(method, 'string') ||  !hasOwnProp(methods, method)) {
        console.error( Errors.invalidGetName('getMethod', method) );
        insertErrorBreakpoint();
        return;
      }

      return methods[ method ];
    };

    /**
     * ---------------------------------------------------
     * Public Method (Debug.getBreakpoint)
     * ---------------------------------------------------
     * @desc Gets a method's current value for whether it has added debugger
     *   breakpoints.
     * @param {string} method - The method value to get.
     * @return {(boolean|undefined)} The method's current breakpoint addition
     *   enabled/disabled state or undefined for an error.
     */
    this.getBreakpoint = function(method) {

      if (!checkType(method, 'string') || !hasOwnProp(breakpoints, method)) {
        console.error( Errors.invalidGetName('getBreakpoint', method) );
        insertErrorBreakpoint();
        return;
      }

      return breakpoints[ method ];
    };

    /**
     * ---------------------------------------------------
     * Public Method (Debug.getAuto)
     * ---------------------------------------------------
     * @desc Gets the current automated value for groups, profiles, and timers.
     * @param {string} prop - The automated type value to get.
     * @return {boolean} The automated type's current enabled/disabled state.
     */
    this.getAuto = function(prop) {

      /** @type {Object<string, boolean>} */
      var props;

      props = {
        groups  : groups,
        profiles: profiles,
        timers  : timers
      };

      if (!checkType(prop, 'string') || !hasOwnProp(props, prop)) {
        console.error( Errors.invalidGetName('getAuto', prop) );
        insertErrorBreakpoint();
        return;
      }

      return props[ prop ];
    };

    /**
     * ---------------------------------------------------
     * Public Method (Debug.setMethod)
     * ---------------------------------------------------
     * @desc Sets a method's active state.
     * @param {string} method - The method state to set.
     * @param {boolean} val - The new state.
     * @return {boolean} Indicates whether correct arguments were given.
     */
    this.setMethod = function(method, val) {

      if (!checkType(method, 'string') || !checkType(val, 'boolean')) {
        return false;
      }

      method = method.toLowerCase();

      if (!hasOwnProp(methods, method) && method !== 'all') {
        return false;
      }

      if (method === 'all') {
        for (method in methods) {
          if ( hasOwnProp(methods, method) ) {
            methods[ method ] = val;
          }
        }
      }
      else {
        methods[ method ] = val;
      }

      return true;
    };

    /**
     * ---------------------------------------------------
     * Public Method (Debug.setBreakpoint)
     * ---------------------------------------------------
     * @desc Sets a method's added breakpoints state.
     * @param {string} method - The method state to set.
     * @param {boolean} val - The new state.
     * @return {boolean} Indicates whether correct arguments were given.
     */
    this.setBreakpoint = function(method, val) {

      if (!checkType(method, 'string') || !checkType(val, 'boolean')) {
        return false;
      }

      method = method.toLowerCase();

      if (!hasOwnProp(breakpoints, method) && method !== 'all') {
        return false;
      }

      if (method === 'all') {
        for (method in breakpoints) {
          if ( hasOwnProp(breakpoints, method) ) {
            breakpoints[ method ] = val;
          }
        }
      }
      else {
        breakpoints[ method ] = val;
      }

      return true;
    };

    /**
     * ---------------------------------------------------
     * Public Method (Debug.setAuto)
     * ---------------------------------------------------
     * @desc Sets the current automated value for groups, profiles, and timers.
     * @param {string} prop - The automated type value to set.
     * @param {boolean} val - The new automated value.
     * @return {boolean} Indicates whether correct arguments were given.
     */
    this.setAuto = function(prop, val) {

      /** @type {Object<string, function(boolean)>} */
      var props;

      props = {
        groups  : function(val) { groups   = val; },
        profiles: function(val) { profiles = val; },
        timers  : function(val) { timers   = val; }
      };

      if (!checkType(prop, 'string') || !checkType(val, 'boolean')) {
        return false;
      }

      prop = prop.toLowerCase();

      if (!hasOwnProp(props, prop) && prop !== 'all') {
        return false;
      }

      if (prop === 'all') {
        for (prop in props) {
          if ( hasOwnProp(props, prop) ) {
            props[ prop ](val);
          }
        }
      }
      else {
        props[ prop ](val);
      }

      return true;
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    // Deep freeze this class instance
    freezeObj(this, true);
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  Debug.prototype.constructor = Debug;

/* -----------------------------------------------------------------------------
 * The Debug Class Logging Methods (classes/debug/logging-methods.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.init)
   * -----------------------------------------------------
   * @desc Used to log the start of a method, check for incorrect argument
   *   data types, and insert any automated actions.
   * @param {!(string|vals)} methodName - The name of the method or an array
   *   of all the parameters for this method (in the correct order).
   * @param {...val=} val - Each argument passed to the method.
   * @param {...string=} type -  Each passed argument's data type. To review
   *   the input options available
   *   [see the checkType helper method]{@link checkType}.
   * @return {boolean} Whether the method made two logs or not.
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   // Calling init with multiple params
   *   Example.prototype.paramsMethod = function(arg1, arg2) {
   *     this.console.init('paramsMethod', arg1, 'object', arg2, 'number=');
   *   };
   *   
   *   // Calling init with an array
   *   Example.prototype.arrayMethod = function(arg1, arg2) {
   *     var arr = [ 'arrayMethod', arg1, 'object', arg2, 'number=' ];
   *     this.console.init(arr);
   *   };
   */
  Debug.prototype.init = function(methodName) {

    /** @type {number} */
    var len;
    /** @type {!vals} */
    var args;
    /** @type {boolean} */
    var pass;
    /** @type {string} */
    var message;

    // Setup the variables
    if ( checkType(methodName, '!string|array') ) {
      if ( checkType(methodName, 'string') ) {
        args = ( (arguments.length > 1) ?
          Array.prototype.slice.call(arguments, 1) : []
        );
      }
      else {
        args = (methodName.length > 1) ? methodName.slice(1) : [];
        methodName = methodName[0];
      }
    }

    // Test the method name
    if ( !checkType(methodName, 'string') ) {
      console.error( Errors.missingMethodName('init', methodName) );
      insertErrorBreakpoint();
      return;
    }

    // Save a length reference
    len = args.length;

    // Test for each argument's data type string
    if (len) {
      if ((len % 2) || !Debug.checkArgsDataTypeStrings(args)) {
        console.error( Errors.missingTypeStrings('init') );
        insertErrorBreakpoint();
        return;
      }
    }

    // Check whether this method has been turned off
    if ( !this.getMethod('init') ) {
      Debug.handleAuto.call(this, 'groups', methodName);
      Debug.handleAuto.call(this, 'profiles', methodName);
      Debug.handleAuto.call(this, 'timers', methodName);
      return false;
    }

    // Insert auto grouping
    Debug.handleAuto.call(this, 'groups', methodName);

    // Test the arguments
    pass = (len) ? Debug.testArgTypes(args) : true;

    // Log an args error message and insert a debugger breakpoint
    if (!pass) {
      message = 'ARGS: ' + this.classTitle + methodName + '() | ';
      message += 'Error: Incorrect argument data type.';
      console.error(message);
      Debug.insertBreakpoint.call(this, 'init args');
    }

    // Remove the data type strings
    if (len) {
      args = Debug.stripArgTypeStrings(args);
    }

    // Prepare the call log message and arguments
    message = 'CALL: ' + this.classTitle + methodName;
    message += '(' + Debug.makeSubstituteStrings(args) + ')';
    args.unshift(message);

    // Log the call message
    console.log.apply(console, args);

    // Insert a debugger breakpoint
    Debug.insertBreakpoint.call(this, 'init');

    // Insert auto profiling and timing
    Debug.handleAuto.call(this, 'profiles', methodName);
    Debug.handleAuto.call(this, 'timers', methodName);

    return !pass;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.start)
   * -----------------------------------------------------
   * @desc Used to log the start of a method and insert any automated actions.
   * @param {!(string|vals)} methodName - The name of the method or an array
   *   of all the parameters for this method (in the correct order).
   * @param {...val=} val - Each argument passed to the method in order of
   *   appearance.
   * @return {boolean} Whether a log was made.
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   // Calling start with multiple params
   *   Example.prototype.paramsMethod = function(arg1, arg2) {
   *     this.console.start('paramsMethod', arg1, arg2);
   *   };
   *   
   *   // Calling start with an array
   *   Example.prototype.arrayMethod = function(arg1, arg2) {
   *     var arr = [ 'arrayMethod', arg1, arg2 ];
   *     this.console.start(arr);
   *   };
   */
  Debug.prototype.start = function(methodName) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;
    /** @type {!vals} */
    var args;
    /** @type {string} */
    var message;

    // Setup the variables
    if ( checkType(methodName, '!string|array') ) {
      if ( checkType(methodName, 'string') ) {
        args = ( (arguments.length > 1) ?
          Array.prototype.slice.call(arguments, 1) : []
        );
      }
      else {
        args = (methodName.length > 1) ? methodName.slice(1) : [];
        methodName = methodName[0];
      }
    }

    // Test the method name before executing
    if ( !checkType(methodName, 'string') ) {
      console.error( Errors.missingMethodName('start', methodName) );
      insertErrorBreakpoint();
      return;
    }

    // Check whether this method has been turned off
    if ( !this.getMethod('start') ) {
      Debug.handleAuto.call(this, 'groups', methodName);
      Debug.handleAuto.call(this, 'profiles', methodName);
      Debug.handleAuto.call(this, 'timers', methodName);
      return false;
    }

    // Insert auto grouping
    Debug.handleAuto.call(this, 'groups', methodName);

    // Prepare the call log message and arguments
    message = 'CALL: ' + this.classTitle + methodName;
    message += '(' + Debug.makeSubstituteStrings(args) + ')';
    args.unshift(message);

    // Log the start message
    console.log.apply(console, args);

    // Insert a debugger breakpoint
    Debug.insertBreakpoint.call(this, 'start');

    // Insert auto profiling and timing
    Debug.handleAuto.call(this, 'profiles', methodName);
    Debug.handleAuto.call(this, 'timers', methodName);

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.end)
   * -----------------------------------------------------
   * @desc Used to log the end of a method and insert any automated actions.
   * @param {!(string|vals)} methodName - The name of the method or an array
   *   of all the parameters for this method (in the correct order).
   * @param {val=} returnVal - The return value for the method.
   * @return {boolean} Whether a log was made.
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   // Calling end with multiple params
   *   Example.prototype.paramsMethod = function() {
   *     this.console.end('paramsMethod', returnVal);
   *   };
   *   
   *   // Calling end with an array
   *   Example.prototype.arrayMethod = function() {
   *     var arr = [ 'arrayMethod', returnVal ];
   *     this.console.end(arr);
   *   };
   */
  Debug.prototype.end = function(methodName, returnVal) {

    /** @type {string} */
    var message;

    // Setup the variables
    if ( checkType(methodName, '!array') ) {
      if (methodName.length > 1) {
        returnVal = methodName[1];
      }
      methodName = methodName[0];
    }

    // Test the method name before executing
    if ( !checkType(methodName, 'string') ) {
      console.error( Errors.missingMethodName('end', methodName) );
      insertErrorBreakpoint();
      return;
    }

    // Check whether this method has been turned off
    if ( !this.getMethod('end') ) {
      Debug.handleAuto.call(this, 'timers', methodName, true);
      Debug.handleAuto.call(this, 'profiles', methodName, true);
      Debug.handleAuto.call(this, 'groups', methodName, true);
      return false;
    }

    // Prepare the console message
    message = 'END: ' + this.classTitle + methodName + '() | ';
    message += 'return= ' + Debug.getSubstituteString(returnVal);

    // Log the end message
    console.log(message, returnVal);

    // Insert a debugger breakpoint
    Debug.insertBreakpoint.call(this, 'end');

    // Insert auto profiling and timing
    Debug.handleAuto.call(this, 'timers', methodName, true);
    Debug.handleAuto.call(this, 'profiles', methodName, true);

    // Insert auto grouping
    Debug.handleAuto.call(this, 'groups', methodName, true);

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.args)
   * -----------------------------------------------------
   * @desc Used to catch undesired argument data types.
   * @param {!(string|vals)} methodName - The name of the method or an array
   *   with all the parameters for this method (in the correct order).
   * @param {...val=} val - Each argument passed to the method.
   * @param {...string=} type -  Each argument's data type. To review
   *   the input options available
   *   [see the checkType helper method]{@link checkType}.
   * @return {boolean} Whether a log was made.
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   // Calling args with multiple params
   *   Example.prototype.paramsMethod = function(arg1, arg2) {
   *     this.console.args('paramsMethod', arg1, 'object', arg2, 'number=');
   *   };
   *   
   *   // Calling args with an array
   *   Example.prototype.arrayMethod = function(arg1, arg2) {
   *     var arr = [ 'arrayMethod', arg1, 'object', arg2, 'number=' ];
   *     this.console.args(arr);
   *   };
   */
  Debug.prototype.args = function(methodName) {

    /** @type {!vals} */
    var args;
    /** @type {string} */
    var message;

    // Setup the variables
    if ( checkType(methodName, '!string|array') ) {
      if ( checkType(methodName, 'string') ) {
        args = ( (arguments.length > 1) ?
          Array.prototype.slice.call(arguments, 1) : []
        );
      }
      else {
        args = (methodName.length > 1) ? methodName.slice(1) : [];
        methodName = methodName[0];
      }
    }

    // Test the method name
    if ( !checkType(methodName, 'string') ) {
      console.error( Errors.missingMethodName('args', methodName) );
      insertErrorBreakpoint();
      return;
    }

    // Test for arguments
    if (args.length < 2) {
      console.error( Errors.missingTestArgs() );
      insertErrorBreakpoint();
      return;
    }

    // Test each argument's data type string
    if ((args.length % 2) || !Debug.checkArgsDataTypeStrings(args)) {
      console.error( Errors.missingTypeStrings('args') );
      insertErrorBreakpoint();
      return;
    }

    // Check whether this method has been turned off
    if ( !this.getMethod('args') ) {
      return false;
    }

    // If test passes end this method
    if ( Debug.testArgTypes(args) ) {
      return false;
    }

    // Prepare and log the error message
    message = 'ARGS: ' + this.classTitle + methodName + '() | ';
    message += 'Error: Incorrect argument data type.';
    console.error(message);

    // Insert a debugger breakpoint
    Debug.insertBreakpoint.call(this, 'args');

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.fail)
   * -----------------------------------------------------
   * @desc Used to catch failures within a method. Comparable to console.assert.
   * @param {!(string|vals)} methodName - The name of the method or an array
   *   of all the parameters for this method (in correct order).
   * @param {val=} pass - The test to run. If this value is a function it runs
   *   it, converts its return to a boolean, and uses the result. Otherwise it
   *   converts it to a boolean. If the resulting boolean value is false then it
   *   logs an error.
   * @param {string=} message - The message to log if test fails. Use two
   *   consecutive dollar signs to include variable values in the message
   *   (e.g. This string, '... numberVar is $$ and  objectVar is $$', will
   *   be automatically converted to '... numberVar is %i, objectVar is %O').
   * @param {...val=} val - Any values to include in the error message.
   * @return {boolean} Whether a log was made.
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   Example.prototype.exampleMethod = function() {
   *     // An important variable
   *     var exampleVar = 'A random value';
   *     
   *     // A function that tests the value of exampleVar
   *     var testFunc = (function(exampleVar) {
   *       return function testFunc() {
   *         return (exampleVar.length > 20);
   *       };
   *     })(exampleVar);
   *     
   *     // The message to log on an error
   *     var errorMsg = 'Example error message exampleVar was $$.';
   *     
   *     // Calling fail with multiple params and a test function
   *     this.console.fail('exampleMethod', testFunc, errorMsg, exampleVar);
   *     
   *     // A test boolean value for exampleVar
   *     var testValue = (exampleVar.length > 20);
   *     
   *     // Calling fail with an array and a boolean test value
   *     var arr = [ 'exampleMethod', testValue, errorMsg, exampleVar ];
   *     this.console.fail(arr);
   *   };
   */
  Debug.prototype.fail = function(methodName, pass, message) {

    /** @type {!vals} */
    var args;

    // Setup the variables
    if ( checkType(methodName, '!string|array') ) {
      if ( checkType(methodName, 'string') ) {
        pass = ( checkType(pass, 'function') ) ? !!pass() : !!pass;
        args = ( (arguments.length > 3) ?
          Array.prototype.slice.call(arguments, 3) : []
        );
      }
      else {
        pass = methodName[1];
        pass = ( checkType(pass, 'function') ) ? !!pass() : !!pass;
        message = methodName[2];
        args = (methodName.length > 3) ? methodName.slice(3) : [];
        methodName = methodName[0];
      }
    }

    // Test the method name
    if ( !checkType(methodName, 'string') ) {
      console.error( Errors.missingMethodName('fail', methodName) );
      insertErrorBreakpoint();
      return;
    }

    // Test the error message
    if ( !checkType(message, 'string') ) {
      console.error( Errors.missingErrorMessage(message) );
      insertErrorBreakpoint();
      return false;
    }

    // Check whether this method has been turned off
    if ( !this.getMethod('fail') ) {
      return false;
    }

    // If test passes end this method
    if (pass) {
      return false;
    }

    // Prepare the message
    if (args.length) {
      message = Debug.insertSubstituteStrings(message, args);
    }
    message = 'FAIL: ' + this.classTitle + methodName + '() | ' + message;

    // Prepare the error log's arguments
    args.unshift(message);

    // Log the error
    console.error.apply(console, args);

    // Insert a debugger breakpoint
    Debug.insertBreakpoint.call(this, 'fail');

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.group)
   * -----------------------------------------------------
   * @desc Used to group console messages.
   * @param {(string|vals)} methodName - The name of the method or an array
   *   of all the parameters for this method (in the correct order).
   * @param {string=} groupType - The type of console group method to use. The
   *   options are: 'open'= console.group() | 'coll'= console.groupCollapsed()
   *   | 'end'= console.groupEnd(). The default value is 'open'.
   * @param {string=} message - A message to add to an open group call. Use two
   *   consecutive dollar signs to include variable values in the message
   *   (e.g. This string, '... numberVar is $$ and  objectVar is $$', will
   *   be automatically converted to '... numberVar is %i, objectVar is %O').
   * @param {...val=} val - Any values to include in the log message.
   * @return {boolean} Whether a group was opened/closed or not (i.e. action
   *   vs no action).
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   Example.prototype.exMethod = function() {
   *     // Important variables
   *     var exVar1 = 'A random value 1';
   *     var exVar2 = 'A random value 2';
   *     
   *     // The message to log
   *     var groupMsg = 'Lorem ipsem exVar1 is $$. | exVar2= $$';
   *     
   *     // Calling open group with multiple params
   *     this.console.group('exMethod', 'open', groupMsg, exVar1, exVar2);
   *     
   *     // Calling collapsed group with an array
   *     var arr = [ 'exMethod', 'coll', groupMsg, exVar1, exVar2 ];
   *     this.console.group(arr);
   *     
   *     // Calling close group
   *     this.console.group('exMethod', 'end');
   *   };
   */
  Debug.prototype.group = function(methodName, groupType, message) {

    /** @type {Object<string, string>} */
    var groupTypes;
    /** @type {!vals} */
    var args;

    groupTypes = {
      open: 'open',
      coll: 'coll',
      end : 'end'
    };

    // Setup the variables
    if ( checkType(methodName, '!string|array') ) {

      if ( checkType(methodName, 'string') ) {

        if ( checkType(groupType, 'undefined') ) {
          groupType = 'open';
        }
        if ( checkType(message, 'undefined') ) {
          message = '';
        }
        args = ( (arguments.length > 3) ?
          Array.prototype.slice.call(arguments, 3) : []
        );
      }
      else {
        groupType = (methodName.length > 1) ? methodName[1] : 'open';
        message = (methodName.length > 2) ? methodName[2] : '';
        args = (methodName.length > 3) ? methodName.slice(3) : [];
        methodName = methodName[0];
      }

      if ( !checkType(message, 'string') ) {
        args.unshift(message);
        message = '';
      }
    }

    // Test the method name
    if ( !checkType(methodName, 'string') ) {
      console.error( Errors.missingMethodName('group', methodName) );
      insertErrorBreakpoint();
      return;
    }

    // Test the group type
    if (!checkType(groupType, 'string') || !hasOwnProp(groupTypes, groupType)) {
      console.error( Errors.invalidGroupType(groupType) );
      insertErrorBreakpoint();
      return;
    }

    // Check whether this method has been turned off
    if ( !this.getMethod('group') ) {
      return false;
    }

    // Check for end group type
    if (groupType === 'end') {
      console.groupEnd();
      return true;
    }

    // Prepare the message
    if (message || args.length) {
      if (args.length) {
        message = Debug.insertSubstituteStrings(message, args);
      }
      message = ' | ' + message;
    }
    message = 'GROUP: ' + this.classTitle + methodName + '()' + message;

    // Prepare the group's arguments
    args.unshift(message);

    // Open a console group
    if (groupType === 'coll') {
      console.groupCollapsed.apply(console, args);
    }
    else {
      console.group.apply(console, args);
    }

    // Insert a debugger breakpoint
    Debug.insertBreakpoint.call(this, 'group');

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.state)
   * -----------------------------------------------------
   * @desc Used to log the state of a variable or property.
   * @param {!(string|vals)} methodName - The name of the method or an array
   *   of all the parameters for this method (in the correct order).
   * @param {string=} message - A log message that shares a state. Use two
   *   consecutive dollar signs to include variable values in the message
   *   (e.g. This string, '... numberVar is $$ and  objectVar is $$', will
   *   be automatically converted to '... numberVar is %i, objectVar is %O').
   * @param {...val=} val - The value's state to log.
   * @return {boolean} Whether a log was made.
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   Example.prototype.exMethod = function() {
   *     // Important variables
   *     var exVar1 = 'A random value 1';
   *     var exVar2 = 'A random value 2';
   *     
   *     // The message to log
   *     var stateMsg = 'Lorem ipsem exVar1 is $$ and exVar2= $$.';
   *     
   *     // Calling state with multiple params
   *     this.console.state('exMethod', stateMsg, exVar1, exVar2);
   *     
   *     // Calling state with an array
   *     var arr = [ 'exMethod', stateMsg, exVar1, exVar2 ];
   *     this.console.state(arr);
   *   };
   */
  Debug.prototype.state = function(methodName, message) {

    /** @type {!vals} */
    var args;

    // Setup the variables
    if ( checkType(methodName, '!string|array') ) {
      if ( checkType(methodName, 'string') ) {
        args = ( (arguments.length > 2) ?
          Array.prototype.slice.call(arguments, 2) : []
        );
      }
      else {
        message = (methodName.length > 1) ? methodName[1] : '';
        args = (methodName.length > 2) ? methodName.slice(2) : [];
        methodName = methodName[0];
      }

      if ( !checkType(message, 'string') ) {
        args.unshift(message);
        message = '';
      }
    }

    // Test the method name
    if ( !checkType(methodName, 'string') ) {
      console.error( Errors.missingMethodName('state', methodName) );
      insertErrorBreakpoint();
      return;
    }

    // Test the remaining arguments
    if (!args.length) {
      console.error( Errors.missingStateValues() );
      insertErrorBreakpoint();
      return;
    }

    // Check whether this method has been turned off
    if ( !this.getMethod('state') ) {
      return false;
    }

    // Prepare the message and arguments
    message = Debug.insertSubstituteStrings(message, args);
    message = 'STATE: ' + this.classTitle + methodName + '() | ' + message;
    args.unshift(message);

    // Log the state
    console.log.apply(console, args);

    // Insert a debugger breakpoint
    Debug.insertBreakpoint.call(this, 'state');

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.misc)
   * -----------------------------------------------------
   * @desc Used to make a custom console log.
   * @param {!(string|vals)} methodName - The name of the method or an
   *   array of all the parameters (in the correct order).
   * @param {string=} message - The log message. Use two consecutive
   *   dollar signs to include variable values in the message (e.g. This
   *   string, '... numberVar is $$ and  objectVar is $$', will be
   *   automatically converted to '... numberVar is %i, objectVar is %O').
   * @param {...val=} val - Any values to include in the log.
   * @return {boolean} Whether a log was made.
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   Example.prototype.exMethod = function() {
   *     // Important variables
   *     var exVar1 = 'A random value 1';
   *     var exVar2 = 'A random value 2';
   *     
   *     // The message to log
   *     var miscMsg = 'Lorem ipsem | exVar1= $$, exVar2= $$';
   *     
   *     // Calling misc with multiple params
   *     this.console.misc('exMethod', miscMsg, exVar1, exVar2);
   *     
   *     // Calling misc with an array
   *     var arr = [ 'exMethod', miscMsg, exVar1, exVar2 ];
   *     this.console.misc(arr);
   *   };
   */
  Debug.prototype.misc = function(methodName, message) {

    /** @type {!vals} */
    var args;

    // Setup the variables
    if ( checkType(methodName, '!string|array') ) {
      if ( checkType(methodName, 'string') ) {
        args = ( (arguments.length > 2) ?
          Array.prototype.slice.call(arguments, 2) : []
        );
      }
      else {
        message = (methodName.length > 1) ? methodName[1] : '';
        args = (methodName.length > 2) ? methodName.slice(2) : [];
        methodName = methodName[0];
      }

      if ( !checkType(message, 'string') ) {
        args.unshift(message);
        message = '';
      }
    }

    // Test the method name
    if ( !checkType(methodName, 'string') ) {
      console.error( Errors.missingMethodName('misc', methodName) );
      insertErrorBreakpoint();
      return;
    }

    // Test the log message
    if (!message && !args.length) {
      console.error( Errors.missingLogMessage(message) );
      insertErrorBreakpoint();
      return;
    }

    // Check whether this method has been turned off
    if ( !this.getMethod('misc') ) {
      return false;
    }

    // Prepare the message and arguments
    if (args.length) {
      message = Debug.insertSubstituteStrings(message, args);
    }
    message = 'MISC: ' + this.classTitle + methodName + '() | ' + message;
    args.unshift(message);

    // Log the misc message
    console.log.apply(console, args);

    // Insert a debugger breakpoint
    Debug.insertBreakpoint.call(this, 'misc');

    return true;
  };

/* -----------------------------------------------------------------------------
 * The Debug Class Controlling Methods (classes/debug/controlling-methods.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOnMethod)
   * -----------------------------------------------------
   * @desc Used to enable any methods that are disabled.
   * @param {...!(string|strings)} method - The method to enable.
   *   If 'all' is provided then all methods are enabled.
   * @return {boolean} The update's success (if error return false).
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   Example.prototype.exMethod = function() {
   *     
   *     // Calling turnOnMethod with multiple params
   *     this.console.turnOnMethod('start', 'state');
   *     
   *     // Calling turnOnMethod with an array
   *     var arr = [ 'start', 'state' ];
   *     this.console.turnOnMethod(arr);
   *   };
   */
  Debug.prototype.turnOnMethod = function(method) {

    /** @type {!Debug} */
    var that;
    /** @type {function} */
    var setter;

    that = this;
    setter = function(method) {
      return that.setMethod(method, true);
    };

    if (arguments.length > 1) {
      method = Array.prototype.slice.call(arguments, 0).join(' ');
    }
    else if ( checkType(method, '!strings') ) {
      method = method.join(' ');
    }

    return Debug.handleToggle('turnOnMethod', setter, method);
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOn)
   * -----------------------------------------------------
   * @desc The same as {@link Debug.prototype.turnOnMethod}.
   * @type {function( ...!(string|strings) ): boolean}
   */
  Debug.prototype.turnOn = Debug.prototype.turnOnMethod;

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOffMethod)
   * -----------------------------------------------------
   * @desc Used to disable any methods that are enabled.
   * @param {...!(string|strings)} method - The method to disable.
   *   If 'all' is provided then all methods are disabled.
   * @return {boolean} The update's success (if error return false).
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   Example.prototype.exMethod = function() {
   *     
   *     // Calling turnOffMethod with multiple params
   *     this.console.turnOffMethod('args', 'fail');
   *     
   *     // Calling turnOffMethod with an array
   *     var arr = [ 'args', 'fail' ];
   *     this.console.turnOffMethod(arr);
   *   };
   */
  Debug.prototype.turnOffMethod = function(method) {

    /** @type {!Debug} */
    var that;
    /** @type {function} */
    var setter;

    that = this;
    setter = function(method) {
      return that.setMethod(method, false);
    };

    if (arguments.length > 1) {
      method = Array.prototype.slice.call(arguments, 0).join(' ');
    }
    else if ( checkType(method, '!strings') ) {
      method = method.join(' ');
    }

    return Debug.handleToggle('turnOffMethod', setter, method);
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOff)
   * -----------------------------------------------------
   * @desc The same as {@link Debug.prototype.turnOffMethod}.
   * @type {function( ...!(string|strings) ): boolean}
   */
  Debug.prototype.turnOff = Debug.prototype.turnOffMethod;

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.addBreakpoint)
   * -----------------------------------------------------
   * @desc Used to add debugger breakpoints to methods.
   * @param {...!(string|strings)} method - The method to add to.
   *   If 'all' is provided then all methods will add breakpoints.
   * @return {boolean} The update's success (if error return false).
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   Example.prototype.exMethod = function() {
   *     
   *     // Calling addBreakpoint with multiple params
   *     this.console.addBreakpoint('args', 'fail');
   *     
   *     // Calling addBreakpoint with an array
   *     var arr = [ 'args', 'fail' ];
   *     this.console.addBreakpoint(arr);
   *   };
   */
  Debug.prototype.addBreakpoint = function(method) {

    /** @type {!Debug} */
    var that;
    /** @type {function} */
    var setter;

    that = this;
    setter = function(method) {
      return that.setBreakpoint(method, true);
    };

    if (arguments.length > 1) {
      method = Array.prototype.slice.call(arguments, 0).join(' ');
    }
    else if ( checkType(method, '!strings') ) {
      method = method.join(' ');
    }

    return Debug.handleToggle('addBreakpoint', setter, method);
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOnDebugger)
   * -----------------------------------------------------
   * @desc The same as {@link Debug.prototype.addBreakpoint}.
   * @type {function( ...!(string|strings) ): boolean}
   */
  Debug.prototype.turnOnDebugger = Debug.prototype.addBreakpoint;

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.removeBreakpoint)
   * -----------------------------------------------------
   * @desc Used to remove debugger breakpoints from methods.
   * @param {...!(string|strings)} method - The method to remove from.
   *   If 'all' is provided then all methods will not add breakpoints.
   * @return {boolean} The update's success (if error return false).
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   Example.prototype.exMethod = function() {
   *     
   *     // Calling removeBreakpoint with multiple params
   *     this.console.removeBreakpoint('start', 'state');
   *     
   *     // Calling removeBreakpoint with an array
   *     var arr = [ 'start', 'state' ];
   *     this.console.removeBreakpoint(arr);
   *   };
   */
  Debug.prototype.removeBreakpoint = function(method) {

    /** @type {!Debug} */
    var that;
    /** @type {function} */
    var setter;

    that = this;
    setter = function(method) {
      return that.setBreakpoint(method, false);
    };

    if (arguments.length > 1) {
      method = Array.prototype.slice.call(arguments, 0).join(' ');
    }
    else if ( checkType(method, '!strings') ) {
      method = method.join(' ');
    }

    return Debug.handleToggle('removeBreakpoint', setter, method);
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOffDebugger)
   * -----------------------------------------------------
   * @desc The same as {@link Debug.prototype.removeBreakpoint}.
   * @type {function( ...!(string|strings) ): boolean}
   */
  Debug.prototype.turnOffDebugger = Debug.prototype.removeBreakpoint;

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOnAuto)
   * -----------------------------------------------------
   * @desc Used to enable any automations that are disabled.
   * @param {...!(string|strings)} type - The type to enable.
   *   If 'all' is provided then all automations are enabled.
   * @return {boolean} The update's success (if error return false).
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   Example.prototype.exMethod = function() {
   *     
   *     // Calling turnOnAuto with multiple params
   *     this.console.turnOnAuto('groups', 'timers');
   *     
   *     // Calling turnOnAuto with an array
   *     var arr = [ 'groups', 'timers' ];
   *     this.console.turnOnAuto(arr);
   *   };
   */
  Debug.prototype.turnOnAuto = function(type) {

    /** @type {!Debug} */
    var that;
    /** @type {function} */
    var setter;

    that = this;
    setter = function(type) {
      return that.setAuto(type, true);
    };

    if (arguments.length > 1) {
      type = Array.prototype.slice.call(arguments, 0).join(' ');
    }
    else if ( checkType(type, '!strings') ) {
      type = type.join(' ');
    }

    return Debug.handleToggle('turnOnAuto', setter, type);
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOffAuto)
   * -----------------------------------------------------
   * @desc Used to disable any automations that are enabled.
   * @param {...!(string|strings)} type - The type to disable.
   *   If 'all' is provided then all automations are disabled.
   * @return {boolean} The update's success (if error return false).
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   Example.prototype.exMethod = function() {
   *     
   *     // Calling turnOffAuto with multiple params
   *     this.console.turnOffAuto('groups', 'timers');
   *     
   *     // Calling turnOffAuto with an array
   *     var arr = [ 'groups', 'timers' ];
   *     this.console.turnOffAuto(arr);
   *   };
   */
  Debug.prototype.turnOffAuto = function(type) {

    /** @type {!Debug} */
    var that;
    /** @type {function} */
    var setter;

    that = this;
    setter = function(type) {
      return that.setAuto(type, false);
    };

    if (arguments.length > 1) {
      type = Array.prototype.slice.call(arguments, 0).join(' ');
    }
    else if ( checkType(type, '!strings') ) {
      type = type.join(' ');
    }

    return Debug.handleToggle('turnOffAuto', setter, type);
  };

/* -----------------------------------------------------------------------------
 * The Debug Class Helper Properties (classes/debug/helper-properties.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------
   * Public Property (Debug.defaults)
   * -----------------------------------------------
   * @desc Sets default settings for all instances of the debugger. Note that
   *   if local settings are provided upon a new instance call they will be used
   *   instead of the default settings.
   * @type {!{
   *   classTitle    : string,
   *   turnOffMethods: string,
   *   addBreakpoints: string,
   *   turnOnGroups  : boolean,
   *   openGroups    : boolean,
   *   turnOnProfiles: boolean,
   *   turnOnTimers  : boolean
   * }}
   */
  Debug.defaults = {
    classTitle    : Debug_DEFAULTS.classTitle,
    turnOffMethods: Debug_DEFAULTS.turnOffMethods,
    addBreakpoints: Debug_DEFAULTS.addBreakpoints,
    turnOnGroups  : Debug_DEFAULTS.turnOnGroups,
    openGroups    : Debug_DEFAULTS.openGroups,
    turnOnProfiles: Debug_DEFAULTS.turnOnProfiles,
    turnOnTimers  : Debug_DEFAULTS.turnOnTimers
  };

  /**
   * The automated actions object hash map.
   * @typedef {!{
   *   msgTitle : string,
   *   startFunc: function(string),
   *   endFunc  : function(string=)
   * }} autoMap
   */
  /**
   * -----------------------------------------------
   * Public Property (Debug.autoSettings)
   * -----------------------------------------------
   * @desc The settings for the automated debugger actions.
   * @type {!{
   *   groups  : autoMap,
   *   profiles: autoMap,
   *   timers  : autoMap
   * }}
   */
  Debug.autoSettings = {};
  Debug.autoSettings.groups = {
    msgTitle : 'GROUP',
    startFunc: function(label, openGroup) {
      if (openGroup) {
        console.group(label);
      }
      else {
        console.groupCollapsed(label);
      }
    },
    endFunc: function() {
      console.groupEnd();
    }
  };
  Debug.autoSettings.profiles = {
    msgTitle : 'PROFILE',
    startFunc: function(label) {
      console.profile(label);
    },
    endFunc: function() {
      console.profileEnd();
    }
  };
  Debug.autoSettings.timers = {
    msgTitle : 'TIME',
    startFunc: function(label) {
      console.time(label);
    },
    endFunc: function(label) {
      console.timeEnd(label);
    }
  };

  /**
   * ----------------------------------------------- 
   * Public Property (Debug.formatElementsAsObj)
   * -----------------------------------------------
   * @desc Controls whether logged DOM elements are shown as expandable
   *   objects or elements.
   * @type {boolean}
   */
  Debug.formatElementsAsObj = true;

/* -----------------------------------------------------------------------------
 * The Debug Class Helper Methods (classes/debug/helper-methods.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------
   * Public Property (Debug.replaceOldSettings)
   * -----------------------------------------------
   * @desc Handles moving old setting properties to the correct namespace.
   * @param {!Object} settings
   * @param {string=} settings.classTitle
   * @param {string=} settings.className
   * @param {(string|!strings)=} settings.turnOffMethods
   * @param {(string|!strings)=} settings.turnOffTypes
   * @param {(string|!strings)=} settings.addBreakpoints
   * @param {(string|!strings)=} settings.turnOnDebuggers
   * @param {boolean=} settings.turnOnGroups
   * @param {boolean=} settings.openGroups
   * @param {boolean=} settings.turnOnProfiles
   * @param {boolean=} settings.turnOnTimers
   * @return {!Object} The corrected settings object.
   */
  Debug.replaceOldSettings = (function setup_replaceOldSettings() {

    /** @type {!Object<string, string>} */
    var props;

    // A hash map of oldProp => newProp
    props = {
      className      : 'classTitle',
      turnOffTypes   : 'turnOffMethods',
      turnOnDebuggers: 'addBreakpoints'
    };

    return function replaceOldSettings(settings) {

      /** @type {string} */
      var oldProp;
      /** @type {string} */
      var newProp;

      // Check the settings for any old properties & correct them
      for (oldProp in props) {
        if (hasOwnProp(props, oldProp) && hasOwnProp(settings, oldProp)) {
          newProp = props[ oldProp ];
          if ( !hasOwnProp(settings, newProp) ) {
            settings[ newProp ] = settings[ oldProp ];
          }
        }
      }

      return settings;
    };
  })();

  /**
   * -----------------------------------------------------
   * Public Method (Debug.insertBreakpoint)
   * -----------------------------------------------------
   * @desc Handles whether a debugger breakpoint is inserted for every
   *   logging method.
   * @this {!Debug}
   * @param {string} method - The name of the method to insert for.
   * @return {boolean} Whether a breakpoint was inserted.
   */
  Debug.insertBreakpoint = (function() {

    /** @type {!RegExp} */
    var space;

    space = /\s/;

    return function insertBreakpoint(method) {

      /** @type {number} */
      var i;
      /** @type {boolean} */
      var pass;
      /** @type {strings} */
      var methods;

      methods = ( ( space.test(method) ) ?
        method.split(' ') : [ method ]
      );
      pass = false;

      i = methods.length;
      while (i--) {
        method = methods[i];
        pass = this.getBreakpoint(method);
        if (pass) {
          debugger;
          break;
        }
      }

      return pass;
    };
  })();

  /**
   * -----------------------------------------------------
   * Public Method (Debug.handleAuto)
   * -----------------------------------------------------
   * @desc Handles the automated actions for a logging method.
   * @this {!Debug}
   * @param {string} type - The type of automation to handle.
   * @param {string} methodName - The name of the user's method to log.
   * @param {boolean=} end - Controls whether the automation should start
   *   or end. The default value is false.
   * @return {boolean} The automation's success (i.e. whether an action
   *   was made).
   */
  Debug.handleAuto = function(type, methodName, end) {

    /** @type {boolean} */
    var pass;
    /** @type {string} */
    var label;

    pass = this.getAuto(type);

    if (pass) {

      label = Debug.autoSettings[ type ].msgTitle + ': ';
      label += this.classTitle + methodName;

      if (end) {
        Debug.autoSettings[ type ].endFunc(label);
      }
      else {
        Debug.autoSettings[ type ].startFunc(label, this.openGroups);
      }
    }

    return pass;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.handleToggle)
   * -----------------------------------------------------
   * @desc Handles the turn on/off actions for a Debug controlling method.
   * @param {string} callerName - The name of the caller method.
   * @param {function} setter - The setter to use.
   * @param {string} type - The type or method name to toggle.
   * @return {boolean} The toggle's success (i.e. whether an action was made).
   */
  Debug.handleToggle = function(callerName, setter, type) {

    /** @type {!strings} */
    var args;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;
    /** @type {!(string|strings)} */
    var errors;

    // Ensure invalid type names do not exist
    if ( !checkType(type, 'string') ) {
      console.error( Errors.invalidSetName(callerName, type) );
      insertErrorBreakpoint();
      return;
    }

    // Toggle the values & save any errors
    args = type.split(' ');
    len = args.length;
    i = -1;
    while (++i < len) {
      if ( !setter(args[i]) ) {
        if (!errors) {
          errors = [];
        }
        errors.push("'" + args[i] + "'");
      }
    }
    if (errors) {
      errors = errors.join(', ');
    }

    // Report any errors
    if (errors) {
      console.error( Errors.invalidSetName(callerName, errors) );
      insertErrorBreakpoint();
      return;
    }

    return true;
  };

  /**
   * ---------------------------------------------------
   * Public Method (Debug.getSubstituteString)
   * ---------------------------------------------------
   * @desc Gets the correct substitution string for the given value.
   * @param {val} val - The value to be evaluated.
   * @return {string} The correct substitution string.
   */
  Debug.getSubstituteString = function(val) {

    /** @type {string} */
    var str;

    str = ( (!checkType(val, '!object|function')) ?
      '%s' : (!Debug.formatElementsAsObj && val instanceof HTMLElement) ?
        '%o' : '%O'
    );

    return str;
  };

  /**
   * ---------------------------------------------------
   * Public Method (Debug.makeSubstituteStrings)
   * ---------------------------------------------------
   * @desc Creates a string of the correct matching substitution strings
   *   for a console log message.
   * @param {vals} vals - The values to match.
   * @return {string} The substitution strings.
   */
  Debug.makeSubstituteStrings = function(vals) {

    /** @type {number} */
    var i;
    /** @type {number} */
    var len;
    /** @type {string} */
    var message;

    message = '';

    len = vals.length;
    i = -1;
    while (++i < len) {
      if (i) {
        message += ', ';
      }
      message += Debug.getSubstituteString(vals[i]);
    }

    return message;
  };

  /**
   * ---------------------------------------------------
   * Public Method (Debug.insertSubstituteStrings)
   * ---------------------------------------------------
   * @desc Inserts the correct substitution strings into a log message.
   * @param {string} msg - The original console message string.
   * @param {vals} vals - The values to use for finding the
   *   substitution strings.
   * @return {string} The prepared console message.
   */
  Debug.insertSubstituteStrings = (function() {

    /** @type {!RegExp} */
    var dualDollarSigns;

    dualDollarSigns = /([^\\]*?)\$\$/;

    return function insertSubstituteStrings(msg, vals) {

      /** @type {number} */
      var len;
      /** @type {number} */
      var i;
      /** @type {string} */
      var substituteString;

      // Insert the substitution strings
      len = vals.length;
      i = -1;
      while (++i < len) {

        substituteString = Debug.getSubstituteString(vals[i]);

        if ( dualDollarSigns.test(msg) ) {
          substituteString = '$1' + substituteString;
          msg = msg.replace(dualDollarSigns, substituteString);
        }
        else {
          msg += '; unnamedVar' + i + '= ' + substituteString;
        }
      }

      return msg;
    };
  })();

  /**
   * ---------------------------------------------------
   * Public Method (Debug.checkArgsDataTypeStrings)
   * ---------------------------------------------------
   * @desc Evaluates whether the arguments contain valid data type string
   *   values for each argument.
   * @param {!vals} args - The arguments to be evaluated.
   * @return {boolean} The evaluation result.
   */
  Debug.checkArgsDataTypeStrings = function(args) {

    /** @type {number} */
    var i;
    /** @type {boolean} */
    var pass;

    pass = true;

    i = args.length;
    while (i--) {

      if (i % 2) {
        pass = checkType(args[i], 'string', true);
        pass = pass && isValidTypeString(args[i]);
      }

      if (!pass) {
        break;
      }
    }

    return pass;
  };

  /**
   * ---------------------------------------------------
   * Public Method (Debug.testArgTypes)
   * ---------------------------------------------------
   * @desc Evaluates argument data types.
   * @param {!vals} args - The arguments to be evaluated.
   * @return {boolean} The evaluation result.
   */
  Debug.testArgTypes = function(args) {

    /** @type {number} */
    var i;
    /** @type {boolean} */
    var pass;
    /** @type {string} */
    var dataTypeOpts;

    pass = true;

    i = args.length;
    while (i--) {

      dataTypeOpts = args[i];
      --i;
      pass = checkType(args[i], dataTypeOpts, true);

      if (!pass) {
        break;
      }
    }

    return pass;
  };

  /**
   * ---------------------------------------------------
   * Public Method (Debug.stripArgTypeStrings)
   * ---------------------------------------------------
   * @desc Removes the data type strings from an array of arguments.
   * @param {!vals} args - The arguments.
   * @return {!vals} An array of the stripped arguments.
   */
  Debug.stripArgTypeStrings = function(args) {

    /** @type {number} */
    var i;
    /** @type {number} */
    var ii;
    /** @type {number} */
    var len;
    /** @type {!vals} */
    var newArgs;

    len = args.length / 2;
    newArgs = new Array(len);

    i = args.length;
    ii = len;
    while (ii--) {
      i = i - 2;
      newArgs[ii] = args[i];
    }

    return newArgs;
  };

////////////////////////////////////////////////////////////////////////////////
// The Debug Module End
////////////////////////////////////////////////////////////////////////////////

  return debugModuleAPI;

})(window, document));
