import { useEffect, useState } from "react";
import AppContext from ".";
import { ethers } from "ethers";
import abi from "../../../utils/MarketSentiment.json";

const AppContextProvider = ({ children }) => {
  let [account, setAccount] = useState();
  let [tickers, setTickers] = useState();
  let [marketSentimentInstance, setMarketSentimentInstance] = useState();

  const contractAddr = "0xd2fDd7d7b25555e0E6e8b3D4CF25745891b2c799";
  let ethProvider;
  let ethSigner;
  let ethAccount;
  let ethNetwork;

  let contractAbi = abi.abi;

  useEffect(() => {
    async function init() {
      ethProvider = new ethers.providers.Web3Provider(window.ethereum);
      ethSigner = await ethProvider.getSigner();

      let marketSentimentInstance = new ethers.Contract(
        contractAddr,
        contractAbi,
        ethSigner
      );
      window.ethProvider = ethProvider;
      window.ethSigner = ethSigner;
      // setMarketSentimentInstance(marketSentimentInstance);
      let tick = await marketSentimentInstance.getTickets();
      setTickers(tick);
      setMarketSentimentInstance(marketSentimentInstance);

      return {
        ethNetwork: await ethProvider.getNetwork(),
      };
    }

    init();
  }, []);

  async function connectWallet() {
    const connectPromise = await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(handleAccountsChanged)
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log("Please connect to MetaMask.");
        } else {
          console.error(err);
        }
      });
    setAccount(connectPromise.account);
    return connectPromise;
  }
  window.ethereum.on("accountsChanged", handleAccountsChanged);
  // For now, 'eth_accounts' will continue to always return an array
  async function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log("Please connect to MetaMask.");
      return false;
    } else {
      ethAccount = accounts[0];

      return {
        account: ethAccount,
        network: ethNetwork,
      };
    }
  }

  async function signMessage(message) {
    if (!ethSigner) {
      return null;
    }
    const signature = await ethSigner.signMessage(message);
    return signature;
  }

  async function addNegative(_ticker) {
    let vote = await marketSentimentInstance.voteNegative(_ticker);
    vote.wait();
  }
  async function addPositive(_ticker) {
    let vote = await marketSentimentInstance.votePositive(_ticker);
    vote.wait();
    console.log(vote);
  }

  return (
    <AppContext.Provider
      value={{
        connectWallet,
        setAccount,
        account,
        marketSentimentInstance,
        tickers,

        addNegative,
        addPositive,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
