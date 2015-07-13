var React = require('react');
var ReactPropTypes = React.PropTypes;
var Actions = require('../actions/Actions');
var DisplayBox = React.createClass({


  getInitialState: function() {
    return {
    };
  },

  /**
   * @return {object}
   */
  render: function() {
    var time = this.props.time;
    
    return (
      <div className="global-time">
        {time}
        <input type="range" min="0" max="100" value={time} id="fader" step="1" />
        
      </div>

    );
  }

});

module.exports = DisplayBox;
