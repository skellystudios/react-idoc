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
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput.react');

var cx = require('react/lib/cx');

var LocationButton = React.createClass({

  propTypes: {
   todo: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
    };
  },

  /**
   * @return {object}
   */
  render: function() {
    var todo = this.props.todo;

    return (
      <li
        className={cx({
          'visible': todo.visible
        })}
        key={todo.id}>
          <button className="view" onClick={this._onClickView} text="{todo.text}">
          {todo.text}
          </button>
      </li>
    );
  },

  _onClickView: function() {
    TodoActions.view(this.props.todo.id);
  }

});

module.exports = LocationButton;