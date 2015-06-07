var React = require('react');
var ReactPropTypes = React.PropTypes;
var Actions = require('../actions/Actions');
var LocationButton = require('./LocationButton.react');

var MainSection = React.createClass({

  propTypes: {
    allItems: ReactPropTypes.object.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    // This section should be hidden by default
    // and shown when there are items.
    if (Object.keys(this.props.allItems).length < 1) {
      return null;
    }

    var allItems = this.props.allItems;
    var items = [];

    for (var key in allItems) {
      items.push(<LocationButton key={key} item={allItems[key]} />);
    }

    return (
      <section id="main">
        <ul id="item-list">{items}</ul>
      </section>
    );
  },


});

module.exports = MainSection;
