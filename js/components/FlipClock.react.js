var React = require('react');
var ReactPropTypes = React.PropTypes;
var Actions = require('../actions/Actions');
var TimeStore = require('../stores/TimeStore');

var FlipClock = React.createClass({

  componentDidMount: function() {
    TimeStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TimeStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {

    // Add an extra day
    this.state.time.add(1, "days");
    this.forceUpdate();   

    // secondPlay();
    // if ((this.state.time.date() == 01) 
    //     | (this.state.time.date() == 10)
    //     | (this.state.time.date() == 20) 
    //     | (this.state.time.date() == 30)){
    //   second2Play(); 
    // }

    if (this.state.time.date() == 1) {
        this.state.monthBit = 1 ^ this.state.monthBit ;
        minutePlay(); 
    }

    if ((this.state.time.date() == 0) ||
        (this.state.time.date() == 9) ||
        (this.state.time.date() == 19) ||
        (this.state.time.date() == 30)
       ) {
        this.state.tenDayBit = 1 ^ this.state.tenDayBit ;
        second2Play(); 
    }
    
    this.state.dayBit = 1 ^ this.state.dayBit ;
    secondPlay();

    
  },

  getInitialState: function() {
    var moment_date = moment("2015-01-01").add(this.props.time, "days")
    return {
      time: moment_date,
      monthBit: 0,
      dayBit: 0,
      tenDayBit: 0,

    };
  },

  /**
   * @return {object}
   */
  render: function() {
    var time = this.state.time;
    timePlusOne = time.clone().add(1, "days")

    month1 = time.format("MMM");
    month2 = timePlusOne.format("MMM");

    day1 = time.format("DD")[1];
    day2 = timePlusOne.format("DD")[1];


    tenDay1 = time.format("DD")[0];
    tenDay2 = timePlusOne.format("DD")[0];
    // http://codepen.io/skellystudios/pen/QbVqjg?editors=100
    return (

      <div className="time-container">

        <div className="container">
            <div className="minutes">
            <ul className="flip minutePlay" key={this.state.monthBit}>
                <li className="active">
                    <a href="#">
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">{month1}</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">{month1}</div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">{month2}</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">{month2}</div>
                        </div>
                    </a>
                </li>
            </ul>
          </div>
          <div className="seconds">
            <ul className="flip secondPlay" key={this.state.dayBit}>
                <li>
                    <a href="#">
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">{day1}</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">{day1}</div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">{day2}</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">{day2}</div>
                        </div>
                    </a>
                </li>

            </ul>
          </div>
           <div className="seconds2">
            <ul className="flip secondPlay2" key={this.state.tenDayBit}>
                <li>
                    <a href="#">
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">{tenDay1}</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">{tenDay1}</div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">{tenDay2}</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">{tenDay2}</div>
                        </div>
                    </a>
                </li>
            </ul>
          </div>
        </div>
       {/* <div className="global-time range-slider">
          Time: {time}
          <input type="range" min="0" max="100" value={time} id="fader" step="1" />
        </div>  
      */}
      </div>

    );
  }

});

module.exports = FlipClock;
