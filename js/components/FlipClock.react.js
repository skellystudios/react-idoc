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
    this.state.time.add(1, "days");
    secondPlay();
    if ((this.state.time.date() == 01) 
        | (this.state.time.date() == 10)
        | (this.state.time.date() == 20) 
        | (this.state.time.date() == 30)){
      second2Play(); 
    }
    if (this.state.time.date() == 01){
      minutePlay(); 
    }
    this.forceUpdate();
  },

  getInitialState: function() {
    var moment_date = moment("2015-01-01").add(this.props.time, "days")
    return {
      time: moment_date,
    };
  },

  /**
   * @return {object}
   */
  render: function() {
    var time = this.state.time;
    
    // http://codepen.io/skellystudios/pen/QbVqjg?editors=100
    return (

      <div className="time-container">

        <div className="container">
            <div className="minutes">
            <ul className="flip minutePlay">
                <li>
                    <a href="#">
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">JAN</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">JAN</div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">FEB</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">FEB</div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">MAR</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">MAR</div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">APR</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">APR</div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">MAY</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">MAY</div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">JUN</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">JUN</div>
                        </div>
                    </a>
                </li>
              <li>
                    <a href="#">
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">JUL</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">JUL</div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">AUG</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">AUG</div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">SEP</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">SEP</div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">OCT</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">OCT</div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">NOV</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">NOV</div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div className="up">
                            <div className="shadow"></div>
                            <div className="inn">DEC</div>
                        </div>
                        <div className="down">
                            <div className="shadow"></div>
                            <div className="inn">DEC</div>
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