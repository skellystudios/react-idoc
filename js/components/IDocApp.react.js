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
  [x] Name above each clip
  [x] Look up the background music from Anecdote podcast



  Notes for talk:

  - Ella came to me asking how we could collaborate on making an iDocumentary
    - Exciting as it's not something I've done before
    - Also a chance for me to try out new technologies: things move very quickly
      in tech, and once you've been working on 
  - Challenge: 
    - how to get something meaningful where the iDoc actually added
      something to the format, rather than just being a means to an end. 
    - it felt like a big part of this project was the fact that these popups shaped the city so much because
      of their transient nature, both in time and space, and I wanted to represent that in 
      the structure of the iDoc
  - Web has now got to the point where we can do this
    - 10 or 15 years ago the web was static - you load a website, and whatever's there is there until
      you load the next page
    - Video was less integrated, and so if you wanted to play some video, you'd have to click it, download it
      and open it up in a video playing app.
    - Now, with the modern web, we can have pages that change before our eyes. 
      Elements can appear and disappear, all while a video clip is playing, and we can mark your progress 
      in a video as the passage of time on the mechanical clock
    - We can also prototype rapidly

  - Talk about how code works
  - Show some changes going live
  
  - Another interesting reason to take on this project was the intersection between 
    academia and the open-source software movement
    - Open source software is made available for anybody to use or modify, as its source code is made 
       available. 
    - Some open-source software is based on a share-alike principle, whereby users are free 
       to pass on the software subject to the stipulation that any enhancements or changes are just as 
       freely available to the public,
    - other open-source projects may be freely incorporated into any derivative work, open-source or 
      proprietary
  - There's a few good reasons open source software is good
    - Firstly, for small projects like this within academia, it allows the project to be reproducible
    - Secondly, open source software basically runs the world. 
      - This project was written in ReactJS, an open source framework for the javascript language 
      written in the last few years. There's no license fee for it, and its source code is completely for free.
      - That's running on Google Chrome – a web browser that's made by Google, who are paying millions in but
      releasing it to the public for free
      - And Google Chrome is running on my Macbook, which runs the OSX operating system, which fundamentally runs
        on code from UNIX - an operating system written by Bell Labs in the 1970s. 

  - Show github



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
