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

var mapStyles = [{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}]

var IDocMap = React.createClass({

  mixins: [GoogleMapsMixin],

  getInitialState: function(){
    return {
      allPoints: this.props.allPoints,
    };
  },

  componentDidMount: function() {
     LocationStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    LocationStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var markers = [];
    for (var key in this.state.allPoints) {

      var point = this.state.allPoints[key];
      var category = Categories[point.category];

      var icon = {
        fillColor: '#FF0000',
        fillOpacity: .6,
        anchor: new google.maps.Point(0,0),
        strokeWeight: 1,
        scale: 1,
      }
      icon.url = category.icon_url;
      icon.scaledSize = new google.maps.Size(category.width,category.height);


      if (point.visible) {

        var position = new google.maps.LatLng(point.lat, point.long);
        var visible = point.visible;
        var label_key = key + "_label"
        //var visible = true;
        markers.push(
          <Marker key={key} ref={key} position={position}
                visible={visible} onClick={this._handle_marker_click.bind(this, key)}
                icon={icon} />
          );
        markers.push(
          <OverlayView
          position={position}
          key={label_key}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div
            className="marker-label"
            >
              <p>
                {point.title}
              </p>
            </div>
          </OverlayView>
        );

      }
    }

    return <div  className="map" style={{height: "100%"}} >
        <GoogleMap ref="map" style={{height: "100%"}}
              containerProps={{ style: { height: "100%", } }}
              defaultZoom={12}
              defaultCenter={{lat: 51.511523, lng: -0.156728}}
              defaultOptions={{ styles: mapStyles, }}
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

module.exports = IDocMap;

