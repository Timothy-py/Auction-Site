import React from "react"

function Main(props) {
    return (
        <div className="auction-card">
            <div className=".left-side">
                <div className="IMG-placeholder">
                    <img src={props.data.image} alt=""/>
                    {/* <p class="diff-p"  style="font-weight:bold">48hrs: 30mins: 2secs left</p> */}
                </div>

                <div className="inn-right">
                    <p>Title: {props.data.title}</p>
                    <p>Start Time: {props.data.start_time}</p>
                    <p>End Time: {props.data.end_time}</p>
                </div>
            </div>
        </div>
    )
}

export default Main;