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
	
	var _actions = __webpack_require__(3);
	
	var _actions2 = _interopRequireDefault(_actions);
	
	var _engine = __webpack_require__(4);
	
	var _engine2 = _interopRequireDefault(_engine);
	
	var _network = __webpack_require__(5);
	
	var _network2 = _interopRequireDefault(_network);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createApplication() {
	    var emitter = new _events2.default();
	    var network = new _network2.default(emitter);
	    var engine = new _engine2.default(emitter, network);
	    var manager = new _ensy2.default();
	    var actions = (0, _actions2.default)(network);
	
	    emitter.manager = manager;
	    emitter.network = network;
	    emitter.actions = actions;
	
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

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * ensy - Entity System JavaScript Library v1.2.0
	 *
	 * A JavaScript implementation of the Entity System model as described by
	 * Adam Martin in http://t-machine.org/index.php/2009/10/26/entity-systems-are-the-future-of-mmos-part-5/
	 *
	 * @author Adrian Gaudebert - adrian@gaudebert.fr
	 * @license MIT license.
	 *
	 */
	
	// for compatibility with node.js and require.js
	if (false) {
	    var define = require('amdefine')(module)
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	
	    /*!
	     * Return a clone of an object.
	     * From https://stackoverflow.com/questions/728360
	     */
	    function clone(obj) {
	        // Handle the 3 simple types, and null or undefined
	        if (null == obj || "object" != typeof obj) return obj;
	
	        // Handle Date
	        if (obj instanceof Date) {
	            var copy = new Date();
	            copy.setTime(obj.getTime());
	            return copy;
	        }
	
	        // Handle Array
	        if (obj instanceof Array) {
	            var copy = [];
	            for (var i = 0, len = obj.length; i < len; i++) {
	                copy[i] = clone(obj[i]);
	            }
	            return copy;
	        }
	
	        // Handle Object
	        if (obj instanceof Object) {
	            var copy = {};
	            for (var attr in obj) {
	                if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
	            }
	            return copy;
	        }
	    }
	
	    /*!
	     * Return true if the parameter is a function.
	     * From https://stackoverflow.com/questions/5999998
	     */
	    function isFunction(thingToCheck) {
	        return thingToCheck && ({}).toString.call(thingToCheck) === '[object Function]';
	    }
	
	    /**
	     * @class EntityManager
	     *
	     * Implement the Entity System model and provide tools to easily
	     * create and manipulate Entities, Components and Processors.
	     */
	    var EntityManager = function (listener) {
	        this.listener = null;
	        if (listener && isFunction(listener.emit)) {
	            this.listener = listener;
	        }
	
	        // A list of entity IDs, each being a simple integer.
	        this.entities = [];
	
	        // A dictionary of components, where keys are the name of each
	        // component. Components are objects containing:
	        //  * metadata (name, description)
	        //  * the initial set of data that defines the default state of a
	        //    newly instanciated component
	        this.components = {};
	
	        // A dictionary of assemblages, where keys are the name of each
	        // assemblage. Assemblages are objects containing:
	        //  * metadata (name, description)
	        //  * a list of components to add to the entity
	        //  * an initial state for some components, to override the defaults
	        this.assemblages = {};
	
	        /*!
	         * A relational-like list of entity states. There is one line for
	         * each entity - component association.
	         *
	         * To optimize the access time to this data, it is stored in a
	         * dictionary of dictionaries of this form:
	         * {
	         *   "componentId": {
	         *     "entityId": {
	         *       ...
	         *       here comes the state of this entity for this component
	         *       ...
	         *     }
	         *   }
	         * }
	         *
	         * This way, getting the data of one entity for one component is:
	         *   this.entityComponentData[componentId][entityId]
	         * and getting all entities for one component is:
	         *   this.entityComponentData[componentId]
	         */
	        this.entityComponentData = {};
	
	        // The ordered list of processors known by this manager.
	        this.processors = [];
	
	        // The next unique identifier.
	        this.uid = 0;
	    };
	
	    /**
	     * Return an identifier unique to this system.
	     *
	     * @return {int} - Unique identifier.
	     */
	    EntityManager.prototype.getUid = function () {
	        return this.uid++;
	    };
	
	    //=========================================================================
	    // ENTITIES
	
	    /**
	     * Create a new entity in the system by creating a new instance of each of
	     * its components.
	     *
	     * @param {array} componentIds - List of identifiers of the components that compose the new entity.
	     * @return {int} - Unique identifier of the new entity.
	     */
	    EntityManager.prototype.createEntity = function (componentIds) {
	        var id = this.getUid();
	        this.addComponentsToEntity(componentIds, id);
	        this.entities.push(id);
	        return id;
	    };
	
	    /**
	     * Remove an entity and its instanciated components from the system.
	     *
	     * @param {int} id - Unique identifier of the entity.
	     * @return {object} - this
	     */
	    EntityManager.prototype.removeEntity = function (id) {
	        // Remove all data for this entity.
	        for (var comp in this.entityComponentData) {
	            if (this.entityComponentData.hasOwnProperty(comp)) {
	                if (this.entityComponentData[comp][id]) {
	                    delete this.entityComponentData[comp][id];
	                }
	            }
	        }
	
	        // Remove the entity from the list of known entities.
	        this.entities.splice(this.entities.indexOf(id), 1);
	
	        return this;
	    };
	
	    //=========================================================================
	    // COMPONENTS
	
	    /**
	     * Add a component to the list of known components.
	     *
	     * @param {string} id - Unique identifier of the component.
	     * @param {object} component - Object containing the metadata and data of the component.
	     * @return {object} - this
	     */
	    EntityManager.prototype.addComponent = function (id, component) {
	        this.components[id] = component;
	        return this;
	    };
	
	    /**
	     * Remove a component from the list of known components.
	     *
	     * @param {string} id - Unique identifier of the component.
	     * @return {object} - this
	     */
	    EntityManager.prototype.removeComponent = function (id) {
	        delete this.components[id];
	        delete this.entityComponentData[id];
	        return this;
	    };
	
	    /**
	     * Get the list of components this instance knows.
	     *
	     * @return {array} - List of names of components.
	     */
	    EntityManager.prototype.getComponentsList = function () {
	        return Object.keys(this.components);
	    };
	
	    /**
	     * Create a new instance of each listed component and associate them
	     * with the entity.
	     *
	     * @param {array} componentIds - List of identifiers of the components to add to the entity.
	     * @param {int} entityId - Unique identifier of the entity.
	     * @return {object} - this
	     */
	    EntityManager.prototype.addComponentsToEntity = function (componentIds, entityId) {
	        var i;
	        var comp;
	        var self = this;
	
	        // First verify that all the components exist, and throw an error
	        // if any is unknown.
	        for (i = componentIds.length - 1; i >= 0; i--) {
	            comp = componentIds[i];
	
	            if (!this.components[comp]) {
	                throw new Error('Trying to use unknown component: ' + comp);
	            }
	        }
	
	        // Now we know that this request is correct, let's create the new
	        // entity and instanciate the component's states.
	        for (i = componentIds.length - 1; i >= 0; i--) {
	            comp = componentIds[i];
	
	            if (!this.entityComponentData[comp]) {
	                this.entityComponentData[comp] = {};
	            }
	
	            var newCompState = null;
	
	            // If the manager has a listener, we want to create getters
	            // and setters so that we can emit state changes. But if it does
	            // not have one, there is no need to add the overhead.
	            if (self.listener) {
	                newCompState = {};
	                (function (newCompState) {
	                    var state = clone(self.components[comp].state);
	
	                    // Create a setter for each state attribute, so we can emit an
	                    // event whenever the state of this component changes.
	                    for (var property in state) {
	                        if (state.hasOwnProperty(property)) {
	                            (function (property) {
	                                Object.defineProperty(newCompState, property, {
	                                    get: function () {
	                                        return state[property];
	                                    },
	                                    set: function (val) {
	                                        state[property] = val;
	                                        self.listener.emit('entityComponentUpdated', entityId, comp);
	                                    }
	                                });
	                            })(property);
	                        }
	                    }
	                })(newCompState);
	            }
	            else {
	                newCompState = clone(self.components[comp].state);
	            }
	
	            // Store the entity's ID so it's easier to find other components for that entity.
	            newCompState.__id = entityId;
	
	            this.entityComponentData[comp][entityId] = newCompState;
	        }
	
	        return this;
	    };
	
	    /**
	     * De-associate a list of components from the entity.
	     *
	     * @param {array} componentIds - List of identifiers of the components to remove from the entity.
	     * @param {int} entityId - Unique identifier of the entity.
	     * @return {object} - this
	     */
	    EntityManager.prototype.removeComponentsFromEntity = function (componentIds, entityId) {
	        var i;
	        var comp;
	
	        // First verify that all the components exist, and throw an error
	        // if any is unknown.
	        for (i = componentIds.length - 1; i >= 0; i--) {
	            comp = componentIds[i];
	
	            if (!this.components[comp]) {
	                throw new Error('Trying to use unknown component: ' + comp);
	            }
	        }
	
	        // Now we know that this request is correct, let's create the new
	        // entity and instanciate the component's states.
	        for (i = componentIds.length - 1; i >= 0; i--) {
	            comp = componentIds[i];
	
	            if (this.entityComponentData[comp]) {
	                if (this.entityComponentData[comp][entityId]) {
	                    delete this.entityComponentData[comp][entityId];
	                }
	            }
	        }
	
	
	        return this;
	    };
	
	    /**
	     * Return a reference to an object that contains the data of an
	     * instanciated component of an entity.
	     *
	     * @param {int} entityId - Unique identifier of the entity.
	     * @param {string} componentId - Unique identifier of the component.
	     * @return {object} - Component data of one entity.
	     */
	    EntityManager.prototype.getComponentDataForEntity = function (componentId, entityId) {
	        if (!(componentId in this.components)) {
	            throw new Error('Trying to use unknown component: ' + componentId);
	        }
	
	        if (
	            !this.entityComponentData.hasOwnProperty(componentId) ||
	            !this.entityComponentData[componentId].hasOwnProperty(entityId)
	        ) {
	            throw new Error('No data for component ' + componentId + ' and entity ' + entityId);
	        }
	
	        return this.entityComponentData[componentId][entityId];
	    };
	
	    /**
	     * Update the state of a component, many keys at once.
	     *
	     * @param {int} entityId - Unique identifier of the entity.
	     * @param {string} componentId - Unique identifier of the component.
	     * @param {object} newState - Object containing the new state to apply.
	     * @return {object} - this
	     */
	    EntityManager.prototype.updateComponentDataForEntity = function (componentId, entityId, newState) {
	        var compState = this.getComponentDataForEntity(componentId, entityId);
	
	        for (var key in newState) {
	            if (newState.hasOwnProperty(key) && compState.hasOwnProperty(key)) {
	                compState[key] = newState[key];
	            }
	        }
	
	        return this;
	    };
	
	    /**
	     * Return a list of objects containing the data of all of a given component.
	     *
	     * @param {string} componentId - Unique identifier of the component.
	     * @return {array} - List of component data for one component.
	     */
	    EntityManager.prototype.getComponentsData = function (componentId) {
	        if (!(componentId in this.components)) {
	            throw new Error('Trying to use unknown component: ' + componentId);
	        }
	
	        if (!this.entityComponentData.hasOwnProperty(componentId)) {
	            return [];
	        }
	
	        return this.entityComponentData[componentId];
	    };
	
	    /**
	     * Return true if the entity has the component.
	     *
	     * @param {int} entityId - Unique identifier of the entity.
	     * @param {string} componentId - Unique identifier of the component.
	     * @return {boolean} - True if the entity has the component.
	     */
	    EntityManager.prototype.entityHasComponent = function (entityId, componentId) {
	        if (!(componentId in this.components)) {
	            throw new Error('Trying to use unknown component: ' + componentId);
	        }
	
	        return (
	            this.entityComponentData.hasOwnProperty(componentId) &&
	            this.entityComponentData[componentId].hasOwnProperty(entityId)
	        );
	    };
	
	    //=========================================================================
	    // ASSEMBLAGES
	
	    /**
	     * Add an assemblage to the list of known assemblages.
	     *
	     * @param {string} id - Unique identifier of the assemblage.
	     * @param {object} assemblage - An instance of an assemblage to add.
	     * @return {object} - this
	     */
	    EntityManager.prototype.addAssemblage = function (id, assemblage) {
	        this.assemblages[id] = assemblage;
	        return this;
	    };
	
	    /**
	     * Remove an assemblage from the list of known assemblages.
	     *
	     * @param {string} id - Unique identifier of the assemblage.
	     * @return {object} - this
	     */
	    EntityManager.prototype.removeAssemblage = function (id) {
	        delete this.assemblages[id];
	        return this;
	    };
	
	    /**
	     * Create a new entity in the system by creating a new instance of each of
	     * its components and setting their initial state, using an assemblage.
	     *
	     * @param {string} assemblageId - Id of the assemblage to create the entity from.
	     * @return {int} - Unique identifier of the new entity.
	     */
	    EntityManager.prototype.createEntityFromAssemblage = function (assemblageId) {
	        if (!(assemblageId in this.assemblages)) {
	            throw new Error('Trying to use unknown assemblage: ' + assemblageId);
	        }
	
	        var assemblage = this.assemblages[assemblageId];
	        var entity = this.createEntity(assemblage.components);
	
	        for (var comp in assemblage.initialState) {
	            if (assemblage.initialState.hasOwnProperty(comp)) {
	                var newState = assemblage.initialState[comp];
	                this.updateComponentDataForEntity(comp, entity, newState);
	            }
	        }
	
	        return entity;
	    };
	
	    //=========================================================================
	    // PROCESSORS
	
	    /**
	     * Add a processor to the list of known processors.
	     *
	     * @param {object} processor - An instance of a processor to manage.
	     * @return {object} - this
	     */
	    EntityManager.prototype.addProcessor = function (processor) {
	        this.processors.push(processor);
	        return this;
	    };
	
	    /**
	     * Remove a processor from the list of known processors.
	     *
	     * @param {object} processor - An instance of a processor to remove.
	     * @return {object} - this
	     */
	    EntityManager.prototype.removeProcessor = function (processor) {
	        this.processors.splice(this.processors.indexOf(processor), 1);
	        return this;
	    };
	
	    /**
	     * Update all the known processors.
	     *
	     * @param {int} dt - The time delta since the last call to update. Will be passed as an argument to all processor's `update` method.
	     * @return {object} - this
	     */
	    EntityManager.prototype.update = function (dt) {
	        for (var i = 0; i < this.processors.length; i++) {
	            this.processors[i].update(dt);
	        }
	        return this;
	    };
	
	    return EntityManager;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


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
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function createActions(network) {
	    function action(data) {
	        network.emit('action', data);
	    }
	
	    return {
	        createGame: function createGame() {
	            action({
	                type: 'createGame'
	            });
	        },
	        joinGame: function joinGame(game) {
	            action({
	                type: 'joinGame',
	                game: game
	            });
	        }
	    };
	}
	
	exports.default = createActions;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _events = __webpack_require__(2);
	
	var _events2 = _interopRequireDefault(_events);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Engine = function (_EventEmitter) {
	    _inherits(Engine, _EventEmitter);
	
	    function Engine(emitter, network) {
	        _classCallCheck(this, Engine);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Engine).call(this));
	
	        _this.emitter = emitter;
	        _this.network = network;
	
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
	                _this2.emitter.emit('ready');
	            });
	
	            this.emitter.on('data', function (data) {
	                console.log('received data');
	                console.log(data);
	                switch (data.type) {
	                    case 'modules':
	                        console.log('Modules list received');
	                        _this2.loadModules(data.data);
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
	            modules.forEach(function (module) {
	                // download the module's files
	                //require()
	            });
	        }
	    }]);
	
	    return Engine;
	}(_events2.default);
	
	exports.default = Engine;

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