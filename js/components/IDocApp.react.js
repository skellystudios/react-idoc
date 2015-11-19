/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the Store and passes the new data to its children.
 */

var React = require('react');
var Store = require('../stores/LocationStore');
var DisplayBox = require('./DisplayBox.react');
var MenuBox = require('./MenuBox.react');
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
    hasEnded: Store.hasEnded(),
  };
}

/*

  V1 things to do –
  
  [x] Title
  [x] Blurb boxes
  [ ] Reveal all videos per theme
  [ ] Return to start
  [ ] Key
  [x] Different colours
  [x] Next on the track
  [ ] 3 options:   1. Same theme 2. Linked 3. Choose from maps
  [ ] Upon loading map -> show 
  [ ] Name above each clip
  [ ] Look up the background music from Anecdote podcast



  Notes for talk:

  - Ella came to me asking how we could collaborate
  - Talk about how code wokrs
  - Web has now got to the point where we can do this
  - Show some changes going live
  - Talk about open source software 

*/


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


// TODO: hey Michael, you need to move the state down to the iDocMap level

  shouldComponentUpdate: function(nextProps, nextState) {
    //console.log("State 2 vis " + this.state.allItems[2].visible + " Next 2 vis " + nextState.allItems[2].visible);
    if (this.state.allItems === nextState.allItems){
      return false
    }
    return false
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
          hasEnded={this.state.hasEnded}
        />
      <IDocMap
          allPoints={this.state.allItems}
          googleMapsApi={google.maps}
        />
        <MenuBox />
       </div>
  	);
  },

  /**
   * Event handler for 'change' events coming from the Store
   */
  _onChange: function() {
    this.setState(getStoreState());
    //this.forceUpdate();
  }

});

module.exports = IDocApp;
