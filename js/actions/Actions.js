/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Actions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var Actions = {
  /**
   * Makes the marker visible
   */
  view: function(id) {
    console.log("VIEW");
    AppDispatcher.dispatch({
      actionType: Constants.VIEW_LOCATION,
      id: id
    });
  },

  /**
   * Opens the video associated with a particular marker
   */
  openVideo: function(id) {
    console.log("OPEN VIDEO");
    AppDispatcher.dispatch({
      actionType: Constants.ITEM_OPEN_VIDEO,
      id: id
    });
  },
  /**
   * Opens the "outside container city" popup thing
   */
  openOutsideContainerCity: function() {
    console.log("OPEN OUTSIDE CONTAINER CITY");
    AppDispatcher.dispatch({
      actionType: Constants.ITEM_OPEN_OUTSIDE_IMAGE,
    });
  },

  /**
   * Closes the "outside container city" popup thing
   */
  closeOutsideContainerCity: function() {
    console.log("CLOSE OUTSIDE CONTAINER CITY");
    AppDispatcher.dispatch({
      actionType: Constants.ITEM_CLOSE_OUTSIDE_IMAGE,
    });
  },

  /**
   * Moved the global timer on by one tick
   */
  tick: function() {
    console.log("TICK");
    AppDispatcher.dispatch({
      actionType: Constants.TICK,
    });
  },

  videoEnded: function() {
    console.log("ITEM_VIDEO_ENDED");
    AppDispatcher.dispatch({
      actionType: Constants.ITEM_VIDEO_ENDED,
    });
  },

  restartPlayer: function() {
    console.log("RESTART_PLAYER");
    AppDispatcher.dispatch({
      actionType: Constants.RESTART_PLAYER,
    });
  },

};

module.exports = Actions;
