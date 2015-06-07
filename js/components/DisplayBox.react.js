var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoActions');
var GoogleMapsMixin = require("react-google-maps").GoogleMapsMixin;
var YouTube = require('react-youtube');
var cx = require('react/lib/cx');

var DisplayBox = React.createClass({

  propTypes: {
   item: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
    };
  },

  /**
   * @return {object}
   */
  render: function() {
    var item = this.props.item;
    const opts = {
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        controls:0,
        modestbranding: 1,
        rel:0,
        showinfo: 0,
        disablekb: 1,

      }
    };
    return (
      <div className="display-box">
        {item.text}
        https://jsfiddle.net/5bwccbe5/
       <YouTube
            url="https://www.youtube.com/watch?v=cKkYGK4jE7I"           // required
            key={item.id}
            // id={string}             // defaults -> 'react-yt-player'
            opts={opts}              // defaults -> {}
            // onReady={func}          // defaults -> noop
            // onPlay={func}           // defaults -> noop
            // onPause={func}          // defaults -> noop
            // onEnd={func}            // defaults -> noop
      />
      </div>
    );
  }

});

module.exports = DisplayBox;
