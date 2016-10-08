(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("fightly", [], factory);
	else if(typeof exports === 'object')
		exports["fightly"] = factory();
	else
		root["fightly"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _ensy = __webpack_require__(1);
	
	var _ensy2 = _interopRequireDefault(_ensy);
	
	var _events = __webpack_require__(2);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _engine = __webpack_require__(3);
	
	var _engine2 = _interopRequireDefault(_engine);
	
	var _network = __webpack_require__(5);
	
	var _network2 = _interopRequireDefault(_network);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createApplication(modules) {
	    var emitter = new _events2.default();
	    var network = new _network2.default(emitter);
	    var manager = new _ensy2.default();
	    var engine = new _engine2.default(emitter, network, manager, modules);
	
	    emitter.manager = manager;
	    emitter.network = network;
	    emitter.actions = {};
	
	    Object.defineProperty(emitter, 'games', {
	        get: function get() {
	            return engine.games;
	        }
	    });
	
	    return emitter;
	}
	
	exports.default = createApplication;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	!function(t,n){ true?module.exports=n():"function"==typeof define&&define.amd?define(n):t.ensy=n()}(this,function(){"use strict";function t(n){if(null==n||"object"!=("undefined"==typeof n?"undefined":e(n)))return n;var o;if(n instanceof Date)return o=new Date,o.setTime(n.getTime()),o;if(n instanceof Array){o=[];for(var r=0,i=n.length;r<i;r++)o[r]=t(n[r]);return o}if(n instanceof Object){o={};for(var s in n)n.hasOwnProperty(s)&&(o[s]=t(n[s]));return o}}function n(t){return t&&"[object Function]"==={}.toString.call(t)}var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o=(function(){function t(t){this.value=t}function n(n){function e(t,n){return new Promise(function(e,r){var a={key:t,arg:n,resolve:e,reject:r,next:null};s?s=s.next=a:(i=s=a,o(t,n))})}function o(e,i){try{var s=n[e](i),a=s.value;a instanceof t?Promise.resolve(a.value).then(function(t){o("next",t)},function(t){o("throw",t)}):r(s.done?"return":"normal",s.value)}catch(t){r("throw",t)}}function r(t,n){switch(t){case"return":i.resolve({value:n,done:!0});break;case"throw":i.reject(n);break;default:i.resolve({value:n,done:!1})}i=i.next,i?o(i.key,i.arg):s=null}var i,s;this._invoke=e,"function"!=typeof n.return&&(this.return=void 0)}return"function"==typeof Symbol&&Symbol.asyncIterator&&(n.prototype[Symbol.asyncIterator]=function(){return this}),n.prototype.next=function(t){return this._invoke("next",t)},n.prototype.throw=function(t){return this._invoke("throw",t)},n.prototype.return=function(t){return this._invoke("return",t)},{wrap:function(t){return function(){return new n(t.apply(this,arguments))}},await:function(n){return new t(n)}}}(),function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}),r=function(){function t(t,n){for(var e=0;e<n.length;e++){var o=n[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(n,e,o){return e&&t(n.prototype,e),o&&t(n,o),n}}(),i=function(){function e(t){o(this,e),this.listener=null,t&&n(t.emit)&&(this.listener=t),this.entities=[],this.components={},this.assemblages={},this.entityComponentData={},this.processors=[],this.uid=0}return r(e,[{key:"getUid",value:function(){return this.uid++}},{key:"createEntity",value:function(t){var n=this.getUid();return this.addComponentsToEntity(t,n),this.entities.push(n),n}},{key:"removeEntity",value:function(t){for(var n in this.entityComponentData)this.entityComponentData.hasOwnProperty(n)&&this.entityComponentData[n][t]&&delete this.entityComponentData[n][t];return this.entities.splice(this.entities.indexOf(t),1),this}},{key:"addComponent",value:function(t,n){return this.components[t]=n,this}},{key:"removeComponent",value:function(t){return delete this.components[t],delete this.entityComponentData[t],this}},{key:"getComponentsList",value:function(){return Object.keys(this.components)}},{key:"addComponentsToEntity",value:function(n,e){var o,r,i=this;for(o=n.length-1;o>=0;o--)if(r=n[o],!this.components[r])throw new Error("Trying to use unknown component: "+r);for(o=n.length-1;o>=0;o--){r=n[o],this.entityComponentData[r]||(this.entityComponentData[r]={});var s=null;i.listener?(s={},function(n){var o=t(i.components[r].state);for(var s in o)o.hasOwnProperty(s)&&!function(t){Object.defineProperty(n,t,{get:function(){return o[t]},set:function(n){o[t]=n,i.listener.emit("entityComponentUpdated",e,r)}})}(s)}(s)):s=t(i.components[r].state),s.__id=e,this.entityComponentData[r][e]=s}return this}},{key:"removeComponentsFromEntity",value:function(t,n){var e,o;for(e=t.length-1;e>=0;e--)if(o=t[e],!this.components[o])throw new Error("Trying to use unknown component: "+o);for(e=t.length-1;e>=0;e--)o=t[e],this.entityComponentData[o]&&this.entityComponentData[o][n]&&delete this.entityComponentData[o][n];return this}},{key:"getComponentDataForEntity",value:function(t,n){if(!(t in this.components))throw new Error("Trying to use unknown component: "+t);if(!this.entityComponentData.hasOwnProperty(t)||!this.entityComponentData[t].hasOwnProperty(n))throw new Error("No data for component "+t+" and entity "+n);return this.entityComponentData[t][n]}},{key:"updateComponentDataForEntity",value:function(t,n,e){var o=this.getComponentDataForEntity(t,n);for(var r in e)e.hasOwnProperty(r)&&o.hasOwnProperty(r)&&(o[r]=e[r]);return this}},{key:"getComponentsData",value:function(t){if(!(t in this.components))throw new Error("Trying to use unknown component: "+t);return this.entityComponentData.hasOwnProperty(t)?this.entityComponentData[t]:[]}},{key:"entityHasComponent",value:function(t,n){return n in this.components&&(this.entityComponentData.hasOwnProperty(n)&&this.entityComponentData[n].hasOwnProperty(t))}},{key:"addAssemblage",value:function(t,n){return this.assemblages[t]=n,this}},{key:"removeAssemblage",value:function(t){return delete this.assemblages[t],this}},{key:"createEntityFromAssemblage",value:function(t){if(!(t in this.assemblages))throw new Error("Trying to use unknown assemblage: "+t);var n=this.assemblages[t],e=this.createEntity(n.components);for(var o in n.initialState)if(n.initialState.hasOwnProperty(o)){var r=n.initialState[o];this.updateComponentDataForEntity(o,e,r)}return e}},{key:"addProcessor",value:function(t){return this.processors.push(t),this}},{key:"removeProcessor",value:function(t){return this.processors.splice(this.processors.indexOf(t),1),this}},{key:"update",value:function(t){for(var n=0;n<this.processors.length;n++)this.processors[n].update(t);return this}}]),e}();return i});
	//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbInNyYy9lbnRpdHktbWFuYWdlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIGVuc3kgLSBFbnRpdHkgU3lzdGVtIEphdmFTY3JpcHQgTGlicmFyeSB2MS4yLjFcbiAqXG4gKiBBIEphdmFTY3JpcHQgaW1wbGVtZW50YXRpb24gb2YgdGhlIEVudGl0eSBTeXN0ZW0gbW9kZWwgYXMgZGVzY3JpYmVkIGJ5XG4gKiBBZGFtIE1hcnRpbiBpbiBodHRwOi8vdC1tYWNoaW5lLm9yZy9pbmRleC5waHAvMjAwOS8xMC8yNi9lbnRpdHktc3lzdGVtcy1hcmUtdGhlLWZ1dHVyZS1vZi1tbW9zLXBhcnQtNS9cbiAqXG4gKiBAYXV0aG9yIEFkcmlhbiBHYXVkZWJlcnQgLSBhZHJpYW5AZ2F1ZGViZXJ0LmZyXG4gKiBAbGljZW5zZSBNSVQgbGljZW5zZS5cbiAqXG4gKi9cblxuLyohXG4gKiBSZXR1cm4gYSBjbG9uZSBvZiBhbiBvYmplY3QuXG4gKiBGcm9tIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzcyODM2MFxuICovXG5mdW5jdGlvbiBjbG9uZShvYmopIHtcbiAgICAvLyBIYW5kbGUgdGhlIDMgc2ltcGxlIHR5cGVzLCBhbmQgbnVsbCBvciB1bmRlZmluZWRcbiAgICBpZiAobnVsbCA9PSBvYmogfHwgJ29iamVjdCcgIT0gdHlwZW9mIG9iaikgcmV0dXJuIG9iajtcblxuICAgIHZhciBjb3B5O1xuXG4gICAgLy8gSGFuZGxlIERhdGVcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICBjb3B5ID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29weS5zZXRUaW1lKG9iai5nZXRUaW1lKCkpO1xuICAgICAgICByZXR1cm4gY29weTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgQXJyYXlcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgY29weSA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gb2JqLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjb3B5W2ldID0gY2xvbmUob2JqW2ldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29weTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgT2JqZWN0XG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICBjb3B5ID0ge307XG4gICAgICAgIGZvciAodmFyIGF0dHIgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGF0dHIpKSBjb3B5W2F0dHJdID0gY2xvbmUob2JqW2F0dHJdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29weTtcbiAgICB9XG59XG5cbi8qIVxuICogUmV0dXJuIHRydWUgaWYgdGhlIHBhcmFtZXRlciBpcyBhIGZ1bmN0aW9uLlxuICogRnJvbSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81OTk5OTk4XG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odGhpbmdUb0NoZWNrKSB7XG4gICAgcmV0dXJuIHRoaW5nVG9DaGVjayAmJiAoe30pLnRvU3RyaW5nLmNhbGwodGhpbmdUb0NoZWNrKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxuLyoqXG4gKiBAY2xhc3MgRW50aXR5TWFuYWdlclxuICpcbiAqIEltcGxlbWVudCB0aGUgRW50aXR5IFN5c3RlbSBtb2RlbCBhbmQgcHJvdmlkZSB0b29scyB0byBlYXNpbHlcbiAqIGNyZWF0ZSBhbmQgbWFuaXB1bGF0ZSBFbnRpdGllcywgQ29tcG9uZW50cyBhbmQgUHJvY2Vzc29ycy5cbiAqL1xuY2xhc3MgRW50aXR5TWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IobGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lciA9IG51bGw7XG4gICAgICAgIGlmIChsaXN0ZW5lciAmJiBpc0Z1bmN0aW9uKGxpc3RlbmVyLmVtaXQpKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBIGxpc3Qgb2YgZW50aXR5IElEcywgZWFjaCBiZWluZyBhIHNpbXBsZSBpbnRlZ2VyLlxuICAgICAgICB0aGlzLmVudGl0aWVzID0gW107XG5cbiAgICAgICAgLy8gQSBkaWN0aW9uYXJ5IG9mIGNvbXBvbmVudHMsIHdoZXJlIGtleXMgYXJlIHRoZSBuYW1lIG9mIGVhY2hcbiAgICAgICAgLy8gY29tcG9uZW50LiBDb21wb25lbnRzIGFyZSBvYmplY3RzIGNvbnRhaW5pbmc6XG4gICAgICAgIC8vICAqIG1ldGFkYXRhIChuYW1lLCBkZXNjcmlwdGlvbilcbiAgICAgICAgLy8gICogdGhlIGluaXRpYWwgc2V0IG9mIGRhdGEgdGhhdCBkZWZpbmVzIHRoZSBkZWZhdWx0IHN0YXRlIG9mIGFcbiAgICAgICAgLy8gICAgbmV3bHkgaW5zdGFuY2lhdGVkIGNvbXBvbmVudFxuICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSB7fTtcblxuICAgICAgICAvLyBBIGRpY3Rpb25hcnkgb2YgYXNzZW1ibGFnZXMsIHdoZXJlIGtleXMgYXJlIHRoZSBuYW1lIG9mIGVhY2hcbiAgICAgICAgLy8gYXNzZW1ibGFnZS4gQXNzZW1ibGFnZXMgYXJlIG9iamVjdHMgY29udGFpbmluZzpcbiAgICAgICAgLy8gICogbWV0YWRhdGEgKG5hbWUsIGRlc2NyaXB0aW9uKVxuICAgICAgICAvLyAgKiBhIGxpc3Qgb2YgY29tcG9uZW50cyB0byBhZGQgdG8gdGhlIGVudGl0eVxuICAgICAgICAvLyAgKiBhbiBpbml0aWFsIHN0YXRlIGZvciBzb21lIGNvbXBvbmVudHMsIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0c1xuICAgICAgICB0aGlzLmFzc2VtYmxhZ2VzID0ge307XG5cbiAgICAgICAgLyohXG4gICAgICAgICAqIEEgcmVsYXRpb25hbC1saWtlIGxpc3Qgb2YgZW50aXR5IHN0YXRlcy4gVGhlcmUgaXMgb25lIGxpbmUgZm9yXG4gICAgICAgICAqIGVhY2ggZW50aXR5IC0gY29tcG9uZW50IGFzc29jaWF0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBUbyBvcHRpbWl6ZSB0aGUgYWNjZXNzIHRpbWUgdG8gdGhpcyBkYXRhLCBpdCBpcyBzdG9yZWQgaW4gYVxuICAgICAgICAgKiBkaWN0aW9uYXJ5IG9mIGRpY3Rpb25hcmllcyBvZiB0aGlzIGZvcm06XG4gICAgICAgICAqIHtcbiAgICAgICAgICogICBcImNvbXBvbmVudElkXCI6IHtcbiAgICAgICAgICogICAgIFwiZW50aXR5SWRcIjoge1xuICAgICAgICAgKiAgICAgICAuLi5cbiAgICAgICAgICogICAgICAgaGVyZSBjb21lcyB0aGUgc3RhdGUgb2YgdGhpcyBlbnRpdHkgZm9yIHRoaXMgY29tcG9uZW50XG4gICAgICAgICAqICAgICAgIC4uLlxuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKiAgIH1cbiAgICAgICAgICogfVxuICAgICAgICAgKlxuICAgICAgICAgKiBUaGlzIHdheSwgZ2V0dGluZyB0aGUgZGF0YSBvZiBvbmUgZW50aXR5IGZvciBvbmUgY29tcG9uZW50IGlzOlxuICAgICAgICAgKiAgIHRoaXMuZW50aXR5Q29tcG9uZW50RGF0YVtjb21wb25lbnRJZF1bZW50aXR5SWRdXG4gICAgICAgICAqIGFuZCBnZXR0aW5nIGFsbCBlbnRpdGllcyBmb3Igb25lIGNvbXBvbmVudCBpczpcbiAgICAgICAgICogICB0aGlzLmVudGl0eUNvbXBvbmVudERhdGFbY29tcG9uZW50SWRdXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmVudGl0eUNvbXBvbmVudERhdGEgPSB7fTtcblxuICAgICAgICAvLyBUaGUgb3JkZXJlZCBsaXN0IG9mIHByb2Nlc3NvcnMga25vd24gYnkgdGhpcyBtYW5hZ2VyLlxuICAgICAgICB0aGlzLnByb2Nlc3NvcnMgPSBbXTtcblxuICAgICAgICAvLyBUaGUgbmV4dCB1bmlxdWUgaWRlbnRpZmllci5cbiAgICAgICAgdGhpcy51aWQgPSAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhbiBpZGVudGlmaWVyIHVuaXF1ZSB0byB0aGlzIHN5c3RlbS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge2ludH0gLSBVbmlxdWUgaWRlbnRpZmllci5cbiAgICAgKi9cbiAgICBnZXRVaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVpZCsrO1xuICAgIH1cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIEVOVElUSUVTXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgZW50aXR5IGluIHRoZSBzeXN0ZW0gYnkgY3JlYXRpbmcgYSBuZXcgaW5zdGFuY2Ugb2YgZWFjaCBvZlxuICAgICAqIGl0cyBjb21wb25lbnRzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHthcnJheX0gY29tcG9uZW50SWRzIC0gTGlzdCBvZiBpZGVudGlmaWVycyBvZiB0aGUgY29tcG9uZW50cyB0aGF0IGNvbXBvc2UgdGhlIG5ldyBlbnRpdHkuXG4gICAgICogQHJldHVybiB7aW50fSAtIFVuaXF1ZSBpZGVudGlmaWVyIG9mIHRoZSBuZXcgZW50aXR5LlxuICAgICAqL1xuICAgIGNyZWF0ZUVudGl0eShjb21wb25lbnRJZHMpIHtcbiAgICAgICAgdmFyIGlkID0gdGhpcy5nZXRVaWQoKTtcbiAgICAgICAgdGhpcy5hZGRDb21wb25lbnRzVG9FbnRpdHkoY29tcG9uZW50SWRzLCBpZCk7XG4gICAgICAgIHRoaXMuZW50aXRpZXMucHVzaChpZCk7XG4gICAgICAgIHJldHVybiBpZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYW4gZW50aXR5IGFuZCBpdHMgaW5zdGFuY2lhdGVkIGNvbXBvbmVudHMgZnJvbSB0aGUgc3lzdGVtLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtpbnR9IGlkIC0gVW5pcXVlIGlkZW50aWZpZXIgb2YgdGhlIGVudGl0eS5cbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IC0gdGhpc1xuICAgICAqL1xuICAgIHJlbW92ZUVudGl0eShpZCkge1xuICAgICAgICAvLyBSZW1vdmUgYWxsIGRhdGEgZm9yIHRoaXMgZW50aXR5LlxuICAgICAgICBmb3IgKHZhciBjb21wIGluIHRoaXMuZW50aXR5Q29tcG9uZW50RGF0YSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZW50aXR5Q29tcG9uZW50RGF0YS5oYXNPd25Qcm9wZXJ0eShjb21wKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVudGl0eUNvbXBvbmVudERhdGFbY29tcF1baWRdKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmVudGl0eUNvbXBvbmVudERhdGFbY29tcF1baWRdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlbW92ZSB0aGUgZW50aXR5IGZyb20gdGhlIGxpc3Qgb2Yga25vd24gZW50aXRpZXMuXG4gICAgICAgIHRoaXMuZW50aXRpZXMuc3BsaWNlKHRoaXMuZW50aXRpZXMuaW5kZXhPZihpZCksIDEpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIENPTVBPTkVOVFNcblxuICAgIC8qKlxuICAgICAqIEFkZCBhIGNvbXBvbmVudCB0byB0aGUgbGlzdCBvZiBrbm93biBjb21wb25lbnRzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gVW5pcXVlIGlkZW50aWZpZXIgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gY29tcG9uZW50IC0gT2JqZWN0IGNvbnRhaW5pbmcgdGhlIG1ldGFkYXRhIGFuZCBkYXRhIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQHJldHVybiB7b2JqZWN0fSAtIHRoaXNcbiAgICAgKi9cbiAgICBhZGRDb21wb25lbnQoaWQsIGNvbXBvbmVudCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudHNbaWRdID0gY29tcG9uZW50O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYSBjb21wb25lbnQgZnJvbSB0aGUgbGlzdCBvZiBrbm93biBjb21wb25lbnRzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gVW5pcXVlIGlkZW50aWZpZXIgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IC0gdGhpc1xuICAgICAqL1xuICAgIHJlbW92ZUNvbXBvbmVudChpZCkge1xuICAgICAgICBkZWxldGUgdGhpcy5jb21wb25lbnRzW2lkXTtcbiAgICAgICAgZGVsZXRlIHRoaXMuZW50aXR5Q29tcG9uZW50RGF0YVtpZF07XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbGlzdCBvZiBjb21wb25lbnRzIHRoaXMgaW5zdGFuY2Uga25vd3MuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHthcnJheX0gLSBMaXN0IG9mIG5hbWVzIG9mIGNvbXBvbmVudHMuXG4gICAgICovXG4gICAgZ2V0Q29tcG9uZW50c0xpc3QoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmNvbXBvbmVudHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBlYWNoIGxpc3RlZCBjb21wb25lbnQgYW5kIGFzc29jaWF0ZSB0aGVtXG4gICAgICogd2l0aCB0aGUgZW50aXR5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHthcnJheX0gY29tcG9uZW50SWRzIC0gTGlzdCBvZiBpZGVudGlmaWVycyBvZiB0aGUgY29tcG9uZW50cyB0byBhZGQgdG8gdGhlIGVudGl0eS5cbiAgICAgKiBAcGFyYW0ge2ludH0gZW50aXR5SWQgLSBVbmlxdWUgaWRlbnRpZmllciBvZiB0aGUgZW50aXR5LlxuICAgICAqIEByZXR1cm4ge29iamVjdH0gLSB0aGlzXG4gICAgICovXG4gICAgYWRkQ29tcG9uZW50c1RvRW50aXR5KGNvbXBvbmVudElkcywgZW50aXR5SWQpIHtcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIHZhciBjb21wO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgLy8gRmlyc3QgdmVyaWZ5IHRoYXQgYWxsIHRoZSBjb21wb25lbnRzIGV4aXN0LCBhbmQgdGhyb3cgYW4gZXJyb3JcbiAgICAgICAgLy8gaWYgYW55IGlzIHVua25vd24uXG4gICAgICAgIGZvciAoaSA9IGNvbXBvbmVudElkcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgY29tcCA9IGNvbXBvbmVudElkc1tpXTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmNvbXBvbmVudHNbY29tcF0pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyeWluZyB0byB1c2UgdW5rbm93biBjb21wb25lbnQ6ICcgKyBjb21wKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE5vdyB3ZSBrbm93IHRoYXQgdGhpcyByZXF1ZXN0IGlzIGNvcnJlY3QsIGxldCdzIGNyZWF0ZSB0aGUgbmV3XG4gICAgICAgIC8vIGVudGl0eSBhbmQgaW5zdGFuY2lhdGUgdGhlIGNvbXBvbmVudCdzIHN0YXRlcy5cbiAgICAgICAgZm9yIChpID0gY29tcG9uZW50SWRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBjb21wID0gY29tcG9uZW50SWRzW2ldO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuZW50aXR5Q29tcG9uZW50RGF0YVtjb21wXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW50aXR5Q29tcG9uZW50RGF0YVtjb21wXSA9IHt9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbmV3Q29tcFN0YXRlID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gSWYgdGhlIG1hbmFnZXIgaGFzIGEgbGlzdGVuZXIsIHdlIHdhbnQgdG8gY3JlYXRlIGdldHRlcnNcbiAgICAgICAgICAgIC8vIGFuZCBzZXR0ZXJzIHNvIHRoYXQgd2UgY2FuIGVtaXQgc3RhdGUgY2hhbmdlcy4gQnV0IGlmIGl0IGRvZXNcbiAgICAgICAgICAgIC8vIG5vdCBoYXZlIG9uZSwgdGhlcmUgaXMgbm8gbmVlZCB0byBhZGQgdGhlIG92ZXJoZWFkLlxuICAgICAgICAgICAgaWYgKHNlbGYubGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICBuZXdDb21wU3RhdGUgPSB7fTtcbiAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKG5ld0NvbXBTdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdGUgPSBjbG9uZShzZWxmLmNvbXBvbmVudHNbY29tcF0uc3RhdGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhIHNldHRlciBmb3IgZWFjaCBzdGF0ZSBhdHRyaWJ1dGUsIHNvIHdlIGNhbiBlbWl0IGFuXG4gICAgICAgICAgICAgICAgICAgIC8vIGV2ZW50IHdoZW5ldmVyIHRoZSBzdGF0ZSBvZiB0aGlzIGNvbXBvbmVudCBjaGFuZ2VzLlxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5ld0NvbXBTdGF0ZSwgcHJvcGVydHksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZVtwcm9wZXJ0eV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVbcHJvcGVydHldID0gdmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubGlzdGVuZXIuZW1pdCgnZW50aXR5Q29tcG9uZW50VXBkYXRlZCcsIGVudGl0eUlkLCBjb21wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKHByb3BlcnR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pKG5ld0NvbXBTdGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdDb21wU3RhdGUgPSBjbG9uZShzZWxmLmNvbXBvbmVudHNbY29tcF0uc3RhdGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBTdG9yZSB0aGUgZW50aXR5J3MgSUQgc28gaXQncyBlYXNpZXIgdG8gZmluZCBvdGhlciBjb21wb25lbnRzIGZvciB0aGF0IGVudGl0eS5cbiAgICAgICAgICAgIG5ld0NvbXBTdGF0ZS5fX2lkID0gZW50aXR5SWQ7XG5cbiAgICAgICAgICAgIHRoaXMuZW50aXR5Q29tcG9uZW50RGF0YVtjb21wXVtlbnRpdHlJZF0gPSBuZXdDb21wU3RhdGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZS1hc3NvY2lhdGUgYSBsaXN0IG9mIGNvbXBvbmVudHMgZnJvbSB0aGUgZW50aXR5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHthcnJheX0gY29tcG9uZW50SWRzIC0gTGlzdCBvZiBpZGVudGlmaWVycyBvZiB0aGUgY29tcG9uZW50cyB0byByZW1vdmUgZnJvbSB0aGUgZW50aXR5LlxuICAgICAqIEBwYXJhbSB7aW50fSBlbnRpdHlJZCAtIFVuaXF1ZSBpZGVudGlmaWVyIG9mIHRoZSBlbnRpdHkuXG4gICAgICogQHJldHVybiB7b2JqZWN0fSAtIHRoaXNcbiAgICAgKi9cbiAgICByZW1vdmVDb21wb25lbnRzRnJvbUVudGl0eShjb21wb25lbnRJZHMsIGVudGl0eUlkKSB7XG4gICAgICAgIHZhciBpO1xuICAgICAgICB2YXIgY29tcDtcblxuICAgICAgICAvLyBGaXJzdCB2ZXJpZnkgdGhhdCBhbGwgdGhlIGNvbXBvbmVudHMgZXhpc3QsIGFuZCB0aHJvdyBhbiBlcnJvclxuICAgICAgICAvLyBpZiBhbnkgaXMgdW5rbm93bi5cbiAgICAgICAgZm9yIChpID0gY29tcG9uZW50SWRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBjb21wID0gY29tcG9uZW50SWRzW2ldO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuY29tcG9uZW50c1tjb21wXSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVHJ5aW5nIHRvIHVzZSB1bmtub3duIGNvbXBvbmVudDogJyArIGNvbXApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gTm93IHdlIGtub3cgdGhhdCB0aGlzIHJlcXVlc3QgaXMgY29ycmVjdCwgbGV0J3MgY3JlYXRlIHRoZSBuZXdcbiAgICAgICAgLy8gZW50aXR5IGFuZCBpbnN0YW5jaWF0ZSB0aGUgY29tcG9uZW50J3Mgc3RhdGVzLlxuICAgICAgICBmb3IgKGkgPSBjb21wb25lbnRJZHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGNvbXAgPSBjb21wb25lbnRJZHNbaV07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmVudGl0eUNvbXBvbmVudERhdGFbY29tcF0pIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lbnRpdHlDb21wb25lbnREYXRhW2NvbXBdW2VudGl0eUlkXSkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5lbnRpdHlDb21wb25lbnREYXRhW2NvbXBdW2VudGl0eUlkXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIHJlZmVyZW5jZSB0byBhbiBvYmplY3QgdGhhdCBjb250YWlucyB0aGUgZGF0YSBvZiBhblxuICAgICAqIGluc3RhbmNpYXRlZCBjb21wb25lbnQgb2YgYW4gZW50aXR5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtpbnR9IGVudGl0eUlkIC0gVW5pcXVlIGlkZW50aWZpZXIgb2YgdGhlIGVudGl0eS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50SWQgLSBVbmlxdWUgaWRlbnRpZmllciBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEByZXR1cm4ge29iamVjdH0gLSBDb21wb25lbnQgZGF0YSBvZiBvbmUgZW50aXR5LlxuICAgICAqL1xuICAgIGdldENvbXBvbmVudERhdGFGb3JFbnRpdHkoY29tcG9uZW50SWQsIGVudGl0eUlkKSB7XG4gICAgICAgIGlmICghKGNvbXBvbmVudElkIGluIHRoaXMuY29tcG9uZW50cykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVHJ5aW5nIHRvIHVzZSB1bmtub3duIGNvbXBvbmVudDogJyArIGNvbXBvbmVudElkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICF0aGlzLmVudGl0eUNvbXBvbmVudERhdGEuaGFzT3duUHJvcGVydHkoY29tcG9uZW50SWQpIHx8XG4gICAgICAgICAgICAhdGhpcy5lbnRpdHlDb21wb25lbnREYXRhW2NvbXBvbmVudElkXS5oYXNPd25Qcm9wZXJ0eShlbnRpdHlJZClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGRhdGEgZm9yIGNvbXBvbmVudCAnICsgY29tcG9uZW50SWQgKyAnIGFuZCBlbnRpdHkgJyArIGVudGl0eUlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmVudGl0eUNvbXBvbmVudERhdGFbY29tcG9uZW50SWRdW2VudGl0eUlkXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIHN0YXRlIG9mIGEgY29tcG9uZW50LCBtYW55IGtleXMgYXQgb25jZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7aW50fSBlbnRpdHlJZCAtIFVuaXF1ZSBpZGVudGlmaWVyIG9mIHRoZSBlbnRpdHkuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudElkIC0gVW5pcXVlIGlkZW50aWZpZXIgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbmV3U3RhdGUgLSBPYmplY3QgY29udGFpbmluZyB0aGUgbmV3IHN0YXRlIHRvIGFwcGx5LlxuICAgICAqIEByZXR1cm4ge29iamVjdH0gLSB0aGlzXG4gICAgICovXG4gICAgdXBkYXRlQ29tcG9uZW50RGF0YUZvckVudGl0eShjb21wb25lbnRJZCwgZW50aXR5SWQsIG5ld1N0YXRlKSB7XG4gICAgICAgIHZhciBjb21wU3RhdGUgPSB0aGlzLmdldENvbXBvbmVudERhdGFGb3JFbnRpdHkoY29tcG9uZW50SWQsIGVudGl0eUlkKTtcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gbmV3U3RhdGUpIHtcbiAgICAgICAgICAgIGlmIChuZXdTdGF0ZS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGNvbXBTdGF0ZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgY29tcFN0YXRlW2tleV0gPSBuZXdTdGF0ZVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgbGlzdCBvZiBvYmplY3RzIGNvbnRhaW5pbmcgdGhlIGRhdGEgb2YgYWxsIG9mIGEgZ2l2ZW4gY29tcG9uZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudElkIC0gVW5pcXVlIGlkZW50aWZpZXIgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAcmV0dXJuIHthcnJheX0gLSBMaXN0IG9mIGNvbXBvbmVudCBkYXRhIGZvciBvbmUgY29tcG9uZW50LlxuICAgICAqL1xuICAgIGdldENvbXBvbmVudHNEYXRhKGNvbXBvbmVudElkKSB7XG4gICAgICAgIGlmICghKGNvbXBvbmVudElkIGluIHRoaXMuY29tcG9uZW50cykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVHJ5aW5nIHRvIHVzZSB1bmtub3duIGNvbXBvbmVudDogJyArIGNvbXBvbmVudElkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5lbnRpdHlDb21wb25lbnREYXRhLmhhc093blByb3BlcnR5KGNvbXBvbmVudElkKSkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZW50aXR5Q29tcG9uZW50RGF0YVtjb21wb25lbnRJZF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRydWUgaWYgdGhlIGVudGl0eSBoYXMgdGhlIGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7aW50fSBlbnRpdHlJZCAtIFVuaXF1ZSBpZGVudGlmaWVyIG9mIHRoZSBlbnRpdHkuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudElkIC0gVW5pcXVlIGlkZW50aWZpZXIgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSAtIFRydWUgaWYgdGhlIGVudGl0eSBoYXMgdGhlIGNvbXBvbmVudC5cbiAgICAgKi9cbiAgICBlbnRpdHlIYXNDb21wb25lbnQoZW50aXR5SWQsIGNvbXBvbmVudElkKSB7XG4gICAgICAgIGlmICghKGNvbXBvbmVudElkIGluIHRoaXMuY29tcG9uZW50cykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0aGlzLmVudGl0eUNvbXBvbmVudERhdGEuaGFzT3duUHJvcGVydHkoY29tcG9uZW50SWQpICYmXG4gICAgICAgICAgICB0aGlzLmVudGl0eUNvbXBvbmVudERhdGFbY29tcG9uZW50SWRdLmhhc093blByb3BlcnR5KGVudGl0eUlkKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIEFTU0VNQkxBR0VTXG5cbiAgICAvKipcbiAgICAgKiBBZGQgYW4gYXNzZW1ibGFnZSB0byB0aGUgbGlzdCBvZiBrbm93biBhc3NlbWJsYWdlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIFVuaXF1ZSBpZGVudGlmaWVyIG9mIHRoZSBhc3NlbWJsYWdlLlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBhc3NlbWJsYWdlIC0gQW4gaW5zdGFuY2Ugb2YgYW4gYXNzZW1ibGFnZSB0byBhZGQuXG4gICAgICogQHJldHVybiB7b2JqZWN0fSAtIHRoaXNcbiAgICAgKi9cbiAgICBhZGRBc3NlbWJsYWdlKGlkLCBhc3NlbWJsYWdlKSB7XG4gICAgICAgIHRoaXMuYXNzZW1ibGFnZXNbaWRdID0gYXNzZW1ibGFnZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFuIGFzc2VtYmxhZ2UgZnJvbSB0aGUgbGlzdCBvZiBrbm93biBhc3NlbWJsYWdlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIFVuaXF1ZSBpZGVudGlmaWVyIG9mIHRoZSBhc3NlbWJsYWdlLlxuICAgICAqIEByZXR1cm4ge29iamVjdH0gLSB0aGlzXG4gICAgICovXG4gICAgcmVtb3ZlQXNzZW1ibGFnZShpZCkge1xuICAgICAgICBkZWxldGUgdGhpcy5hc3NlbWJsYWdlc1tpZF07XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBlbnRpdHkgaW4gdGhlIHN5c3RlbSBieSBjcmVhdGluZyBhIG5ldyBpbnN0YW5jZSBvZiBlYWNoIG9mXG4gICAgICogaXRzIGNvbXBvbmVudHMgYW5kIHNldHRpbmcgdGhlaXIgaW5pdGlhbCBzdGF0ZSwgdXNpbmcgYW4gYXNzZW1ibGFnZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhc3NlbWJsYWdlSWQgLSBJZCBvZiB0aGUgYXNzZW1ibGFnZSB0byBjcmVhdGUgdGhlIGVudGl0eSBmcm9tLlxuICAgICAqIEByZXR1cm4ge2ludH0gLSBVbmlxdWUgaWRlbnRpZmllciBvZiB0aGUgbmV3IGVudGl0eS5cbiAgICAgKi9cbiAgICBjcmVhdGVFbnRpdHlGcm9tQXNzZW1ibGFnZShhc3NlbWJsYWdlSWQpIHtcbiAgICAgICAgaWYgKCEoYXNzZW1ibGFnZUlkIGluIHRoaXMuYXNzZW1ibGFnZXMpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyeWluZyB0byB1c2UgdW5rbm93biBhc3NlbWJsYWdlOiAnICsgYXNzZW1ibGFnZUlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhc3NlbWJsYWdlID0gdGhpcy5hc3NlbWJsYWdlc1thc3NlbWJsYWdlSWRdO1xuICAgICAgICB2YXIgZW50aXR5ID0gdGhpcy5jcmVhdGVFbnRpdHkoYXNzZW1ibGFnZS5jb21wb25lbnRzKTtcblxuICAgICAgICBmb3IgKHZhciBjb21wIGluIGFzc2VtYmxhZ2UuaW5pdGlhbFN0YXRlKSB7XG4gICAgICAgICAgICBpZiAoYXNzZW1ibGFnZS5pbml0aWFsU3RhdGUuaGFzT3duUHJvcGVydHkoY29tcCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3U3RhdGUgPSBhc3NlbWJsYWdlLmluaXRpYWxTdGF0ZVtjb21wXTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudERhdGFGb3JFbnRpdHkoY29tcCwgZW50aXR5LCBuZXdTdGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZW50aXR5O1xuICAgIH1cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIFBST0NFU1NPUlNcblxuICAgIC8qKlxuICAgICAqIEFkZCBhIHByb2Nlc3NvciB0byB0aGUgbGlzdCBvZiBrbm93biBwcm9jZXNzb3JzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHByb2Nlc3NvciAtIEFuIGluc3RhbmNlIG9mIGEgcHJvY2Vzc29yIHRvIG1hbmFnZS5cbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IC0gdGhpc1xuICAgICAqL1xuICAgIGFkZFByb2Nlc3Nvcihwcm9jZXNzb3IpIHtcbiAgICAgICAgdGhpcy5wcm9jZXNzb3JzLnB1c2gocHJvY2Vzc29yKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGEgcHJvY2Vzc29yIGZyb20gdGhlIGxpc3Qgb2Yga25vd24gcHJvY2Vzc29ycy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9jZXNzb3IgLSBBbiBpbnN0YW5jZSBvZiBhIHByb2Nlc3NvciB0byByZW1vdmUuXG4gICAgICogQHJldHVybiB7b2JqZWN0fSAtIHRoaXNcbiAgICAgKi9cbiAgICByZW1vdmVQcm9jZXNzb3IocHJvY2Vzc29yKSB7XG4gICAgICAgIHRoaXMucHJvY2Vzc29ycy5zcGxpY2UodGhpcy5wcm9jZXNzb3JzLmluZGV4T2YocHJvY2Vzc29yKSwgMSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBhbGwgdGhlIGtub3duIHByb2Nlc3NvcnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2ludH0gZHQgLSBUaGUgdGltZSBkZWx0YSBzaW5jZSB0aGUgbGFzdCBjYWxsIHRvIHVwZGF0ZS4gV2lsbCBiZSBwYXNzZWQgYXMgYW4gYXJndW1lbnQgdG8gYWxsIHByb2Nlc3NvcidzIGB1cGRhdGVgIG1ldGhvZC5cbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IC0gdGhpc1xuICAgICAqL1xuICAgIHVwZGF0ZShkdCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucHJvY2Vzc29ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzb3JzW2ldLnVwZGF0ZShkdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFbnRpdHlNYW5hZ2VyO1xuIl0sIm5hbWVzIjpbImNsb25lIiwib2JqIiwiY29weSIsIkRhdGUiLCJzZXRUaW1lIiwiZ2V0VGltZSIsIkFycmF5IiwiaSIsImxlbiIsImxlbmd0aCIsIk9iamVjdCIsImF0dHIiLCJoYXNPd25Qcm9wZXJ0eSIsImlzRnVuY3Rpb24iLCJ0aGluZ1RvQ2hlY2siLCJ0b1N0cmluZyIsImNhbGwiLCJFbnRpdHlNYW5hZ2VyIiwibGlzdGVuZXIiLCJlbWl0IiwiZW50aXRpZXMiLCJjb21wb25lbnRzIiwiYXNzZW1ibGFnZXMiLCJlbnRpdHlDb21wb25lbnREYXRhIiwicHJvY2Vzc29ycyIsInVpZCIsInRoaXMiLCJjb21wb25lbnRJZHMiLCJpZCIsImdldFVpZCIsImFkZENvbXBvbmVudHNUb0VudGl0eSIsInB1c2giLCJjb21wIiwic3BsaWNlIiwiaW5kZXhPZiIsImNvbXBvbmVudCIsImtleXMiLCJlbnRpdHlJZCIsInNlbGYiLCJFcnJvciIsIm5ld0NvbXBTdGF0ZSIsInN0YXRlIiwicHJvcGVydHkiLCJkZWZpbmVQcm9wZXJ0eSIsInZhbCIsIl9faWQiLCJjb21wb25lbnRJZCIsIm5ld1N0YXRlIiwiY29tcFN0YXRlIiwiZ2V0Q29tcG9uZW50RGF0YUZvckVudGl0eSIsImtleSIsImFzc2VtYmxhZ2UiLCJhc3NlbWJsYWdlSWQiLCJlbnRpdHkiLCJjcmVhdGVFbnRpdHkiLCJpbml0aWFsU3RhdGUiLCJ1cGRhdGVDb21wb25lbnREYXRhRm9yRW50aXR5IiwicHJvY2Vzc29yIiwiZHQiLCJ1cGRhdGUiXSwibWFwcGluZ3MiOiIrS0FlQSxTQUFTQSxHQUFNQyxNQUVQLE1BQVFBLEdBQU8sOEJBQW1CQSxpQkFBQUEsSUFBSyxNQUFPQSxNQUU5Q0MsTUFHQUQsWUFBZUUsZUFDUixHQUFJQSxRQUNOQyxRQUFRSCxFQUFJSSxXQUNWSCxLQUlQRCxZQUFlSyxPQUFPLFVBRWpCLEdBQUlDLEdBQUksRUFBR0MsRUFBTVAsRUFBSVEsT0FBUUYsRUFBSUMsRUFBS0QsTUFDbENBLEdBQUtQLEVBQU1DLEVBQUlNLFVBRWpCTCxNQUlQRCxZQUFlUyxRQUFRLFVBRWxCLEdBQUlDLEtBQVFWLEdBQ1RBLEVBQUlXLGVBQWVELEtBQU9ULEVBQUtTLEdBQVFYLEVBQU1DLEVBQUlVLFdBRWxEVCxJQVFmLFFBQVNXLEdBQVdDLFNBQ1RBLElBQXFELHlCQUFoQ0MsU0FBU0MsS0FBS0YsNGpEQVN4Q0csd0JBQ1VDLGtCQUNIQSxTQUFXLEtBQ1pBLEdBQVlMLEVBQVdLLEVB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


/***/ },
/* 2 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];
	
	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _events = __webpack_require__(2);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _actions = __webpack_require__(4);
	
	var _actions2 = _interopRequireDefault(_actions);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Engine = function (_EventEmitter) {
	    _inherits(Engine, _EventEmitter);
	
	    function Engine(emitter, network, manager, modules) {
	        _classCallCheck(this, Engine);
	
	        var _this = _possibleConstructorReturn(this, (Engine.__proto__ || Object.getPrototypeOf(Engine)).call(this));
	
	        _this.emitter = emitter;
	        _this.manager = manager;
	        _this.network = network;
	        _this._available_modules = modules;
	
	        _this._modules = [];
	        _this._components = [];
	        _this._processors = [];
	        _this._actions = [];
	
	        _this.games = [];
	
	        _this._setEventListeners();
	        return _this;
	    }
	
	    _createClass(Engine, [{
	        key: '_setEventListeners',
	        value: function _setEventListeners() {
	            var _this2 = this;
	
	            this.emitter.on('connection', function () {
	                _this2.network.emit('request', { type: 'modules' });
	                _this2.network.emit('request', { type: 'games' });
	            });
	
	            this.emitter.on('data', function (data) {
	                console.log('received data');
	                console.log(data);
	                switch (data.type) {
	                    case 'modules':
	                        console.log('Modules list received');
	                        _this2.loadModules(data.data);
	                        _this2.emitter.emit('ready');
	                        break;
	                    case 'games':
	                        console.log('Games list received');
	                        _this2.games = data.data;
	                        break;
	                }
	            });
	
	            this.emitter.on('gameJoined', function (data) {
	                console.log('Game joined!');
	            });
	        }
	    }, {
	        key: 'loadModules',
	        value: function loadModules(modules) {
	            var _this3 = this;
	
	            var actions = {};
	
	            console.log('Loading modules...');
	            console.log(modules);
	            modules.forEach(function (name) {
	                var module = _this3._available_modules[name];
	                _this3._modules.push(name);
	
	                console.log(module);
	
	                module.components.forEach(function (comp) {
	                    return _this3.manager.addComponent(comp.name, comp);
	                });
	                actions[name] = module.actions;
	            });
	
	            this.emitter.actions = (0, _actions2.default)(this.network, actions);
	        }
	    }]);
	
	    return Engine;
	}(_events2.default);
	
	exports.default = Engine;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function createActions(network, modulesActions) {
	    function action(data) {
	        network.emit('action', data);
	    }
	
	    var actions = {};
	
	    Object.keys(modulesActions).forEach(function (namespace) {
	        actions[namespace] = {};
	        Object.keys(modulesActions[namespace]).forEach(function (actionName) {
	            actions[namespace][actionName] = function () {
	                action({
	                    type: namespace + '.' + actionName,
	                    params: [].concat(Array.prototype.slice.call(arguments))
	                });
	            };
	        });
	    });
	
	    actions.core = {
	        createGame: function createGame() {
	            action({
	                type: 'core.createGame',
	                params: []
	            });
	        },
	        joinGame: function joinGame(gameId) {
	            action({
	                type: 'core.joinGame',
	                params: [gameId]
	            });
	        }
	    };
	
	    return actions;
	}
	
	exports.default = createActions;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Network = function () {
	    function Network(listener) {
	        _classCallCheck(this, Network);
	
	        this.listener = listener;
	
	        var socket = io();
	
	        socket.on('connect_failed', function () {
	            console.log('ERROR - Connection to the server failed');
	        });
	        socket.on('connect', this.onConnect.bind(this));
	        socket.on('disconnect', this.onDisconnect.bind(this));
	
	        socket.on('data', this.onData.bind(this));
	        socket.on('gameJoined', this.onGameJoined.bind(this));
	
	        this._socket = socket;
	    }
	
	    _createClass(Network, [{
	        key: 'emit',
	        value: function emit(type, data) {
	            data = JSON.stringify(data);
	            this._socket.emit(type, data);
	        }
	    }, {
	        key: 'onConnect',
	        value: function onConnect() {
	            console.log('Connected to the server');
	            this.listener.emit('connection');
	        }
	    }, {
	        key: 'onData',
	        value: function onData(data) {
	            console.log('Received data');
	            this.listener.emit('data', JSON.parse(data));
	        }
	    }, {
	        key: 'onGameJoined',
	        value: function onGameJoined(data) {
	            console.log('Received gameJoined');
	            this.listener.emit('gameJoined', JSON.parse(data));
	        }
	    }, {
	        key: 'onDisconnect',
	        value: function onDisconnect() {
	            console.log('Disconnected from the server');
	            this.listener.emit('disconnection');
	        }
	    }]);
	
	    return Network;
	}();
	
	exports.default = Network;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=fightly.js.map