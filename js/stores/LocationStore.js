var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _items = require('../stores/InitialData');

var TimeStore = require('../stores/TimeStore');


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

function updateVisiblePoints() {
  globalTime = TimeStore.getGlobalTime();
  for (var id in _items) {
    if ((_items[id].starts < globalTime) && !_items[id].visible){
      _items[id].visible = true;
      Store.emitChange();
    }
  }
}

var Store = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return _items;
  },

  /** 
   * Return any visible locations
   */
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

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    
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
      updateVisiblePoints();
      break;

    default:
      closeAll();
      // no op
  }
});

module.exports = Store;
