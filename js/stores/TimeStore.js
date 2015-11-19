var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var assign = require('object-assign');


var CHANGE_EVENT = 'change';
var TICK_EVENT = 'tick';

var globalTime = 1;

function setGlobalTime(time){
  globalTime = time;
}

function tick() {
  globalTime += 1;
}


var TimeStore = assign({}, EventEmitter.prototype, {

  emitTick: function() {
    this.emit(TICK_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(TICK_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(TICK_EVENT, callback);
  },

  getGlobalTime: function(){
    return globalTime;
  }

});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case Constants.TICK:
      tick();
      TimeStore.emitTick();
      break;
    case Constants.RESTART_PLAYER:
      setGlobalTime(0);
      TimeStore.emitTick();
      break;

    default:
      // no op
  }
});

module.exports = TimeStore;
