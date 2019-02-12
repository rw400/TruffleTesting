pragma solidity ^0.5.0;

contract HelloWorld {

    string public message;
    uint public total;
    address owner;

    constructor(string memory _message) public {
        owner = msg.sender;
        message = _message;

    }

    function updateMessage (string memory _newMessage) public {
        require (msg.sender == owner,"not owner");
        message = _newMessage;
    }

    function add (uint _num1, uint _num2) public {
        total = _num1 + _num2;
    }

    function updateOwner (address _newOwner) public {
        require (msg.sender == owner, "not the current owner");
        owner = _newOwner;
    }


}