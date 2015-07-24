/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Constants
 */

var keyMirror = require('keymirror');

module.exports = keyMirror({
  ITEM_CREATE: 1,
  ITEM_COMPLETE: 2,
  ITEM_DESTROY: 3,
  ITEM_DESTROY_COMPLETED: 4,
  ITEM_TOGGLE_COMPLETE_ALL: 5,
  ITEM_UNDO_COMPLETE: 6,
  ITEM_UPDATE_TEXT: 7,
  ITEM_VIEW_LOCATION: 8,
  ITEM_OPEN_VIDEO: 9,
  TICK: 10
});
