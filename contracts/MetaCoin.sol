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
    event DepositReceived(address indexed beneficiary, uint256 amount, uint256 gasprice);

    address payable public buildingOwner;
    uint public percentmille = 2000;

    constructor() public {}

    function setBuidlingOwner(address payable _buildingOwner) onlyOwner public {
      buildingOwner = _buildingOwner;
    }

    function payCharge() payable public {
      uint serviceCharge = msg.value / 100000 * percentmille;
      buildingOwner.transfer(msg.value - serviceCharge);
      owner.transfer(serviceCharge);
      emit DepositReceived(msg.sender, msg.value, tx.gasprice);
    }

}
