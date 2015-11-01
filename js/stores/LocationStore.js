var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _items = require('../stores/InitialData');

var TimeStore = require('../stores/TimeStore');

var hasEnded = false;

function closeAll() {
  for (var id in _items) {
    _items[id].open = false;
  }
}

function update(id, updates) {
  _items[id] = assign({}, _items[id], updates);
}

function updateVisiblePoints() {
  globalTime = TimeStore.getGlobalTime();
  for (var id in _items) {
    if ((_items[id].starts < globalTime) && !_items[id].visible){
      _items[id].visible = true;
      Store.emitChange();
    }

    if ((_items[id].ends < globalTime) && _items[id].visible){
      _items[id].visible = false;
      Store.emitChange();
    }

  }
}

function setEnded(x) {
  hasEnded = x;
}



var Store = assign({}, EventEmitter.prototype, {

  hasEnded: function() {
    return hasEnded;
  },

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
   switch(action.actionType) {

    case Constants.ITEM_OPEN_VIDEO:
      console.log("Click view: " + action.id)
      closeAll();
      update(action.id, {"open": true});
      setEnded(false);
      Store.emitChange();
      break;

    case Constants.TICK:
      updateVisiblePoints();
      break;

    case Constants.VIEW_LOCATION:
      update(action.id, {"visible": true});
      setEnded(false);
      Store.emitChange();
      break;

    case Constants.ITEM_VIDEO_ENDED:
      setEnded(true);
      Store.emitChange();
      break;
  
    default:
        // no op
    }   

});

module.exports = Store;
