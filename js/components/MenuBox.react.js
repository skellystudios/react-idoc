var React = require('react');
var Actions = require('../actions/Actions');


var MenuBox = React.createClass({

    _onClick: function() {
      Actions.restartPlayer()
    },

  render: function() {
    return (
      <div className="menu-box">
        <div className="test">
          <a href="#" onClick={this._onClick}>Restart Player</a>
        </div>
      </div>      )}

});

module.exports = MenuBox;