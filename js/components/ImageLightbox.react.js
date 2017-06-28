var React = require('react');
var ReactPropTypes = React.PropTypes;
var Actions = require('../actions/Actions');
var YouTube = require('react-youtube');
var Store = require('../stores/LocationStore');
var Categories = require('../stores/Categories');

var ImageLightbox = React.createClass({


  componentDidMount: function() {
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
    this.stop();
    },

    _onChange: function() {
      this.state.src = Store.getOpen().outside_the_hidden,
      console.log(this.state.src);
      window.test = Store;
      this.state.isClosed = !Store.isOutsideImageOpen();
      this.forceUpdate();

    },



  getInitialState: function() {
    return {
      src: this.props.src,
      isClosed: true
    };
  },

  close: function(){
      Actions.closeOutsideContainerCity();
  },

  /**
   * @return {object}
   */
  render: function() {
    var src = this.state.src;
    var url = "url('" + src + "')";
    console.log(url)
    var lightboxClassName = "image-lightbox"
    if (this.state.isClosed){
      lightboxClassName += " closed";
    }
    // style={{backgroundImage: url}}

    return (
      <div className={lightboxClassName}
        >
        <div className="wrapper" onClick={this.close}>
           <img src={src} onClick={this.close}/>
          <div className="close">
          <a href="#" onClick={this.close}>Close</a>
          </div>
           
        </div>
      </div>
    );
  }

});

module.exports = ImageLightbox;
