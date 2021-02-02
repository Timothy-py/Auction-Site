import React from "react"
import Moment from 'react-moment';
import 'moment-timezone';
import Countdown from 'react-countdown';

// Random component
const Completionist = () => <span>Auction Closed!</span>;
 
// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return <span>{hours}:{minutes}:{seconds}</span>;
  }
};

function Main(props) {
    return (
        <div className={(props.key % 2 === 0) ? "right-side" : "left-side"}>
            <div className="auction-card">
                <div className=".inn-left">
                    <div className="IMG-placeholder">
                        <img src={props.data.image} alt=""/>
                        <p class="timer"></p>
                    </div>
                </div>

                <div className=".inn-right">
                    <p><b>Title:</b> {props.data.title}</p>
                    <p><b>Start Time:</b> <Moment data={(props.data.start_time)} format="MMM DD, YYYY HH:SSA" /></p>
                    <p><b>End Time:</b> <Moment data={(props.data.end_time)} format="MMM DD, YYYY HH:SSA" /></p>
                    
                    {/* <Countdown>
                        date=={Date.now() + 5000}
                        renderer={renderer}
                    </Countdown> */}
                </div>
            </div>
        </div>
    )
}

export default Main;