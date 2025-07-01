// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ConnectToken is ERC20, Ownable {
    constructor(string memory name, string memory symbol) Ownable(msg.sender) ERC20(name, symbol) {}
    function mint(address to, uint256 amount) external onlyOwner { _mint(to, amount); }
    function burn(address from, uint256 amount) external onlyOwner { _burn(from, amount); }
}

contract ConnectFunBonding is ReentrancyGuard {
    using SafeERC20 for IERC20;
    ConnectToken public token;
    IERC20 public reserve;
    uint256 public coefficient;  // scaling
    uint256 public PREC = 1e18;
    mapping(address => uint256) public bookedMinutes;
    address public immutable creator;

    event TimeBooked(address indexed user, uint256 _minutes);
    event SessionConfirmed(address indexed user, uint256 _minutes);

    constructor(IERC20 _reserve, uint256 _coef, address _token) {
        reserve = _reserve;
        coefficient = _coef;
        token = ConnectToken(_token);
        creator = msg.sender;
    }

    function priceIntegral(uint256 supply) internal view returns (uint256) {
        // example: P(s) = coef * s^2 ⇒ ∫ = coef * s^3 / 3
        return coefficient * supply * supply * supply / (3 * PREC);
    }

    function costToMint(uint256 amount) public view returns (uint256) {
        uint256 s0 = token.totalSupply();
        return priceIntegral(s0 + amount) - priceIntegral(s0);
    }

    function rewardOnBurn(uint256 amount) public view returns (uint256) {
        uint256 s0 = token.totalSupply();
        require(amount <= s0, "overburn");
        return priceIntegral(s0) - priceIntegral(s0 - amount);
    }

    function buy(uint256 amount, uint256 maxPay) external nonReentrant {
        uint256 cost = costToMint(amount);
        require(cost <= maxPay, "slippage");
        reserve.safeTransferFrom(msg.sender, address(this), cost);
        token.mint(msg.sender, amount);
    }

    function sell(uint256 amount, uint256 minRefund) external nonReentrant {
        uint256 refund = rewardOnBurn(amount);
        require(refund >= minRefund, "slippage");
        token.burn(msg.sender, amount);
        reserve.safeTransfer(msg.sender, refund);
    }

    function bookTime(uint256 _minutes) external {
        require(_minutes > 0, "Invalid booking");
        token.burn(msg.sender, _minutes);
        bookedMinutes[msg.sender] += _minutes;

        emit TimeBooked(msg.sender, _minutes);
    }

    function confirmSession(address user, uint256 _minutes) external {
        require(msg.sender == creator, "Only creator can confirm");
        require(bookedMinutes[user] >= _minutes, "Not enough booked");

        bookedMinutes[user] -= _minutes;

        emit SessionConfirmed(user, _minutes);
    }
}
