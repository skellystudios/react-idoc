var React = require('react');
var ReactPropTypes = React.PropTypes;
var Actions = require('../actions/Actions');
var YouTube = require('react-youtube');
var Store = require('../stores/LocationStore');

var DisplayBox = React.createClass({

  propTypes: {
   item: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      item: this.props.item
    };
  },

  componentDidMount: function() {
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
    this.stop();
    },

    _onChange: function() {
      this.state.hasEnded = Store.hasEnded();
      if (this.state.hasEnded) {
        // Surely not the best way of doing this
        this.forceUpdate();
      }
      newItem = Store.getOpen()
      if (newItem != this.state.item){
        clearInterval(this.timer);
        this.setState({item: newItem})
        this.forceUpdate();
      }
    },

    start: function(){
        this.timer = setInterval(this.tick, 1500);
    },

    stop: function(){
        clearInterval(this.timer);
    },

    end: function(){
        clearInterval(this.timer);
        Actions.videoEnded();
    },

    tick: function(){
      Actions.tick()
    },

  /**
   * @return {object}
   */
  render: function() {
    var item = this.state.item;
    const opts = {
      width: 500,
      height: 280,
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        controls:0,
        modestbranding: 1,
        rel:0,
        showinfo: 0,
        disablekb: 1,
      },
    };
    return (
      <div className="display-box">
      {this.state.hasEnded ?
         <div className="test">
          Test
        </div>
      :
        <YouTube
              url={item.url}           // required
              key={item.id}
              // id={string}             // defaults -> 'react-yt-player'
              opts={opts}              // defaults -> {}
              // onReady={func}          // defaults -> noop
              onPlay={this.start}           // defaults -> noop
              onPause={this.stop}          // defaults -> noop
              onEnd={this.end}            // defaults -> noop
          ></YouTube>
      }
      </div>
    );
  }

});

module.exports = DisplayBox;
