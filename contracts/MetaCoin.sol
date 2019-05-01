pragma solidity >=0.4.21 <0.6.0;

import './Ownable.sol';

// make ownable
contract MetaCoin is Ownable {
    struct Charge {
      address box;
      uint value;
    }

    mapping (address => Charge) charges;
    address[] public chargesArr;

    constructor() public {
    }

}
