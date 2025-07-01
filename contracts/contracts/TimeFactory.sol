// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { ConnectFunBonding, ConnectToken } from "./Time.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ConnectFunFactory is Ownable {
    struct CreatorInfo {
        address bondingContract;
        address token;
        bool registered;
    }

    mapping(address => CreatorInfo) public creators;

    address public reserveToken;
    uint256 public defaultCoefficient;

    event CreatorRegistered(address indexed creator, address bonding, address token);

    constructor(address _reserveToken, uint256 _defaultCoefficient) Ownable(msg.sender) {
        reserveToken = _reserveToken;
        defaultCoefficient = _defaultCoefficient;
    }

    function registerCreator(string memory name, string memory symbol) external {
        require(!creators[msg.sender].registered, "Already registered");

        // Deploy new ConnectToken
        ConnectToken token = new ConnectToken(name, symbol);

        // Deploy new Bonding contract
        ConnectFunBonding bonding = new ConnectFunBonding(
            IERC20(reserveToken),
            defaultCoefficient,
            address(token)
        );

        // Transfer ownership of the bonding contract to the creator
        token.transferOwnership(address(bonding));

        creators[msg.sender] = CreatorInfo({
            bondingContract: address(bonding),
            token: address(token),
            registered: true
        });

        emit CreatorRegistered(msg.sender, address(bonding), address(token));
    }

    function getCreator(address creator) external view returns (CreatorInfo memory) {
        return creators[creator];
    }
}
