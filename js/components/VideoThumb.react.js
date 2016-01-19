  "use strict";
var React = require('react/addons')
var cx = require('react/lib/cx');

var VideoThumb = React.createClass({

  getInitialState: function(){
    return {
      url: this.props.url,
    };
  },

  render: function() {
    var videoId = this.props.url.split("=")[1];
    var videoThumbUrl = "http://img.youtube.com/vi/" + videoId + "/0.jpg";
    return (
    <div key={this.props.key} className="video-thumb" style={{height: "100px", width: "100px"}} >
        <a href={this.state.url}>
          <img src={videoThumbUrl} />
          {this.props.title}
        </a>
    </div>
    );
    },

});

module.exports = VideoThumb;

