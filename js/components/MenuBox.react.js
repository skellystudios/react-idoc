  "use strict";
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
          <a href="menu.html" onClick={this._onClick}>Back to menu &gt;</a>
        </div>
      </div>      )}

});

module.exports = MenuBox;