"use strict";
var React = require('react/addons')
var GoogleMapsMixin = require("react-google-maps").GoogleMapsMixin;
var Map = require("react-google-maps").Map
var Marker = require("react-google-maps").Marker
var ReactPropTypes = React.PropTypes;
var Actions = require('../actions/Actions');
var Store = require('../stores/Store');

var cx = require('react/lib/cx');

var IDocMap = React.createClass({

  propTypes: {
  },
  mixins: [GoogleMapsMixin],

  getInitialState: function(){
    return {
      zoom: 12,
      center: new google.maps.LatLng(51.518507, -0.120933),
      timeoutId: null,
    };
  },

  componentDidMount: function() {
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
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
              styles={this.props.mapStyles} 
              />
        {markers}

    </div>;
    },


  _handle_marker_click: function(key) {
    console.log(key);
    Actions.openVideo(key);
  },

  _onChange: function() {
    this.forceUpdate();
  }

});

IDocMap.defaultProps = {
  mapStyles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}]
}

module.exports = IDocMap;



//         <Marker ref="marker" position={this.state.center} title="Click to zoom" onClick={this._handle_marker_click} /> 
//      
