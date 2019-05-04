pragma solidity >=0.4.21 <0.6.0;

import './Ownable.sol';

contract MetaCoin is Ownable {
    /*
    struct Charge {
      address box;
      uint value;
    }

    mapping (address => Charge) charges;
    address[] public chargesArr;
    */

    address public buildingOwner;
    uint public percentmille = 2000;

    constructor() public {
    }

    function setBuidlingOwner(address _buildingOwner) onlyOwner public {
      buildingOwner = _buildingOwner;
    }

    function payCharge() payable public {
    }

}
