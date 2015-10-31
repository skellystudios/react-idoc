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
    this.state.time.add(1, "months");
    console.log(this.state.time._d);

    this.forceUpdate();   

    // secondPlay();
    // if ((this.state.time.date() == 01) 
    //     | (this.state.time.date() == 10)
    //     | (this.state.time.date() == 20) 
    //     | (this.state.time.date() == 30)){
    //   second2Play(); 
    // }

    if (this.state.time.date() == 01) {
        this.state.monthBit = 1 ^ this.state.monthBit ;
        minutePlay(); 
    }

    
  },

  getInitialState: function() {
    var moment_date = moment("2015-01-01").add(this.props.time, "days")
    return {
      time: moment_date,
      monthBit: 0,

    };
  },

  /**
   * @return {object}
   */
  render: function() {
    var time = this.state.time;

    // if (this.state.monthBit == 1) {
    //     month1 = this.state.time.format("MMM");
    //     month2 = this.state.time.clone().add(0, "months").format("MMM");
    // } else {
    //     month1 = this.state.time.clone().add(0, "months").format("MMM");
    //     month2 = this.state.time.format("MMM");
    // }
    month1 = this.state.time.clone().add(0, "months").format("MMM");
    month2 = this.state.time.clone().add(1, "months").format("MMM");
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
            <ul className="flip secondPlay">
                <li>
                    <a href="#">
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">1</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">1</div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">2</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">2</div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">3</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">3</div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">4</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">4</div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">5</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">5</div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">6</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">6</div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">7</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">7</div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">8</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">8</div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">9</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">9</div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">0</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">0</div>
                        </div>
                    </a>
                </li>
            </ul>
          </div>
           <div className="seconds2">
            <ul className="flip secondPlay2">
                <li>
                    <a href="#">
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">0</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">0</div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">1</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">1</div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">2</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">2</div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">3</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">3</div>
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
