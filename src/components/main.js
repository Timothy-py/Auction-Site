import React from "react"

function Main(props) {
    return (
        <div className={(props.key % 2 === 0) ? "right-side" : "left-side"}>
            <div className="auction-card">
                <div className=".inn-left">
                    <div className="IMG-placeholder">
                        <img src={props.data.image} alt=""/>
                        <p class="diff-p">48hrs: 30mins: 2secs left</p>
                    </div>
                </div>

                <div className=".inn-right">
                    <p><b>Title:</b> {props.data.title}</p>
                    <p><b>Start Time:</b> {props.data.start_time}</p>
                    <p><b>End Time:</b> {props.data.end_time}</p>
                </div>
            </div>
        </div>
    )
}

export default Main;