const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const signers = {};
let defaultSigner;
let ticketsContractFactory;
let ticketsContractInstance;
let ticketsContractAddr;

describe("Deploy", function () {
  it("Should deploy the contract", async function () {
    [defaultSigner] = await ethers.getSigners();
    ticketsContractFactory = await ethers.getContractFactory(
      "FirstDapp",
      defaultSigner
    );
    ticketsContractInstance = await ticketsContractFactory.deploy();

    await ticketsContractInstance.deployed();
    ticketsContractAddr = ticketsContractInstance.address;
  });
});
describe("Create Ticket", function () {
  it("Should be able to create tickets", async function () {
    const createTicket = await ticketsContractInstance.createTicket("BTC");
    createTicket.wait();
    const ticketsResult = await ticketsContractInstance.getTickets();
    expect(ticketsResult[0]).to.be.equal("BTC");
  });
  it("Should only create tickets if don't exist already", async function () {
    const createTicket = ticketsContractInstance.createTicket("BTC");

    expect(createTicket).to.be.revertedWith("Ticket already exist");
  });

  it("Only owner should be able to create tickets", async function () {
    const [firstUser] = await ethers.getSigners();
    signers.firstUser = firstUser;

    const firsUserTx = ticketsContractInstance.createTicket("MATI");

    expect(firsUserTx).to.be.revertedWith("Ownable: caller is not the owner");
  });
});
describe("Allow votation", function () {
  it("Should allow user to  vote positive", async function () {
    const [firstUser] = await ethers.getSigners();
    signers.firstUser = firstUser;

    const firsUserVote = await ticketsContractInstance.votePositive("BTC");
    firsUserVote.wait();
    const result = await ticketsContractInstance.getPositiveVotes("BTC");
    expect(result).to.be.equal(1);
  });
  it("Should allow user to  vote negative", async function () {
    const [firstUser] = await ethers.getSigners();
    signers.firstUser = firstUser;

    const firstUserVote = await ticketsContractInstance.voteNegative("MATI");
    firstUserVote.wait();
    const result = await ticketsContractInstance.getNegativeVotes("MATI");
    expect(result).to.be.equal(1);
  });
  it("Shouldn't allow user to vote twice", async function () {
    const [firstUser] = await ethers.getSigners();
    signers.firstUser = firstUser;
    const firsUserVote = ticketsContractInstance.votePositive("MATI");
    expect(firsUserVote).to.be.revertedWith("This address has already voted");
    const firstUserVote = ticketsContractInstance.voteNegative("BTC");
    expect(firstUserVote).to.be.revertedWith("This address has already voted");
  });
});
