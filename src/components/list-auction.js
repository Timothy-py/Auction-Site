import React, {Component} from "react"
import axios from "axios"

import Main from './main'

import './list-auction.css'

class AuctionList extends Component{

    constructor(){
        super()

        this.state = {
            auctions: []
        }
    }

    // api request to get all auctions from the server
    componentDidMount(){
        axios.get("https://auctionapplet.herokuapp.com/api/auction/all")
        .then(response => {
            console.log("AUCTINO LIST HERE")
            console.log(response.data.data)
            this.setState({
                auctions: response.data.data
            })
        })
        .catch(error =>{
            console.log(error)
        })
    }


    render() {
        let auctionsItems = this.state.auctions.map((obj) => {
            return <Main key={obj._id} data={obj}/>
        })
        return (
             <div className="auction-section">
                 {auctionsItems}
             </div>
        );
    }
    
}

export default AuctionList;