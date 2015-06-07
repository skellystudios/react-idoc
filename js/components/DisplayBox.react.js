var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoActions');
var GoogleMapsMixin = require("react-google-maps").GoogleMapsMixin;
var YouTube = require('react-youtube').YouTube;
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

    return (
      <div className="display-box">
        {item.text}
       <YouTube
            url={string}            // required
            id={string}             // defaults -> 'react-yt-player'
            opts={obj}              // defaults -> {}
            onReady={func}          // defaults -> noop
            onPlay={func}           // defaults -> noop
            onPause={func}          // defaults -> noop
            onEnd={func}            // defaults -> noop
      />
      </div>
    );
  }

});

module.exports = DisplayBox;
