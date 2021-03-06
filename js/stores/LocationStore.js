var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _items = require('../stores/InitialData');

var TimeStore = require('../stores/TimeStore');

var hasEnded = false;
var outsideImageBoxOpen = false;


function getDayOfYear(date){
  var start = new Date(2015, 0, 0);
  var diff = date - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  return day
}

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
    //console.log(getDayOfYear(_items[id].starts));
    if (_items[id].starts < globalTime && !_items[id].visible){
      _items[id].visible = true;
      Store.emitChange();
    }

    if (_items[id].ends < globalTime && _items[id].visible){
      _items[id].visible = false;
      Store.emitChange();
    }

  }
}

function setEnded(x) {
  hasEnded = x;
}

function setOutsideImageOpen(x) {
  outsideImageBoxOpen = x;
}


var Store = assign({}, EventEmitter.prototype, {

  isOutsideImageOpen: function() {
    return outsideImageBoxOpen;
  },

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

  /**
   * Return the video locations for a given category
   */
  getByCategory: function(category) {
    results = []
    for (var id in _items) {
      if (_items[id].category == category) {
        results.push(_items[id])
      }
    }
    return results;
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

    case Constants.ITEM_OPEN_OUTSIDE_IMAGE:
      setOutsideImageOpen(true);
      console.log("yes");
      Store.emitChange();
      break;

    case Constants.ITEM_CLOSE_OUTSIDE_IMAGE:
      setOutsideImageOpen(false);
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
