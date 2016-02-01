  "use strict";
var React = require('react/addons')
var Actions = require('../actions/Actions');
var LocationStore = require('../stores/LocationStore');
var VideoThumb = require('./VideoThumb.react');
var Categories = require('../stores/Categories');

var VideoGallery = React.createClass({

  getInitialState: function(){
    return {
      videos: this.props.videos,
      categoryLabel: this.props.categoryLabel,  
    };
  },

  render: function() {
    var videos = [];
    var category = Categories[this.state.categoryLabel]
    var name = category.name;
    var blurb = category.blurb;
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
    <div  className="video-gallery">
        <div className="title">
          <h1>{name}</h1>
        </div>
        <div className="blurb">
          {blurb}
        </div>
        <div className="videoThumbs">
        {videos}
        </div>
    </div>
    );
  },

});

module.exports = VideoGallery;

