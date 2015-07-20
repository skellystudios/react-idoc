/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Store
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var TICK_EVENT = 'tick';

// var _items = {};
var _items = require('../stores/InitialData');
var globalTime = 10;

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function create(text) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _items[id] = {
    id: id,
    complete: false,
    text: text
  };
  window.debug = _items;
}

/**
 * Update a TODO item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
  _items[id] = assign({}, _items[id], updates);
}

/**
 * Update all of the TODO items with the same object.
 *     the data to be updated.  Used to mark all TODOs as completed.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.

 */
function updateAll(updates) {
  for (var id in _items) {
    update(id, updates);
  }
}

/**
 * Delete a TODO item.
 * @param  {string} id
 */
function destroy(id) {
  delete _items[id];
}

/**
 * Delete all the completed TODO items.
 */
function destroyCompleted() {
  for (var id in _items) {
    if (_items[id].complete) {
      destroy(id);
    }
  }
}

function hideAll() {
  for (var id in _items) {
    _items[id].visible = false;
  }
}

function closeAll() {
  for (var id in _items) {
    _items[id].open = false;
  }
}

function tick() {
  globalTime += 1;
  console.log("tick");
  console.log(_items);
  for (var id in _items) {
    console.log("visible_check");
    _items[id].visible = _items[id].starts < globalTime;
    console.log(_items[id].visible);

  }
}


var Store = assign({}, EventEmitter.prototype, {

  /**
   * Tests whether all the remaining TODO items are marked as completed.
   * @return {boolean}
   */
  areAllComplete: function() {
    for (var id in _items) {
      if (!_items[id].complete) {
        return false;
      }
    }
    return true;
  },

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _items;
  },

  getActive: function() {
    for (var id in _items) {
      if (_items[id].visible) {
        return _items[id];
      }
    }
    return true;
  },

  /** 
   * Return the video location that is open, if any
   */
  getOpen: function() {
    for (var id in _items) {
      if (_items[id].open) {
        return _items[id];
      }
    }
    return true;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  emitTick: function() {
    this.emit(TICK_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getGlobalTime: function(){
    return globalTime;
  }

});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case Constants.ITEM_CREATE:
      text = action.text.trim();
      if (text !== '') {
        create(text);
        Store.emitChange();
      }
      break;

    case Constants.ITEM_TOGGLE_COMPLETE_ALL:
      if (Store.areAllComplete()) {
        updateAll({complete: false});
      } else {
        updateAll({complete: true});
      }
      Store.emitChange();
      break;

    case Constants.ITEM_UNDO_COMPLETE:
      update(action.id, {complete: false});
      Store.emitChange();
      break;

    case Constants.ITEM_COMPLETE:
      update(action.id, {complete: true});
      Store.emitChange();
      break;

    case Constants.ITEM_UPDATE_TEXT:
      text = action.text.trim();
      if (text !== '') {
        update(action.id, {text: text});
        Store.emitChange();
      }
      break;

    case Constants.ITEM_DESTROY:
      destroy(action.id);
      Store.emitChange();
      break;

    case Constants.ITEM_DESTROY_COMPLETED:
      destroyCompleted();
      Store.emitChange();
      break;

    case Constants.VIEW_LOCATION:
      hideAll();
      update(action.id, {"visible": true});
      Store.emitChange();
      break;

    case Constants.ITEM_OPEN_VIDEO:
      closeAll();
      update(action.id, {"open": true});
      Store.emitChange();
      break;
    case Constants.TICK:
      tick();
      Store.emitChange();
      break;

    default:
      closeAll();
      // no op
  }
});

module.exports = Store;
