var React = require('react');
var ReactPropTypes = React.PropTypes;
var Actions = require('../actions/Actions');
var YouTube = require('react-youtube');
var Store = require('../stores/LocationStore');
var Categories = require('../stores/Categories');

var DisplayBox = React.createClass({

  propTypes: {
   item: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      item: this.props.item,
      isClosed: false
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
        this.setState({isClosed: false})
        this.setState({item: newItem})
        this.forceUpdate();
      }
    },

    _onClick: function() {
      Actions.openVideo(this.state.item.next_item)
    },

    start: function(){
        this.timer = setInterval(this.tick, 900);
    },

    stop: function(){
        clearInterval(this.timer);
    },

    end: function(){
        clearInterval(this.timer);
        Actions.videoEnded();
    },

    close: function(){
        this.stop();
        this.setState({isClosed: true});
    },

    tick: function(){
      Actions.tick()
    },

  /**
   * @return {object}
   */
  render: function() {
    var item = this.state.item;
    var category = ""
    const opts = {
      width: 620,
      height: 380,
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        controls:0,
        modestbranding: 1,
        rel:0,
        showinfo: 0,
        disablekb: 1,
      },
    };
    console.log(item);
    if (item.category) {
      console.log(item)
      category = Categories[item.category].name
    }
    displayBoxClassName = "display-box"
    if (this.state.isClosed || !this.state.item.url){
      displayBoxClassName += " closed";
    }
    return (
      <div className={displayBoxClassName}>

      <div className="close">
       <a href="#" onClick={this.close}>&#x2715;</a>
      </div>
      {this.state.hasEnded | this.state.isClosed ?
        <div className="where-next">
            <h1> Where to next? </h1>
          <div className="button">
              <a href="#" onClick={this._onClick}>{item.next_item_title}</a>
          </div>
          <h2>or</h2>
          <div className="button">
              <a href="#" onClick={this.close}>Continue exploring the temporary city</a>
          </div>
        </div>
      :
        <div>
          <YouTube
                url={item.url}              // required
                key={item.id}
                // id={string}             // defaults -> 'react-yt-player'
                opts={opts}              // defaults -> {}
                // onReady={func}          // defaults -> noop
                onPlay={this.start}           // defaults -> noop
                onPause={this.stop}          // defaults -> noop
                onEnd={this.end}            // defaults -> noop
            >
            </YouTube>
            <h1>
            {item.title}
            </h1>
            <p>{item.blurb}</p>
          </div>
      }
      </div>
    );
  }

});

module.exports = DisplayBox;
