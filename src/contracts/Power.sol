pragma solidity ^0.5.0;

contract Power {
	constructor () public {
	    Grid[gridAddress].capacity = 1000;
	    Grid[gridAddress].amount = 100;
	    Grid[gridAddress].energyStored = 0;
	}
	struct grid {
 		uint256 energyStored;
		uint256 capacity;
		uint256 amount;
	}

	struct user {
	    uint256 energy;
	    bool isJoined;
	}

	mapping (address => user) Users;
	mapping (address => grid) Grid;
<<<<<<< HEAD

	address payable gridAddress = address(0xe312dD1FC5AdeEa1b4FabD6a46cA86f5f8c6D891);
=======
	
	address payable gridAddress = address(PASTE_GRID_ADDRESS_HERE);
>>>>>>> 64e035a82ba8bc7039754c25f84a9a3e09d36bf5
	uint256 unitPrice = 100;

	event surplusSent (address energySender, address _gridAddress, uint256 _surplus);
	event energySent (address energyReceiver, address _gridAddress, uint256 _energyRequired);

	function userJoined () public {
	    require(Users[msg.sender].isJoined == false, "Already joined");
	    Users[msg.sender].isJoined = true;
	    Users[msg.sender].energy = 100;
	}
<<<<<<< HEAD

	function sendSurplus(uint256 _surplusEnergy) public payable {
	    require(_surplusEnergy != 0, "Enter right value");
=======
	
	function sendSurplus(uint256 _surplusEnergy) payable public returns(address, uint256) {
	    require(_surplusEnergy > 0, "Enter right value");
	    require(Users[msg.sender].isJoined == true, "You haven't joined the network");
>>>>>>> 64e035a82ba8bc7039754c25f84a9a3e09d36bf5
	    require(Users[msg.sender].energy >= _surplusEnergy, "Not enough energy to send");
	    require(Grid[gridAddress].energyStored + _surplusEnergy <= Grid[gridAddress].capacity, "Exceeds grid capacity");
	    Users[msg.sender].energy -= _surplusEnergy;
	    Grid[gridAddress].energyStored += _surplusEnergy;
        uint256 amount = unitPrice * _surplusEnergy;
	    emit surplusSent (msg.sender, gridAddress, _surplusEnergy);
	    return (msg.sender, amount);
	}
	
	function sendFund(address payable _to, uint256 _amount) payable public {
	    _to.transfer(_amount);
	}

	function retieveBalance () public view returns (uint256) {
	    return msg.sender.balance;
	}

	function retrieveEnergy () public view returns (uint256) {
	    return Users[msg.sender].energy;
	}
<<<<<<< HEAD

	function requestEnergy (uint256 _energyRequired) public payable{
	    require(_energyRequired != 0, "Enter right value");
=======
	
	function requestEnergy (uint256 _energyRequired) payable public {
	    require(_energyRequired > 0, "Enter right value");
	    require(Users[msg.sender].isJoined == true, "You haven't joined the network");
>>>>>>> 64e035a82ba8bc7039754c25f84a9a3e09d36bf5
	    require(msg.value >= unitPrice * _energyRequired, "Please send the right amount");
	    require(Grid[gridAddress].energyStored >= _energyRequired, "Energy not available in grid");
	    Grid[gridAddress].energyStored -= _energyRequired;
	    Users[msg.sender].energy += _energyRequired;
	    gridAddress.transfer(msg.value);
	    emit energySent (msg.sender, gridAddress, _energyRequired);
	}
}
