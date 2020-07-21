import React, { Component } from 'react';

class Main extends Component {
    render(){
        return(
            <div>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
<link rel="stylesheet" href="App.css"></link>
<body  >
<div className="card">
<div class="Bimage">
<img className="card-img" src={ require('../components/imgs/bck.jpg') } />
</div>
    {/* <img className="card-img" src={ require('../components/imgs/bck.jpg') } /> */}
   
    <div className="card-img-overlay">
    <div class="header">
    <h1>power to power</h1>
    </div>
    <p>Units of energy</p>
    <p>Account balance</p>
<div id="main-wrapper" >

<div class="inner_container">
             
            
            <label htmlFor="surplus">Enter surplus in units</label>
            <input type="number" id="surplus" name="name" rows="1" cols="10"></input>
            <button class="back_btn" id="surplusButton">GO</button>
            <br></br>
            <label htmlFor="request">Buy units</label>
            <input type="number" id="Buy" name="buyunits" rows="1" cols="10"></input>
            <button class="back_btn" id="BuyEnergy">GO</button>
           
</div>
</div>
</div>
</div>
</body>
           
           
            </div>
            

            );

    }
   
}
export default Main;