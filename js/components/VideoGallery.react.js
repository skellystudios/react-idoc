  "use strict";
var React = require('react/addons')
var Actions = require('../actions/Actions');
var LocationStore = require('../stores/LocationStore');
var VideoThumb = require('./VideoThumb.react');


var VideoGallery = React.createClass({

  getInitialState: function(){
    return {
      videos: this.props.videos,
    };
  },

  render: function() {
    var videos = [];
    console.log(this.state.videos)
    for (var key in this.state.videos) {
        var video = this.state.videos[key]
        videos.push(
          <VideoThumb 
            key={video.id} 
            url={video.url} 
            title={video.title} 
            blurb={video.blurb} 
          ></VideoThumb>
          );
    };
    return (
    <div  className="video-gallery" style={{height: "100%"}} >
        {videos}
    </div>
    );
  },

});

module.exports = VideoGallery;

