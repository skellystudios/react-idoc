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
var LocationButton = require('./LocationButton.react');

var MainSection = React.createClass({

  propTypes: {
    allItems: ReactPropTypes.object.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    // This section should be hidden by default
    // and shown when there are todos.
    if (Object.keys(this.props.allItems).length < 1) {
      return null;
    }

    var allItems = this.props.allItems;
    var todos = [];

    for (var key in allItems) {
      todos.push(<LocationButton key={key} todo={allItems[key]} />);
    }

    return (
      <section id="main">
        <ul id="todo-list">{todos}</ul>
      </section>
    );
  },

  /**
   * Event handler to mark all TODOs as complete
   */
  _onToggleCompleteAll: function() {
    TodoActions.toggleCompleteAll();
  }



});

module.exports = MainSection;
