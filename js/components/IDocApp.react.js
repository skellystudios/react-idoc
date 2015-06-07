/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the Store and passes the new data to its children.
 */

var Buttons = require('./Buttons.react');
var React = require('react');
var Store = require('../stores/Store');
var DisplayBox = require('./DisplayBox.react');
var IDocMap = require('./IDocMap.react')
/**
 * Retrieve the current data from the Store
 */
function getStoreState() {
  return {
    allItems: Store.getAll(),
    areAllComplete: Store.areAllComplete(),
    activeLocation: Store.getActive(),
    openVideos: Store.getOpen(),
  };
}

var IDocApp = React.createClass({

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
      <IDocMap
          allPoints={this.state.allItems}
          googleMapsApi={google.maps}
        />
        <Buttons
          allItems={this.state.allItems}
          areAllComplete={this.state.areAllComplete}
        />  
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

module.exports = IDocApp;
