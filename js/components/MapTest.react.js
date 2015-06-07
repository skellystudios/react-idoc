"use strict";
var React = require('react/addons')
var GoogleMapsMixin = require("react-google-maps").GoogleMapsMixin;
var Map = require("react-google-maps").Map
var Marker = require("react-google-maps").Marker
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput.react');
var TodoStore = require('../stores/TodoStore');

var cx = require('react/lib/cx');

var MapTest = React.createClass({

  propTypes: {
  },
  mixins: [GoogleMapsMixin],

  getInitialState: function(){
    return {
      zoom: 4,
      center: new google.maps.LatLng(-25.363882, 131.044922),
      timeoutId: null,
    };
  },

  componentDidMount: function() {
    TodoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TodoStore.removeChangeListener(this._onChange);
  },


  render: function() {

    var markers = [];
    var allPoints = this.props.allPoints;
    for (var key in allPoints) {
      if (allPoints[key].visible) {
        var position = new google.maps.LatLng(allPoints[key].lat, allPoints[key].long);
        var visible = allPoints[key].visible;
        markers.push(
          <Marker key={key} ref={key} position={position} 
                visible={visible} onClick={this._handle_marker_click.bind(this, key)} />
          );
      }
    }

    return <div  className="map" style={{height: "100%"}} {...this.props}>
        <Map ref="map" style={{height: "99%"}} 
              zoom={this.state.zoom} 
              center={this.state.center} 
              onCenterChanged={this._handle_map_center_changed}  
              />
        {markers}

    </div>;
    },


  _handle_marker_click: function(key) {
    console.log(key);
    TodoActions.openVideo(key);
  },

  _onChange: function() {
    this.forceUpdate();
  }

});

module.exports = MapTest;



//         <Marker ref="marker" position={this.state.center} title="Click to zoom" onClick={this._handle_marker_click} /> 
//      
