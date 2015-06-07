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
 * the Store and passes the new data to its children.
 */

var Footer = require('./Footer.react');
var Header = require('./Header.react');
var Buttons = require('./Buttons.react');
var React = require('react');
var Store = require('../stores/Store');
var DisplayBox = require('./DisplayBox.react');
var MapTest = require('./MapTest.react')
/**
 * Retrieve the current TODO data from the Store
 */
function getStoreState() {
  return {
    allItems: Store.getAll(),
    areAllComplete: Store.areAllComplete(),
    activeLocation: Store.getActive(),
    openVideos: Store.getOpen(),
  };
}

var TodoApp = React.createClass({

  getInitialState: function() {
    return getStoreState();
  },

  componentDidMount: function() {
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (

      <div><DisplayBox
          item={this.state.openVideos}
        />
      <MapTest
          allPoints={this.state.allItems}
          googleMapsApi={google.maps}
        />
      
        <Header />
        <Buttons
          allItems={this.state.allItems}
          areAllComplete={this.state.areAllComplete}
        />
         
        
        <Footer allItems={this.state.allItems} />
       
      </div>
  	);
  },

  /**
   * Event handler for 'change' events coming from the Store
   */
  _onChange: function() {
    this.setState(getStoreState());
  }

});

module.exports = TodoApp;
