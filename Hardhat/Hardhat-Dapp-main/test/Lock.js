const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("Lock", async function () {
  let data;

  beforeEach(async () => {
    const Lock = await ethers.getContractFactory("Lock");
    const lock = await Lock.deploy("Hello, world!");
    await lock.deployed();
    data = lock;
  })
  it("should return the new greeting once it's changed", async function () {

    // expect(await data.greet()).to.equal("Hello, world!");
    assert.equal(await data.greet(), "Hello, world!");
  });

  it("Should assign the new value to greeting variable", async function () {
    const setGreetingTx = await data.setGreeting("Hello, rabees!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await data.greet()).to.equal("Hello, rabees!");

  })
});