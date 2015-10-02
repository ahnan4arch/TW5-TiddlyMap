/*\

title: $:/plugins/felixhayashi/tiddlymap/js/DialogManager
type: application/javascript
module-type: library

@module TiddlyMap
@preserve

\*/
(function(){"use strict";var t=require("$:/plugins/felixhayashi/tiddlymap/js/utils").utils;var e=require("$:/plugins/felixhayashi/tiddlymap/js/CallbackManager").CallbackManager;var i=function(t,e){this.logger=$tw.tmap.logger;this.adapter=$tw.tmap.adapter;this.opt=$tw.tmap.opt;this.callbackManager=t;if(e){this.context=e}};i.prototype.open=function(e,i,a){if(t.isTrue(this.opt.config.sys.suppressedDialogs[e],false)){this.logger("warning","Suppressed dialog",e);return}i=i||{};this.logger("debug","Dialog param object",i);if(typeof a==="function"&&this.context){a=a.bind(this.context)}var r=this.opt.path.tempRoot+"/dialog-"+t.genUUID();var l=t.getTiddler(this.opt.path.dialogs+"/"+e);var s={title:r,buttons:l.fields["buttons"]||"ok_cancel",output:r+"/output",result:r+"/result",temp:r+"/temp",template:l.fields.title,templateId:e,currentTiddler:r+"/output"};if(i.dialog){if(i.dialog.preselects){$tw.wiki.addTiddler(new $tw.Tiddler({title:s.output},t.flatten(i.dialog.preselects)));delete i.dialog.preselects}t.merge(s,i.dialog)}s.footer=t.getText(this.opt.path.footers);s=t.flatten(s);i=t.flatten(i);var n=function(e){this.getElement("hidden-close-button").click();var i=$tw.wiki.getTiddler(e);var l=i.fields.text;if(l){var n=$tw.wiki.getTiddler(s.output)}else{var n=null;$tw.tmap.notify("operation cancelled")}if(typeof a==="function"){a(l,n)}var o=t.getMatches("[prefix["+r+"]]");t.deleteTiddlers(o)}.bind(this);this.callbackManager.add(s.result,n,true);var o=new $tw.Tiddler(l,i,s);$tw.wiki.addTiddler(o);this.logger("debug","Opening dialog",o);$tw.rootWidget.dispatchEvent({type:"tm-modal",param:o.fields.title,paramObject:o.fields});this.addKeyBindings();return o};i.prototype.getElement=function(e){return t.getFirstElementByClassName("tmap-"+e)};i.prototype.addKeyBindings=function(){var e=$tw.tmap.keycharm({container:t.getFirstElementByClassName("tc-modal")});var i=/tmap-triggers-(.+?)-on-(.+?)(?:\s|$)/;var a=document.getElementsByClassName("tmap-trigger-field");for(var r=a.length;r--;){var l=a[r].className.split(" ");for(var s=l.length;s--;){var n=l[s].match(i);if(!n){continue}var o=n[1];var d=n[2];var p=this.getElement(o);if(!p)continue;e.bind(d,function(){this.click()}.bind(p))}}};exports.DialogManager=i})();