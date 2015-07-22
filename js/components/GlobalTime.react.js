var React = require('react');
var ReactPropTypes = React.PropTypes;
var Actions = require('../actions/Actions');
var TimeStore = require('../stores/TimeStore');

var GlobalTime = React.createClass({

  componentDidMount: function() {
    TimeStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TimeStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.state.time = TimeStore.getGlobalTime();
    this.forceUpdate();
  },

  getInitialState: function() {
    return {
      time: this.props.time
    };
  },

  /**
   * @return {object}
   */
  render: function() {
    var time = this.state.time;
    
    // http://codepen.io/skellystudios/pen/QbVqjg?editors=100
    return (

      <div className="time-container">
        <div className="global-time range-slider">
          Time: {time}
          <input type="range" min="0" max="100" value={time} id="fader" step="1" />
        </div>  
      </div>

    );
  }

});

module.exports = GlobalTime;
