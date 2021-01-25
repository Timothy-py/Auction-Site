import {BrowserRouter as Router, Route} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

import Navbar from "./components/navbar"
import AuctionList from "./components/list-auction"
import CreateAuction from "./components/create-auction"

function App() {
  return (
    
    <Router>
      <div className="container-fluid">
        <Navbar />
        <br/>
        <Route path="/" exact component={AuctionList} />
        <Route path="/create" component={CreateAuction} />
      </div>
    </Router>

  );
}

export default App;