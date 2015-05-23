/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */

var Footer = require('./Footer.react');
var Header = require('./Header.react');
var Buttons = require('./Buttons.react');
var React = require('react');
var TodoStore = require('../stores/TodoStore');
var DisplayBox = require('./DisplayBox.react');
var MapTest = require('./MapTest.react')
/**
 * Retrieve the current TODO data from the TodoStore
 */
function getTodoState() {
  return {
    allTodos: TodoStore.getAll(),
    areAllComplete: TodoStore.areAllComplete(),
    activeLocation: TodoStore.getActive()
  };
}

var TodoApp = React.createClass({

  getInitialState: function() {
    return getTodoState();
  },

  componentDidMount: function() {
    TodoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TodoStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div><p></p>
      <MapTest
          allPoints={this.state.allTodos}
          googleMapsApi={google.maps}
        />
      
        <Header />
        <Buttons
          allTodos={this.state.allTodos}
          areAllComplete={this.state.areAllComplete}
        />
         <DisplayBox
          item={this.state.activeLocation}
        />
        
        <Footer allTodos={this.state.allTodos} />
       
      </div>
  	);
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function() {
    this.setState(getTodoState());
  }

});

module.exports = TodoApp;
