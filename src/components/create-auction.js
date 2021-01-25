import React, {Component} from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import axios from "axios"



class CreateAuction extends Component{

    constructor(){
        super()

        this.state = {
            title: '',
            start_time: new Date(),
            end_time: new Date(),
            image: null
        }
        this.changeHandler = this.changeHandler.bind(this)
        this.startTimeHandler = this.startTimeHandler.bind(this)
        this.endTimeHandler = this.endTimeHandler.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onFileChange = this.onFileChange.bind(this)
    }

    changeHandler(event){
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    startTimeHandler(start_time){
        this.setState({
            start_time: start_time
        })
    }

    endTimeHandler(end_time){
        this.setState({
            end_time: end_time
        })
    }

    // update image state
    onFileChange(event){
        this.setState({image: event.target.files[0]});
    }

    async onSubmit(event){
        event.preventDefault();

        const auction = {
            title: this.state.title,
            start_time: this.state.start_time,
            end_time: this.state.end_time,
            image: this.state.image
        }

        console.log(auction)

        await axios.post('XXXXXXXXXXX', auction)
        .then(res => console.log(res.data))
        .catch(err => console.log(`Unable to create auction: ${err}`))

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Create New Auction</h3>

                <form onSubmit={this.onSubmit} encType="multipart/form-data">

                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text" required className="form-control"
                        name="title" value={this.state.title} onChange={this.changeHandler}/>
                    </div>

                    <div className="form-group">
                        <label>Start Time:</label>
                        <div>
                            <DatePicker selected={this.state.start_time} onChange={this.startTimeHandler}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>End Time:</label>
                        <div>
                            <DatePicker selected={this.state.end_time} onChange={this.endTimeHandler}/>
                        </div>
                    </div>

                    <div>
                        <label for="image">Upload Image</label>
                        <br/>
                        <input type="file" id="image" name="image" onChange={this.onFileChange} required />
                    </div>
                    <br/>
                    <div className="form-group">
                        <input type="submit" value="Create Auction" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }

}

export default CreateAuction;