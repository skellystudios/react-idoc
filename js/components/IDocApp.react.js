/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the Store and passes the new data to its children.
 */

var React = require('react');
var Store = require('../stores/LocationStore');
var DisplayBox = require('./DisplayBox.react');
var VideoGallery = require('./VideoGallery.react');
var MenuBox = require('./MenuBox.react');
var FlipClock = require('./FlipClock.react');
var IDocMap = require('./IDocMap.react')
/**
 * Retrieve the current data from the Store
 */
function getStoreState() {
  gallery = getParameterByName("gallery")
  return {
    allItems: JSON.parse(JSON.stringify(Store.getAll())),
    activeLocation: Store.getActive(),
    openVideos: Store.getOpen(),
    hasEnded: Store.hasEnded(),
    galleryVideos: Store.getByCategory(gallery),
  };
}


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/*

  V1 things to do –
  
  [x] Title
  [x] Blurb boxes
  [x] Reveal all videos per theme
  [x] Return to start
  [x] Different colours
  [x] Next on the track
  [x] Upon loading map -> show 
  [x] Name above each clip
  [x] Look up the background music from Anecdote podcast


  [ ] Redesign the "next" pages
    - Close button
    - Next video button
  [ ] Key
  [ ] "outside the pop-up city"
    - Link at the end of the video
    - Pop up modal over most of screen
    - Title, Image, Text
  [ ] Skip fade animation on P1

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
    
    // Poor man's routing
    gallery = getParameterByName("gallery")

    // Show the map as usual
    if (!gallery) {

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
    } else {
      window.debug = Store;
      videos = this.state.galleryVideos;
      console.log(videos)

      return (
        <div className="idoc-app"> 
          <VideoGallery videos={videos} categoryLabel={gallery} />
          <MenuBox />
        </div>
        );
    }
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
