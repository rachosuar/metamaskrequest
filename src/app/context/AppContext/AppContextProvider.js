import { useEffect, useState } from "react";
import AppContext from ".";
import { ethers } from "ethers";
import abi from "../../../utils/MarketSentiment.json";

const AppContextProvider = ({ children }) => {
  let [account, setAccount] = useState();
  let [tickers, setTickers] = useState();
  let [marketSentimentInstance, setMarketSentimentInstance] = useState();
  let [error, setError] = useState();
  let [network, setNetwork] = useState();

  const contractAddr = "0xd2fDd7d7b25555e0E6e8b3D4CF25745891b2c799";
  let ethProvider;
  let ethSigner;
  let ethAccount;
  let ethNetwork;

  let contractAbi = abi.abi;

  useEffect(() => {
    async function init() {
      ethProvider = new ethers.providers.Web3Provider(window.ethereum);
      ethSigner = ethProvider.getSigner();

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

      ethNetwork = await ethProvider.getNetwork();
      setNetwork(ethNetwork.chainId);
    }

    init();
  }, []);

  useEffect(() => {
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
    connectWallet();
  }, [network, account]);

  async function addNegative(_ticker) {
    try {
      let vote = await marketSentimentInstance.voteNegative(_ticker);
      vote.wait();
    } catch (err) {
      let reason = err.reason.replace("execution reverted: ", "");
      setError({ ticker: `${_ticker}`, message: `${reason} on ${_ticker}` });
    }
  }
  async function addPositive(_ticker) {
    try {
      let vote = await marketSentimentInstance.votePositive(_ticker);
      vote.wait();
    } catch (err) {
      let reason = err.reason.replace("execution reverted: ", "");
      setError({ ticker: `${_ticker}`, message: `${reason} on ${_ticker}` });
    }
  }

  return (
    <AppContext.Provider
      value={{
        setAccount,
        account,
        marketSentimentInstance,
        tickers,
        error,
        addNegative,
        addPositive,
        network,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
