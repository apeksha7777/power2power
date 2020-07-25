import React, { Component } from 'react';

class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
           buffer:null
        }
        // console.log(this.props);
    }

    render(){
        return(
            <div>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"></link>
                <link rel="stylesheet" href="App.css"></link>
                <div className="card">
                    <div className="Bimage">
                        <img className="card-img" src={ require('../components/imgs/bck.jpg') } />
                    </div>
                    <div className="card-img-overlay">
                        <div className="header">
                            <h1>power to power</h1>
                        </div>
                        <div id="energy" >
                            <p>Units of energy</p>
                            {this.props.userEnergy}
                        </div>
                        <div id="balance">
                            <p>Account balance</p>
                            {this.props.accBalance}
                        </div>

                        <div id="main-wrapper" >
                            <div className="inner_container">
                                <label htmlFor="surplus">Sell surplus units</label>
                                <input type="number" placeholder="units" id="Surplus" name="name" rows="1" cols="10"></input>
                                <button className="back_btn" id="surplusButton"
                                onClick={(event)=>{
                                    console.log("sell button clicked")
                                    this.props.sendSurplus(document.getElementById('Surplus').value)
                                }}
                                >SELL</button>
                                <br></br>
                                <label htmlFor="request">Buy units</label>
                                <input type="number" placeholder="units" id="Buy" name="buyunits" rows="1" cols="10"></input>
                                <button className="back_btn" id="BuyEnergy" 
                                onClick={(event)=>{
                                    console.log("buy button clicked")
                                    this.props.requestEnergy(document.getElementById('Buy').value)
                                }}
                                >BUY</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Main;