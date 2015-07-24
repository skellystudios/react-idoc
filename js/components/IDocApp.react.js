/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the Store and passes the new data to its children.
 */

var Buttons = require('./Buttons.react');
var React = require('react');
var Store = require('../stores/LocationStore');
var DisplayBox = require('./DisplayBox.react');
var FlipClock = require('./FlipClock.react');
var IDocMap = require('./IDocMap.react')
/**
 * Retrieve the current data from the Store
 */
function getStoreState() {
  return {
    allItems: JSON.parse(JSON.stringify(Store.getAll())),
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

  shouldComponentUpdate: function(nextProps, nextState) {
    console.log("State 2 vis " + this.state.allItems[2].visible + " Next 2 vis " + nextState.allItems[2].visible);
    if (this.state.allItems === nextState.allItems){
      return true
    }
    return true
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div 
          className="idoc-app"> 
      <FlipClock
          time="0"
        />
      <DisplayBox
          item={this.state.openVideos}
          key={this.state.openVideos.id}
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
