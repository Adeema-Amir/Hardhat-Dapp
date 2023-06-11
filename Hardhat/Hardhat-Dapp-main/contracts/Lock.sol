// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Lock {
    string private greeting;

    constructor(string memory _greeting) {
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log(
            "The greeting will be change from %s to %s",
            greeting,
            _greeting
        );
        greeting = _greeting;
    }
}
