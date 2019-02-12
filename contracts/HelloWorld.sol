pragma solidity ^0.5.0;

contract HelloWorld {

    string public message;
    uint public value;
    uint public sum;
    address owner;

    constructor(string memory _message, uint _value) public {
        owner = msg.sender;
        message = _message;
        value = _value;
    }

    modifier onlyOwner(){
        require (msg.sender == owner,"not owner");
        _;
    }

    function updateMessage (string memory _newMessage) public onlyOwner {
        message = _newMessage;
    }

    function updateValue (uint _value) public onlyOwner {
        value = _value;
    }
    
    function add (uint _num1, uint _num2) public {
        sum = _num1 + _num2;
    }

    function transferOwner (address _newOwner) public onlyOwner {
        owner = _newOwner;
    }
}