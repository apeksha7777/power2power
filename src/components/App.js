import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3';
import Power from '../abis/Power.json';
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
    accountBalance:'',
    userEnergy:'',
  }
  this.requestEnergy = this.requestEnergy.bind(this);
  
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
  const bal=await web3.eth.getBalance(this.state.account);
  const ethbal=window.web3.utils.fromWei(bal.toString(),'Ether');
  console.log(ethbal);
  this.setState({accountBalance:ethbal});
 
 
  const abi=Power.abi;
  const networkid=await web3.eth.getId();
  const networkdata=Power.networks[networkid];
  if(networkdata)
   {
    const address=networkdata.address;
    const power=web3.eth.Contract(abi,address);
    console.log(power);
    this.setState({power});

    await this.state.power.methods.userJoined().call();
    const energyAvailable=await this.state.power.methods.retrieveEnergy().call();
    console.log(energyAvailable.toString());
    this.setState({userEnergy:energyAvailable.toString()});
   }
 
 }

requestEnergy(units)
{
  this.state.power.methods.requestEnergy(units).send({ from: this.state.account, value: units });
}


  render() {
    return (
      <div>
    
    
      <Main
      acc={this.state.account} 
      accBalance={this.state.accountBalance}
      userEnergy={this.state.userEnergy}
      requestEnergy={this.requestEnergy}
      />
    
      </div>
    
    );
  }
}

export default App;
