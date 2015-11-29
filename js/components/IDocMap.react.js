  "use strict";
var React = require('react/addons')
var GoogleMapsMixin = require("react-google-maps").GoogleMapsMixin;
var GoogleMap = require("react-google-maps").GoogleMap;
var OverlayView = require("react-google-maps").OverlayView;

var Map = require("react-google-maps").Map
var Marker = require("react-google-maps").Marker
var ReactPropTypes = React.PropTypes;
var Actions = require('../actions/Actions');
var LocationStore = require('../stores/LocationStore');
var Categories = require('../stores/Categories');



var cx = require('react/lib/cx');

var IDocMap = React.createClass({

  mixins: [GoogleMapsMixin],

  getInitialState: function(){
    return {
      zoom: 12,
      center: new google.maps.LatLng(51.511523, -0.156728),
      mapStyles: this.props.mapStyles,
      allPoints: this.props.allPoints,
    };
  },

  componentDidMount: function() {
     LocationStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    LocationStore.removeChangeListener(this._onChange);
  },

  // shouldComponentUpdate: function(nextProps, nextState) {
  //    return true;
  // },

  render: function() {
    var markers = [];
    var allPoints = this.state.allPoints
    for (var key in allPoints) {
      var icon = {
        fillColor: '#FF0000',
        fillOpacity: .6,
        anchor: new google.maps.Point(0,0),
        strokeWeight: 1,
        scale: 1,
      }
      var point = allPoints[key];
      var category = Categories[point.category];
      icon.url = category.icon_url;
      icon.scaledSize = new google.maps.Size(category.width,category.height); 
      if (point.visible) {
        var position = new google.maps.LatLng(point.lat, point.long);
        var visible = point.visible; 
        var key1 = key + "1"
        console.log(key1)
        //var visible = true;
        markers.push(
          <Marker key={key} ref={key} position={position} 
                visible={visible} onClick={this._handle_marker_click.bind(this, key)}
                icon={icon} />
          );
        markers.push(
          <OverlayView 
          position={position} 
          key={key1}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div>
            highway
            </div>
          </OverlayView>
        );
        
      }
    }
    // {...this.props}
    return <div  className="map" style={{height: "100%"}} >
        <GoogleMap ref="map" style={{height: "100%"}}
              containerProps={{
                style: {
                  height: "100%",
                }
              }}
              zoom={this.state.zoom} 
              center={this.state.center} 
              onCenterChanged={this._handle_map_center_changed} 
              styles={this.state.mapStyles}
              >
        {markers}
        </GoogleMap>

    </div>;
    },


  _handle_marker_click: function(key) {
    Actions.openVideo(key);
  },

  _onChange: function() {
    this.state.allPoints = JSON.parse(JSON.stringify(LocationStore.getAll()));
    this.forceUpdate();
  }

});

IDocMap.defaultProps = {
  mapStyles: [{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}]
}

module.exports = IDocMap;

