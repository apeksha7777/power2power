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

	address payable gridAddress = address(PASTE_YOUR_GRID_ADDRESS);

	uint256 unitPrice = 100;

	event surplusSent (address energySender, address _gridAddress, uint256 _surplus);
	event energySent (address energyReceiver, address _gridAddress, uint256 _energyRequired);

	function userJoined () public {
	    require(Users[msg.sender].isJoined == false, "Already joined");
	    Users[msg.sender].isJoined = true;
	    Users[msg.sender].energy = 100;
	}

	function sendSurplus(uint256 _surplusEnergy) public payable  returns(uint256) {
	    require(_surplusEnergy > 0, "Enter right value");
	    require(Users[msg.sender].isJoined == true, "You haven't joined the network");
	    require(Users[msg.sender].energy >= _surplusEnergy, "Not enough energy to send");
	    require(Grid[gridAddress].energyStored + _surplusEnergy <= Grid[gridAddress].capacity, "Exceeds grid capacity");
	    Users[msg.sender].energy -= _surplusEnergy;
	    Grid[gridAddress].energyStored += _surplusEnergy;
        uint256 amount = unitPrice * _surplusEnergy;
	    emit surplusSent (msg.sender, gridAddress, _surplusEnergy);
	    return (amount);
	}

	function sendFund(address payable _to, uint256 _amount) public payable  {
	    _to.transfer(_amount);
	}

	function retrieveBalance () public view returns (uint256) {
	    return msg.sender.balance;
	}

	function retrieveEnergy () public view returns (uint256) {
	    return Users[msg.sender].energy;
	}

	function requestEnergy (uint256 _energyRequired) public payable  {
	    require(_energyRequired > 0, "Enter right value");
	    require(Users[msg.sender].isJoined == true, "You haven't joined the network");
	    require(msg.sender.balance >= unitPrice * _energyRequired, "Please send the right amount");
	    require(Grid[gridAddress].energyStored >= _energyRequired, "Energy not available in grid");
	    Grid[gridAddress].energyStored -= _energyRequired;
	    Users[msg.sender].energy += _energyRequired;
	    gridAddress.transfer(_energyRequired * unitPrice);
	    emit energySent (msg.sender, gridAddress, _energyRequired);
	}
}