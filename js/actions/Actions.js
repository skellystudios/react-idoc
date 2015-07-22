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
    AppDispatcher.dispatch({
      actionType: Constants.VIEW_LOCATION,
      id: id
    });
  },

  /**
   * Opens the video associated with a particular marker
   */
  openVideo: function(id) {
    AppDispatcher.dispatch({
      actionType: Constants.ITEM_OPEN_VIDEO,
      id: id
    });
  },

  /**
   * Moved the global timer on by one tick
   */
  tick: function() {
    AppDispatcher.dispatch({
      actionType: Constants.TICK,
    });
  },

};

module.exports = Actions;
