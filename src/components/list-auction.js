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
        var index = 0
        let auctionsItems = this.state.auctions.map((obj) => {
            for (var i=0; i<this.state.auctions.length; i++){
                index = i
            }
            return <Main key={index} data={obj}/>
        })
        return (
             <div className="auction-section">
                 {auctionsItems}
             </div>
        );
    }
    
}

export default AuctionList;