require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const fs = require("fs");
const util = require("util");
const ethers = require("ethers");
const fsPromises = fs.promises;

const ABI_FILE_PATH =
  "artifacts/contracts/MarketSentiment.sol/FirstDapp.dbg.json";
const DEPLOYED_CONTRACT_ADDRESS = "0xd2fDd7d7b25555e0E6e8b3D4CF25745891b2c799";

async function getAbi() {
  const data = await fsPromises.readFile(ABI_FILE_PATH, "utf8");
}
