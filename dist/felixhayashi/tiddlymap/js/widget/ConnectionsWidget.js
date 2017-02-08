"use strict";var _widget=require("$:/core/modules/widgets/widget.js");var _utils=require("$:/plugins/felixhayashi/tiddlymap/js/utils");var _utils2=_interopRequireDefault(_utils);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}
// @preserve
/*\

title: $:/plugins/felixhayashi/tiddlymap/js/widget/connections
type: application/javascript
module-type: widget

@preserve

\*/
function EdgeListWidget(e,t){_widget.widget.call(this,e,t)}EdgeListWidget.prototype=Object.create(_widget.widget.prototype);EdgeListWidget.prototype.render=function(e,t){this.parentDomNode=e;this.computeAttributes();this.execute();this.renderChildren(e,t)};EdgeListWidget.prototype.execute=function(){var e=[this.getVariable("currentTiddler")];var t=this.getAttribute("filter","");var i=this.getAttribute("direction","both");var r=$tm.indeces.allETy;var s=_utils2.default.getEdgeTypeMatches(t,r);var d={typeWL:_utils2.default.getLookupTable(s),direction:i};var o=$tm.adapter.getNeighbours(e,d);var a=o.nodes;var g=o.edges;var n=[];for(var u in g){var l=g[u];var h=a[l.to]||a[l.from];if(!h)continue;n.push({type:"tmap-edgelistitem",edge:l,typeWL:d.typeWL,neighbour:h,children:this.parseTreeNode.children})}if(!n.length){this.wasEmpty=true;n=this.getEmptyMessage()}else if(this.wasEmpty){this.removeChildDomNodes()}this.makeChildWidgets(n)};EdgeListWidget.prototype.getEmptyMessage=function(){var e=this.wiki.parseText("text/vnd.tiddlywiki",this.getAttribute("emptyMessage",""),{parseAsInline:true});return e?e.tree:[]};EdgeListWidget.prototype.refresh=function(e){var t=this.computeAttributes();var i=Object.keys(t).length;if(i){this.refreshSelf();return true}for(var r in e){if(!_utils2.default.isSystemOrDraft(r)){this.refreshSelf();return true}}return this.refreshChildren(e)};function EdgeListItemWidget(e,t){_widget.widget.call(this,e,t);this.arrows=$tm.misc.arrows}EdgeListItemWidget.prototype=Object.create(_widget.widget.prototype);EdgeListItemWidget.prototype.execute=function(){var e=this.parseTreeNode;var t=$tm.tracker.getTiddlerById(e.neighbour.id);var i=_utils2.default.flatten(e.edge);for(var r in i){if(typeof i[r]==="string"){this.setVariable("edge."+r,i[r])}}this.setVariable("currentTiddler",t);this.setVariable("neighbour",t);var s=$tm.indeces.allETy[i.type];var d=i.to===e.neighbour.id?"to":"from";var o=d;if(s.biArrow){o="bi"}else{if(d==="to"&&s.invertedArrow){o="from"}else if(d==="from"&&s.invertedArrow){o="to"}}this.setVariable("direction",o);this.setVariable("directionSymbol",o==="bi"?this.arrows.bi:o==="from"?this.arrows.in:this.arrows.out);this.makeChildWidgets()};EdgeListItemWidget.prototype.refresh=function(e){return this.refreshChildren(e)};exports["tmap-edgelistitem"]=EdgeListItemWidget;exports["tmap-connections"]=EdgeListWidget;
//# sourceMappingURL=./maps/felixhayashi/tiddlymap/js/widget/ConnectionsWidget.js.map