import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import Power from '../abis/Power.json';
import Main from '../components/Main.js';

class App extends Component {

  async componentWillMount() {
    await this.loadweb3();
    await this.loadblockchaindata();
  }
  
  constructor(props) {
    super(props);
    this.state={
      gridAddr:0xA8f61F59d6b2a6Fe84ca7054a65AfEaf610462e5,
      account:'',
      accountBalance:'',
      sendSurplus:'',
      userEnergy:'',
    }
    this.requestEnergy = this.requestEnergy.bind(this);
    this.sendSurplus = this.sendSurplus.bind(this)
  }

  async loadweb3() {
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

  async loadblockchaindata() {
    const web3=window.web3;
    const accounts=await web3.eth.getAccounts();
    this.setState({account:accounts[0]});
    const bal=await web3.eth.getBalance(this.state.account);
    const ethbal=window.web3.utils.fromWei(bal.toString(),'Ether');
    this.setState({accountBalance:ethbal});
    const networkId=await web3.eth.net.getId();
    const networkData=Power.networks[networkId];
    if(networkData) {
      const power=web3.eth.Contract(Power.abi,networkData.address)
      this.setState({power})
      await this.state.power.methods.userJoined().send({from:this.state.account})
      const energyAvailable=await this.state.power.methods.retrieveEnergy().call({from: this.state.account})
      this.setState({userEnergy:energyAvailable.toString()})
      // console.log(this.state.userEnergy)
    }
  }

  sendSurplus(units) {
    this.state.power.methods.sendSurplus(units).send({from: this.state.account, value: units}).then(function(amt) {
        console.log(amt)
        // this.state.power.methods.sendFund(this.state.account, amt).send({from: this.state.gridAddr, value: amt});
      });
  }

  requestEnergy(units) {
    this.state.power.methods.requestEnergy(units).send({ from: this.state.account, value: units*100 });
  }

  render() {
    return (
      <div>    
        <Main
        acc={this.state.account} 
        accBalance={this.state.accountBalance}
        userEnergy={this.state.userEnergy}
        sendSurplus={this.sendSurplus}
        requestEnergy={this.requestEnergy}
        />
      </div>
    );
  }
}

export default App;