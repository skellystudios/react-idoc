var React = require('react');

var Timer = React.createClass({

    getInitialState: function(){
        // This is called before our render function. The object that is 
        // returned is assigned to this.state, so we can use it later.
        return { elapsed: 0 };
    },

    componentDidMount: function(){
        // componentDidMount is called by react when the component 
        // has been rendered on the page. We can set the interval here:
        this.start();
    },

    componentWillUnmount: function(){
        // This method is called immediately before the component is removed
        // from the page and destroyed. We can clear the interval here:
        this.stop();
    },

    start: function(){
        this.timer = setInterval(this.tick, 50);
    },

    stop: function(){
        clearInterval(this.timer);
    },


    tick: function(){
        // This function is called every 50 ms. It updates the 
        // elapsed counter. Calling setState causes the component to be re-rendered
        var elapsed = new Date() - this.props.start;
        this.setState({elapsed: elapsed});
        // if (elapsed/1000 > this.props.limit) {
        //     this.props.limit = 100430003;
        // }
    },

    render: function() {   
        var elapsed = Math.round(this.state.elapsed / 100);
        var limit = this.props.limit;
        // This will give a number with one digit after the decimal dot (xx.x):
        var seconds = (elapsed / 10).toFixed(1);    
        // Although we return an entire <p> element, react will smartly update
        // only the changed parts, which contain the seconds variable.
        return (
            <div className="timer">
                <p>This example was started <b>{seconds} seconds</b> ago. Limit: {limit} seconds</p>
            </div>
        );
    }
});


// React.renderComponent(
//     <Timer start={Date.now()} limit="4" />,
//     document.body
// );

module.exports = Timer;