var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoActions');

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
      </div>
    );
  }

});

module.exports = DisplayBox;
