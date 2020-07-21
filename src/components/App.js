import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3';
import Main from '../components/Main.js';

class App extends Component {

  async componentWillMount(){
    await this.loadweb3();
    await this.loadblockchaindata();
    
  }
  constructor(props)
{
  super(props);
  this.state={
    account:'',
  }
 
}
  async loadweb3()
  {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
 }

 async loadblockchaindata(){
  const web3=window.web3;
  const accounts=await web3.eth.getAccounts();
  
  this.setState({account:accounts[0]});
 }

  render() {
    return (
      <div>
     {/* <p>{this.state.account}</p> */}

      <Main></Main>
    
      </div>
    
    );
  }
}

export default App;
