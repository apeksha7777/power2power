import React, { Component } from 'react';

class Main extends Component {
    constructor(props){
        super(props);
        
        this.state={
           buffer:null
        }
        console.log(this.props);
        
    }
   
    render(){
        return(
<div>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
<link rel="stylesheet" href="App.css"></link>
<div className="card">
    <div class="Bimage">
        <img className="card-img" src={ require('../components/imgs/bck.jpg') } />
    </div>
    <div className="card-img-overlay">
        <div class="header">
            <h1>power to power</h1>
        </div>
        <div id="energy" >
            <p>Units of energy</p>
            
            {/* <p>{this.props.acc}</p> */}
            
        </div>
        <div id="balance">
            <p>Account balance</p>
        </div>
        
        <div id="main-wrapper" >
            <div class="inner_container">
             
                <label htmlFor="surplus">Sell surplus units</label>
                <input type="number" placeholder="units" id="surplus" name="name" rows="1" cols="10"></input>
                <button class="back_btn" id="surplusButton">SELL</button>
                <br></br>
                <label htmlFor="request">Buy units</label>
                <input type="number" placeholder="units" id="Buy" name="buyunits" rows="1" cols="10"></input>
                <button class="back_btn" id="BuyEnergy">BUY</button>
           
            </div>
        </div>
    </div>
</div>
</div>
        );
    }
}
export default Main;