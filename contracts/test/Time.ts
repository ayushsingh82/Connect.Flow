import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer } from "ethers";
import { ConnectToken, ConnectFunBonding, ConnectFunFactory, ERC20Mock } from "../typechain-types";

describe("ConnectFunBonding", function () {
  let factory: ConnectFunFactory;
  let bonding: ConnectFunBonding;
  let token: ConnectToken;
  let usdc: ERC20Mock;
  let owner: Signer;
  let alice: Signer;
  let bob: Signer;

  beforeEach(async () => {
    [owner, alice, bob] = await ethers.getSigners();

    const ERC20Mock = await ethers.getContractFactory("ERC20Mock");
    usdc = (await ERC20Mock.deploy("Mock USD", "USDC")) as ERC20Mock;
    await usdc.waitForDeployment();

    // Mint USDC to users
    const mintAmount = ethers.parseUnits("10000", 18);
    await usdc.mint(await alice.getAddress(), mintAmount);
    await usdc.mint(await bob.getAddress(), mintAmount);

    const Factory = await ethers.getContractFactory("ConnectFunFactory");
    factory = (await Factory.deploy(
      usdc.target,
      ethers.parseUnits("1", 18)
    )) as ConnectFunFactory;
    await factory.waitForDeployment();

    await factory.connect(alice).registerCreator("AliceToken", "ALC");

    const creatorInfo = await factory.getCreator(await alice.getAddress());

    const ConnectFunBonding = await ethers.getContractFactory("ConnectFunBonding");
    bonding = ConnectFunBonding.attach(creatorInfo.bondingContract) as ConnectFunBonding;

    const ConnectToken = await ethers.getContractFactory("ConnectToken");
    token = ConnectToken.attach(creatorInfo.token) as ConnectToken;
  });

  it("should allow buying time tokens", async () => {
    const amountToBuy = 10;
    const maxPay = ethers.parseUnits("10000", 18);

    await usdc.connect(alice).approve(bonding.target, maxPay);
    await bonding.connect(alice).buy(amountToBuy, maxPay);

    const balance = await token.balanceOf(await alice.getAddress());
    expect(balance).to.equal(amountToBuy);
  });

  it("should allow selling time tokens", async () => {
    const amountToBuy = 5;
    const maxPay = ethers.parseUnits("1000", 18);

    await usdc.connect(alice).approve(bonding.target, maxPay);
    await bonding.connect(alice).buy(amountToBuy, maxPay);

    const refund = await bonding.rewardOnBurn(amountToBuy);
    await token.connect(alice).approve(bonding.target, amountToBuy);
    await bonding.connect(alice).sell(amountToBuy, refund);

    const balance = await token.balanceOf(await alice.getAddress());
    expect(balance).to.equal(0);
  });

  it("should prevent underpayment", async () => {
    const expectedCost = await bonding.costToMint(10);
    const tooLow = expectedCost * (90n) / 100n; // 10% underpay

    await usdc.connect(alice).approve(bonding.target, tooLow);
    await expect(
      bonding.connect(alice).buy(10, tooLow)
    ).to.be.revertedWith("slippage");
  });

  it("should revert if refund is below minRefund", async () => {
    const maxPay = ethers.parseUnits("1000", 18);
    await usdc.connect(alice).approve(bonding.target, maxPay);
    await bonding.connect(alice).buy(5, maxPay);

    await token.connect(alice).approve(bonding.target, 5);

    const minRefund = ethers.parseUnits("10000", 18); // too high
    await expect(
      bonding.connect(alice).sell(5, minRefund)
    ).to.be.revertedWith("slippage");
  });

  it("should increase cost non-linearly (quadratic curve)", async () => {
    const cost1 = await bonding.costToMint(1);
    const cost3 = await bonding.costToMint(3);
    const cost5 = await bonding.costToMint(5);

    expect(cost3).to.be.gt(cost1 * 3n); // quadratic increase
    expect(cost5).to.be.gt(cost3 * 5n / 3n);
  });

  it("should track reserve after buys and sells", async () => {
    const buyAmount = 4;
    const cost = await bonding.costToMint(buyAmount);
    await usdc.connect(alice).approve(bonding.target, cost);
    await bonding.connect(alice).buy(buyAmount, cost);

    const refund = await bonding.rewardOnBurn(buyAmount);
    await token.connect(alice).approve(bonding.target, buyAmount);
    await bonding.connect(alice).sell(buyAmount, refund);

    const reserveAfter = await usdc.balanceOf(bonding.target);
    expect(reserveAfter).to.be.closeTo(0, ethers.parseUnits("0.001", 18)); // rounding tolerance
  });

  it("should revert if creator registers twice", async () => {
    await expect(
      factory.connect(alice).registerCreator("Duplicate", "DUP")
    ).to.be.revertedWith("Already registered");
  });
});
