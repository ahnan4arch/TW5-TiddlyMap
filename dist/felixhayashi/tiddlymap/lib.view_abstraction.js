/*\

title: $:/plugins/felixhayashi/tiddlymap/js/ViewAbstraction
type: application/javascript
module-type: library

@module TiddlyMap
@preserve

\*/
(function(){"use strict";var t=require("$:/plugins/felixhayashi/tiddlymap/js/EdgeType").EdgeType;var e=require("$:/plugins/felixhayashi/tiddlymap/js/utils").utils;var i=function(t,r){this.opt=$tw.tmap.opt;this.logger=$tw.tmap.logger;if(t instanceof i){return t}this._registerPaths(t);if(r){this._createView()}else if(!this.exists()){return}this._ignoreOnNextRebuild=e.getDataMap();this.rebuildCache(e.getValues(this.path))};i.prototype._registerPaths=function(t){this.path=this.path||e.getDataMap();this.path.config=this._getConfigPath(t);this.path.map=this.path.config+"/map";this.path.nodeFilter=this.path.config+"/filter/nodes";this.path.edgeFilter=this.path.config+"/filter/edges"};i.prototype._getConfigPath=function(t){if(t instanceof $tw.Tiddler){return t.fields.title}if(typeof t=="string"){t=e.getWithoutPrefix(t,this.opt.path.views+"/");if(!e.hasSubString(t,"/")){return this.opt.path.views+"/"+t}}};i.prototype.getPaths=function(){return this.path};i.prototype._createView=function(){if(this.exists()){this.destroy()}var t={};t.title=this.path.config;t[this.opt.field.viewMarker]=true;t.id=e.genUUID();$tw.wiki.addTiddler(new $tw.Tiddler(t))};i.prototype.isLocked=function(){return $tw.wiki.isShadowTiddler(this.path.config)};i.prototype.refresh=function(t){return this.rebuildCache(Object.keys(t))};i.prototype.rebuildCache=function(t,i){if(!this.exists())return[];if(e.inArray(this.path.config,t)){this.logger("debug","Reloading config of view",this.getLabel(),"; trigger full rebuild");t=e.getValues(this.path)}var r=this._ignoreOnNextRebuild;this._ignoreOnNextRebuild=e.getDataMap();var s=[];for(var o=0;o<t.length;o++){var n=t[o];if(!i&&r[n]){continue}else if(n===this.path.config){this.config=this.getConfig(null,true)}else if(n===this.path.map){this.nodeData=this.getNodeData(null,true)}else if(n===this.path.nodeFilter){this.nodeFilter=this.getNodeFilter(null,true)}else if(n===this.path.edgeFilter){this.edgeFilter=this.getEdgeFilter(null,true)}else{continue}s.push(n)}return s};i.prototype.exists=function(){return e.tiddlerExists(this.path.config)};i.prototype.getRoot=function(){return this.path.config};i.prototype.getCreationDate=function(t){if(!this.exists())return;var e=$tw.wiki.getTiddler(this.path.config).fields["created"];if(t){return e instanceof Date?$tw.utils.formatDateString(e,"DDth MMM YYYY"):""}return e};i.prototype.getLabel=function(){if(this.exists()){return e.getBasename(this.path.config)}};i.prototype.destroy=function(){if(!this.exists())return;var t="[prefix["+this.getRoot()+"]]";e.deleteTiddlers(e.getMatches(t));this.path=e.getDataMap()};i.prototype.getReferences=function(){var t="[regexp:text[<\\$tiddlymap.*?view=."+this.getLabel()+"..*?>]]";return e.getMatches(t)};i.prototype.rename=function(t){if(!this.exists()||typeof t!=="string")return false;if(e.inArray("/",t)){$tw.tmap.notify('A view name must not contain any "/"');return false}var i=this.getLabel();var r=this.opt.path.views+"/"+t;var s=e.changePrefix(this.getRoot(),r,true);if(!s)return false;this._registerPaths(t);this.rebuildCache(e.getValues(this.path),true);var o=$tw.tmap.indeces.loNTy;for(var n=o.length;n--;){var a=o[n];if(a.data.view===i){a.setData("view",t).persist()}}};i.prototype.isEnabled=function(t){return e.isTrue(this.getConfig(t),false)};i.prototype.getConfig=function(t,i,r){if(!this.exists()){var s=e.getDataMap()}else if(!i&&this.config){var s=this.config}else{var o=$tw.wiki.getTiddler(this.path.config).fields;var s=e.getPropertiesByPrefix(o,"config.")}return t?s[e.startsWith(t,"config.")?t:"config."+t]:s};i.prototype.getStabilizationIterations=function(){return this.stabIterations?this.stabIterations:1e3};i.prototype.setStabilizationIterations=function(t){};i.prototype.getHierarchyEdgeTypes=function(){if(this.getConfig("layout.active")!=="hierarchical")return[];var t=e.getPropertiesByPrefix(this.getConfig(),"config.layout.hierarchical.order-by-",true);var i=e.getDataMap();for(var r in t){if(t[r]==="true"){var s=e.getTiddler($tw.tmap.indeces.tById[r]);if(s){i[e.getBasename(s.fields.title)]=true}}}return i};i.prototype.setConfig=function(){if(arguments[0]==null)return;if(arguments.length===1&&typeof arguments[0]==="object"){for(var t in arguments[0]){this.setConfig(t,arguments[0][t])}}else if(arguments.length===2&&typeof arguments[0]==="string"){var t=e.getWithoutPrefix(arguments[0],"config.");var i=arguments[1];if(i===undefined){return}if(i===null){this.logger("debug","Removing config",t);delete this.config["config."+t]}else{if(t==="edge_type_namespace"&&typeof i==="string"&&i.length){i=i.replace(/([^:])$/,"$1:")}}this.logger("log","Setting config",t,i);this.config["config."+t]=i}else{return}$tw.wiki.addTiddler(new $tw.Tiddler($tw.wiki.getTiddler(this.path.config),this.config));this._ignoreOnNextRebuild[this.path.config]=true};i.prototype.isExplicitNode=function(t){var i=e.escapeRegex(this._getAddNodeFilterPart(t));return this.getNodeFilter("expression").match(i)};i.prototype.isLiveView=function(){return this.getLabel()===this.opt.misc.liveViewLabel};i.prototype.removeNodeFromFilter=function(t){if(!this.isExplicitNode(t))return false;var e=this.getNodeFilter("expression");var i=e.replace(this._getAddNodeFilterPart(t),"");this.setNodeFilter(i);return true};i.prototype._getAddNodeFilterPart=function(t){return"[field:"+this.opt.field.nodeId+"["+t.id+"]]"};i.prototype.setNodeFilter=function(t,i){if(!this.exists())return;t=t.replace(/[\n\r]/g," ");if(this.getNodeFilter.expression===t){return}if(this.isLiveView()&&!i){$tw.tmap.notify("It is forbidden to change the node filter of the live view!");return}e.setField(this.path.nodeFilter,"filter",t);this.logger("debug","Node filter set to",t);this.nodeFilter=this.getNodeFilter(null,true);this._ignoreOnNextRebuild[this.path.nodeFilter]=true};i.prototype.setEdgeFilter=function(t){if(!this.exists())return;t=t.replace(/[\n\r]/g," ");if(this.getEdgeFilter.expression===t){return}e.setField(this.path.edgeFilter,"filter",t);this.logger("debug","Edge filter set to",t,this.path.edgeFilter);this.edgeFilter=this.getEdgeFilter(null,true);this._ignoreOnNextRebuild[this.path.edgeFilter]=true};i.prototype.appendToNodeFilter=function(t){var t=this.getNodeFilter("expression")+" "+t;this.setNodeFilter(t)};i.prototype.addNodeToView=function(t){this.appendToNodeFilter(this._getAddNodeFilterPart(t));this.saveNodePosition(t)};i.prototype.getEdgeFilter=function(t,i){if(!i&&this.edgeFilter){var r=this.edgeFilter}else{var r=e.getDataMap();var s=$tw.wiki.getTiddler(this.path.edgeFilter);r.expression=s&&s.fields.filter?s.fields.filter:this.opt.filter.defaultEdgeFilter;r.compiled=$tw.wiki.compileFilter(r.expression)}return t?r[t]:r};i.prototype.getNodeFilter=function(t,i){if(!i&&this.nodeFilter){var r=this.nodeFilter}else{var r=e.getDataMap();var s=$tw.wiki.getTiddler(this.path.nodeFilter);r.expression=s&&s.fields.filter?s.fields.filter:"";r.compiled=$tw.wiki.compileFilter(r.expression)}return t?r[t]:r};i.prototype.getNodeData=function(t,i){var r=!i&&this.nodeData?this.nodeData:e.parseFieldData(this.getNodeDataStore(),"text",{});return t?r[t]:r};i.prototype.isEqual=function(t){var t=new i(t);return this.getRoot()===t.getRoot()};i.prototype.saveNodeData=function(){if(!this.exists())return;var t=arguments;var i=this.getNodeData();if(t.length===2&&typeof t[0]==="string"){if(typeof t[1]==="object"){if(t[1]===null){delete i[t[0]]}else{i[t[0]]=$tw.utils.extend(i[t[0]]||{},t[1])}}}else if(t.length===1&&typeof t[0]==="object"){$tw.tmap.logger("log","Storing data in",this.getNodeDataStore());$tw.utils.extend(i,t[0])}else{return}e.writeFieldData(this.getNodeDataStore(),"text",i);this.nodeData=i;this._ignoreOnNextRebuild[this.path.map]=true};i.prototype.getNodeDataStore=function(){return this.path.map};i.prototype.saveNodePosition=function(t){if(t.id&&t.x&&t.y){this.saveNodeData(t.id,{x:t.x,y:t.y})}};i.prototype.saveNodeStyle=function(t,e){if(!this.exists())return;var i=this.getNodeData()[t];if(!i)return;for(var r in i){if(r!=="x"&&r!=="y")delete i[r]}this.saveNodeData(t,e)};exports.ViewAbstraction=i})();