var React = require('react');
var ReactPropTypes = React.PropTypes;
var Actions = require('../actions/Actions');
var YouTube = require('react-youtube');

var DisplayBox = React.createClass({

  propTypes: {
   item: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
    };
  },

  componentDidMount: function(){
        // componentDidMount is called by react when the component 
        // has been rendered on the page. We can set the interval here:
       this.start();
       // TODO: remove this
    },

    componentWillUnmount: function(){
        // This method is called immediately before the component is removed
        // from the page and destroyed. We can clear the interval here:
        this.stop();
    },

    start: function(){
        this.timer = setInterval(this.tick, 1000);
    },

    stop: function(){
        clearInterval(this.timer);
    },

    tick: function(){
        Actions.tick()
    },

  /**
   * @return {object}
   */
  render: function() {
    var item = this.props.item;
    const opts = {
      width: 500,
      height: 300,
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
            url="https://www.youtube.com/watch?v=gjHo5BZM7V0"           // required
            key={item.id}
            // id={string}             // defaults -> 'react-yt-player'
            opts={opts}              // defaults -> {}
            // onReady={func}          // defaults -> noop
            onPlay={this.start}           // defaults -> noop
            onPause={this.stop}          // defaults -> noop
            onEnd={this.stop}            // defaults -> noop
      />
      </div>
    );
  }

});

module.exports = DisplayBox;
