/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var Actions = require('../actions/Actions');

var cx = require('react/lib/cx');

var LocationButton = React.createClass({

  propTypes: {
   item: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
    };
  },

  /**
   * @return {object}
   */
  render: function() {
    var item = this.props.item;

    return (
      <li
        className={cx({
          'visible': item.visible
        })}
        key={item.id}>
          <button className="view" onClick={this._onClickView} text="{item.text}">
          {item.text}
          </button>
      </li>
    );
  },

  _onClickView: function() {
    Actions.view(this.props.item.id);
  }

});

module.exports = LocationButton;
