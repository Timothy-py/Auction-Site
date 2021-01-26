import React from "react"

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
                    <p><b>Start Time:</b> {props.data.start_time}</p>
                    <p><b>End Time:</b> {props.data.end_time}</p>
                </div>
            </div>

            <script>
                {
                    // Set the date we're counting down to
                    var countDownDate = new Date(props.data.end_time).getTime();

                    // Update the count down every 1 second
                    var x = setInterval(function() {

                    // Get today's date and time
                    var start = new Date(props.data.start_time).getTime();
                        
                    // Find the distance between now and the count down date
                    var distance = countDownDate - ;
                        
                    // Time calculations for days, hours, minutes and seconds
                    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                        
                    // Output the result in an element with id="demo"
                    document.getElementById("timer").innerHTML = days + "d " + hours + "h "
                    + minutes + "m " + seconds + "s ";
                        
                    // If the count down is over, write some text 
                    if (distance < 0) {
                        clearInterval(x);
                        document.getElementById("timer").innerHTML = "CLOSED";
                    }
                    }, 1000);
                }
            </script>
        </div>
    )
}

export default Main;