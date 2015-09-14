/*\

title: $:/plugins/felixhayashi/tiddlymap/js/utils
type: application/javascript
module-type: library

ATTENTION: THIS CLASS MUST NOT REQUIRE ANY OTHER TIDDLYMAP FILE
IN ORDER TO AVOID ACYCLIC DEPENDENCIES!

@module TiddlyMap
@preserve

\*/
(function(){"use strict";var e=require("$:/plugins/felixhayashi/vis/vis.js");var t=require("$:/plugins/felixhayashi/tiddlymap/js/exception").Exception;var r={};r.deleteTiddlers=function(e){var t=Object.keys(e);var i=$tw.wiki.getTiddlerList("$:/StoryList");for(var n=t.length;n--;){var a=r.getTiddlerRef(e[t[n]]);if(!$tw.wiki.tiddlerExists(e[t[n]])){continue}var l=i.indexOf(a);if(l!==-1){i.splice(l,1);r.setField("$:/StoryList","list",i)}$tw.wiki.deleteTiddler(a)}};r.moveFieldValues=function(e,t,i,n,a){var l=a||$tw.wiki.allTitles();for(var f=l.length;f--;){var u=r.getTiddler(l[f]);if(u.isDraft()||!u.fields[e]||!n&&$tw.wiki.isSystemTiddler(l[f])){continue}var s={};s[t]=u.fields[e];if(i){s[e]=undefined}$tw.wiki.addTiddler(new $tw.Tiddler(u,s))}};r.getLabel=function(e,t){var i=r.getTiddler(e);return i&&i.fields[t]?i.fields[t]:i.fields.title};r.ucFirst=function(e){return e&&e[0].toUpperCase()+e.slice(1)};r.convert=function(t,i){if(typeof t!=="object")return;switch(i){case"array":return r.getValues(t);case"hashmap":case"object":if(t instanceof e.DataSet){return e.get({returnType:"Object"})}else{return t}case"dataset":default:if(t instanceof e.DataSet){return t}if(!Array.isArray(t)){t=r.getValues(t)}return new e.DataSet(t)}};r.inject=function(t,i){if(i instanceof e.DataSet){i.update(r.convert(t,"array"))}else if(Array.isArray(i)){t=r.convert(t,"object");for(var n in t){if(!r.inArray(t[n],i)){i.push(t[n])}}}else{$tw.utils.extend(i,r.convert(t,"object"))}return i};r.getValues=function(t){if(Array.isArray(t)){return t}if(t instanceof e.DataSet){return t.get({returnType:"Array"})}var r=[];var i=Object.keys(t);for(var n=i.length;n--;){r.push(t[i[n]])}return r};r.hasOwnProp=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)};r.getDataMap=function(){var e=Object.create(null);Object.defineProperty(e,"hasOwnProperty",{enumerable:false,configurable:false,writable:false,value:Object.prototype.hasOwnProperty.bind(e)});return e};r.getMatches=function(e,t,i){var n=undefined;if(t!==null&&typeof t==="object"){var a=Object.keys(t);n=function(e){for(var i=0;i<a.length;i++){var n=r.getTiddler(t[a[i]]);if(n){e(n,n.fields.title)}}}}if(typeof e==="string"){e=$tw.wiki.compileFilter(e)}var l=e.call($tw.wiki,n);if(i){var f=r.getDataMap();for(var u=0;u<l.length;u++){f[l[u]]=$tw.wiki.getTiddler(l[u])}return f}else{return l}};r.isMatch=function(e,t){var i=r.getTiddlerRef(e);return r.getMatches(t,[i]).length>0};r.isInteger=Number.isInteger||function(e){return typeof e==="number"&&isFinite(e)&&Math.floor(e)===e};r.escapeRegex=function(e){return e.replace(/[-$^?.+*[\]\\(){}|]/g,"\\$&")};r.isTrue=function(e,t){if(e==null){return!!t}else if(typeof e==="string"){var r=parseInt(e);return isNaN(r)?e==="true":r!==0;if(e==="1"||this.data[conf]==="true");}else if(typeof e==="boolean"){return e}else if(typeof e==="number"){return r!==0}return false};r.getTiddlerRef=function(e){if(e instanceof $tw.Tiddler){return e.fields.title}else if(typeof e==="string"){return e}};r.getTiddler=function(e,t){if(e instanceof $tw.Tiddler){if(!t){return e}e=e.fields.title}return $tw.wiki.getTiddler(e)};r.getBasename=function(e){return e.substring(e.lastIndexOf("/")+1)};r.notify=function(e){var t="$:/temp/tiddlymap/notify";$tw.wiki.addTiddler(new $tw.Tiddler({title:t,text:e}));$tw.notifier.display(t)};r.tiddlerExists=function(e){var t=r.getTiddlerRef(e);return t&&($tw.wiki.tiddlerExists(t)||$tw.wiki.isShadowTiddler(t))};r.addListeners=function(e,t,r){for(var i in e){t.addEventListener(i,e[i].bind(r))}};r.isPreviewed=function(e){if(e){if(e.getVariable("tv-tiddler-preview")){return true}else{var t="tc-tiddler-preview-preview";return!!r.getAncestorWithClass(e.parentDomNode,t)}}return false};r.getAncestorWithClass=function(e,t){if(typeof e!=="object"||typeof t!=="string")return;while(e.parentNode){e=e.parentNode;if($tw.utils.hasClass(e,t)){return e}}};r.getPropertiesByPrefix=function(e,t,i){var n=r.getDataMap();for(var a in e){if(r.startsWith(a,t)){n[i?a.substr(t.length):a]=e[a]}}return n};r.getWithoutPrefix=function(e,t){return r.startsWith(e,t)?e.substr(t.length):e};r.hasPropWithPrefix=function(e,t){for(var i in e){if(r.startsWith(i,t))return true}return false};r.startsWith=function(e,t){return e.substring(0,t.length)===t};r.hasElements=function(e){return Object.keys(e).length>0};r.groupByProperty=function(e,t){e=r.getIterableCollection(e);var i=r.getDataMap();var n=Object.keys(e);for(var a in n){var l=e[n[a]];var f=l[t];if(f==null){throw"Cannot group by property "+t}else{if(!Array.isArray(i[f])){i[f]=[]}i[f].push(l)}}return i};r.findAndRemoveClassNames=function(e){for(var t=0;t<e.length;t++){var r=document.getElementsByClassName(e[t]);for(var i=0;i<r.length;i++){$tw.utils.removeClass(r[i],e[t])}}};r.parseFieldData=function(e,t,i){var n=r.getTiddler(e);if(!n)return i;if(!t)t="text";return r.parseJSON(n.fields[t],i)};r.parseJSON=function(e,t){try{return JSON.parse(e)}catch(r){return t}};r.writeFieldData=function(e,t,i){if(typeof i==="object"){r.setField(e,t,JSON.stringify(i))}};r.getPrettyFilter=function(e){e=e.trim().replace("][","] [");var t=/[\+\-]?\[.+?[\]\}\>]\]/g;var r=e.match(t);e=e.replace(t," [] ").trim();var i=e.split(/\s+/);var n=0;var a=[];for(var l=0;l<i.length;l++){a[l]=i[l]==="[]"?r[n++]:i[l]}return a.join("\n")};r.setField=function(e,t,i){if(e&&t){var n={title:r.getTiddlerRef(e)};n[t]=i;var a=r.getTiddler(e,true);$tw.wiki.addTiddler(new $tw.Tiddler(a,n))}};r.setEntry=function(e,t,i){$tw.wiki.setText(r.getTiddlerRef(e),null,t,i)};r.getEntry=function(e,t,i){var n=$tw.wiki.getTiddlerData(r.getTiddlerRef(e),{});return n[t]==null?i:n[t]};r.getField=function(e,t,i){i=i||"";var n=r.getTiddler(e);return!n?i:n.fields[t]||i};r.getText=function(e,t){return r.getField(e,"text",t)};r.getFirstElementByClassName=function(e,t,i){var n=(t||document).getElementsByClassName(e)[0];if(!n&&i!==false){var a="Missing element with class "+e+" inside "+t;throw new r.Exception.EnvironmentError(a)}return n};r.isDraft=function(e){var t=r.getTiddler(e);return t&&t.isDraft()};r.merge=function(e){var t=function(e,r){if(typeof e!=="object"){e={}}for(var i in r){if(r.hasOwnProperty(i)){if(r[i]!=null){e[i]=typeof r[i]==="object"?t(e[i],r[i]):r[i]}}}return e};for(var r=1;r<arguments.length;r++){e=t(e,arguments[r])}return e};r.drawRaster=function(e,t,r,i,n){var i=parseInt(i)||10;var a=e.canvas;var l=a.width/t;var f=a.width/t;var u=r.x-l/2;var s=r.y-f/2;for(var o=u;o<l;o+=i){e.moveTo(o,s);e.lineTo(o,f)}for(var d=s;d<f;d+=i){e.moveTo(u,d);e.lineTo(l,d)}e.strokeStyle=n||"#D9D9D9";e.stroke()};r.isSystemOrDraft=function(e){return $tw.wiki.isSystemTiddler(r.getTiddlerRef(e))?true:r.isDraft(e)};r.changePrefix=function(e,t,i){if(e===t||!e||!t)return;var n=r.getTiddlersByPrefix(e);var a=r.getDataMap();for(var l=n.length;l--;){var f=n[l];var u=f.replace(e,t);if($tw.wiki.tiddlerExists(u)&&!i){return}a[f]=u}for(var f in a){r.setField(f,"title",a[f]);$tw.wiki.deleteTiddler(f)}return a};r.inArray=function(e,t){return t.indexOf(e)!==-1};r.hasSubString=function(e,t){return e.indexOf(t)!==-1};r.joinAndWrap=function(e,t,r,i){if(!i)i=" ";return t+e.join(r+i+t)+r};r.keysOfItemsWithProperty=function(e,t,i,n){e=r.getIterableCollection(e);var a=Object.keys(e);var l=[];var n=typeof n==="number"?n:a.length;for(var f=0;f<a.length;f++){var u=a[f];if(typeof e[u]==="object"&&e[u][t]){if(!i||e[u][t]===i){l.push(u);if(l.length===n){break}}}}return l};r.keyOfItemWithProperty=function(e,t,i){var n=r.keysOfItemsWithProperty(e,t,i,1);return n.length?n[0]:undefined};r.deleteByPrefix=function(e){r.deleteTiddlers(r.getByPrefix(e))};r.getByPrefix=function(e){return r.getMatches("[prefix["+e+"]]")};r.getIterableCollection=function(t){return t instanceof e.DataSet?t.get():t};r.getLookupTable=function(e,t){e=r.getIterableCollection(e);var i=r.getDataMap();var n=Object.keys(e);for(var a=0;a<n.length;a++){var l=n[a];var f=t?e[l][t]:e[l];if(typeof f==="string"&&f!=""||typeof f==="number"){if(!i[f]){i[f]=e[l];continue}}throw'TiddlyMap: Cannot use "'+f+'" as lookup table index'}return i};r.getArrayValuesAsHashmapKeys=function(e){return r.getLookupTable(e)};r.getTiddlersWithField=function(e,t,i){if(!i||typeof i!=="object")i={};var n=i.tiddlers||$tw.wiki.allTitles();var a=i.limit||0;var l=i.isIncludeDrafts===true;var f=r.getDataMap();var u=Object.keys(n);var s=$tw.utils.hop;for(var o=u.length;o--;){var d=r.getTiddler(n[u[o]]);var c=d.fields;if(s(c,e)&&(!s(c,"draft.of")||l)){if(!t||c[e]===t){f[c.title]=d;if(--a===0)break}}}return f};r.getTiddlerWithField=function(e,t){var i=r.getTiddlersWithField(e,t,{limit:1});return Object.keys(i)[0]};r.getTiddlersByPrefix=function(e,t){var t=t||$tw.wiki.allTitles();var i=[];var n=Object.keys(t);for(var a=n.length;a--;){var l=r.getTiddlerRef(t[n[a]]);if(r.startsWith(l,e)){i.push(l)}}return i};r.Exception=t;r.makeDraftTiddler=function(e){var t=$tw.wiki.findDraft(e);if(t){return $tw.wiki.getTiddler(t)}var i=$tw.wiki.getTiddler(e);t=r.generateDraftTitle(e);var n=new $tw.Tiddler(i,{title:t,"draft.title":e,"draft.of":e},$tw.wiki.getModificationFields());$tw.wiki.addTiddler(n);return n};r.generateDraftTitle=function(e){var t=0,r;do{r="Draft "+(t?t+1+" ":"")+"of '"+e+"'";t++}while($tw.wiki.tiddlerExists(r));return r};r.getFullScreenApis=function(){var e=document,t=e.body,r={_requestFullscreen:t.webkitRequestFullscreen!==undefined?"webkitRequestFullscreen":t.mozRequestFullScreen!==undefined?"mozRequestFullScreen":t.msRequestFullscreen!==undefined?"msRequestFullscreen":t.requestFullscreen!==undefined?"requestFullscreen":"",_exitFullscreen:e.webkitExitFullscreen!==undefined?"webkitExitFullscreen":e.mozCancelFullScreen!==undefined?"mozCancelFullScreen":e.msExitFullscreen!==undefined?"msExitFullscreen":e.exitFullscreen!==undefined?"exitFullscreen":"",_fullscreenElement:e.webkitFullscreenElement!==undefined?"webkitFullscreenElement":e.mozFullScreenElement!==undefined?"mozFullScreenElement":e.msFullscreenElement!==undefined?"msFullscreenElement":e.fullscreenElement!==undefined?"fullscreenElement":"",_fullscreenChange:e.webkitFullscreenElement!==undefined?"webkitfullscreenchange":e.mozFullScreenElement!==undefined?"mozfullscreenchange":e.msFullscreenElement!==undefined?"MSFullscreenChange":e.fullscreenElement!==undefined?"fullscreenchange":""};if(!r._requestFullscreen||!r._exitFullscreen||!r._fullscreenElement){return null}else{return r}};r.flatten=function(e,t){t=t||{};var r=t.delimiter||".";var i=t.prefix||"";var n={};function a(e,l){Object.keys(e).forEach(function(f){var u=e[f];var s=t.safe&&Array.isArray(u);var o=Object.prototype.toString.call(u);var d=o==="[object Object]"||o==="[object Array]";var c=l?l+r+f:i+f;if(!s&&d){return a(u,c)}n[c]=u})}a(e);return n};r.unflatten=function(e,t){t=t||{};var i=t.delimiter||".";var n={};if(Object.prototype.toString.call(e)!=="[object Object]"){return e}function a(e){var t=Number(e);return isNaN(t)||e.indexOf(".")!==-1?e:t}Object.keys(e).forEach(function(l){var f=l.split(i);var u=a(f.shift());var s=a(f[0]);var o=n;while(s!==undefined){if(o[u]===undefined){o[u]=typeof s==="number"&&!t.object?[]:{}}o=o[u];if(f.length>0){u=a(f.shift());s=a(f[0])}}o[u]=r.unflatten(e[l],t)});return n};r.genUUID=function(){var e="0123456789abcdefghijklmnopqrstuvwxyz".split("");return function(){var t=e,r=new Array(36);var i=0,n;for(var a=0;a<36;a++){if(a==8||a==13||a==18||a==23){r[a]="-"}else if(a==14){r[a]="4"}else{if(i<=2)i=33554432+Math.random()*16777216|0;n=i&15;i=i>>4;r[a]=t[a==19?n&3|8:n]}}return r.join("")}}();exports.utils=r})();