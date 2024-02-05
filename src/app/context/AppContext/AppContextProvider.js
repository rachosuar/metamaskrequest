import { useEffect, useState } from "react";
import AppContext from ".";
import { ethers } from "ethers";
import abi from "../../../utils/EwolCampaignRegistry.json";

const AppContextProvider = ({ children }) => {
  let [account, setAccount] = useState();
  let [tickers, setTickers] = useState();
  // let [ewolCampaignInstance, setEwolCampaignInstance] = useState();
  let [numberOfCampaigns, setNumberOfCampaigns] = useState(null);
  let [error, setError] = useState();
  let [network, setNetwork] = useState();
  let [tx, setTx] = useState("");

  // Stablecoin 0x057e6E597D93d19d26b1c7Af1040667906d4c0a7
  let ewolCampaignInstance;
  const contractAddr = "0xEE8e44aF4fD5EEB7D5E16131e231361cf089D23a";
  let ethProvider;
  let ethSigner;

  let contractAbi = abi.abi;

  useEffect(() => {
    async function init() {
      ethProvider = new ethers.providers.Web3Provider(window.ethereum);
      ethSigner = ethProvider.getSigner();

      ewolCampaignInstance = new ethers.Contract(
        contractAddr,
        contractAbi,
        ethSigner
      );
      window.ethProvider = ethProvider;
      window.ethSigner = ethSigner;
      // setMarketSentimentInstance(marketSentimentInstance);
      // let tick = await marketSentimentInstance.getTickets();
      // setTickers(tick);
      // setMarketSentimentInstance(marketSentimentInstance);

      let ethNetwork = await ethProvider.getNetwork();
      setNetwork(ethNetwork.chainId);
    }

    init();
  }, [account]);

  useEffect(() => {
    if (network !== 80001) {
      try {
        window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x13881" }],
        });
      } catch (err) {
        if (err == 4902) {
          window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x13881",
                rpcUrl: "https://rpc-mumbai.maticvigil.com",
                chainName: "Polygon Testnet Mumbai",
                nativeCurrency: {
                  name: "tMATIC",
                  symbol: "tMATIC", // 2-6 characters long
                  decimals: 18,
                },
              },
            ],
          });
        }
      }
    }
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
        let ethAccount = accounts[0];

        setAccount(ethAccount);
      }
    }
    connectWallet();
  }, [account]);
  console.log(ewolCampaignInstance);
  async function launchCampaign() {
    const name = "new campaign";
    const target = 5;
    const investmentPerEwoler = 1000;
    const token = "0x057e6E597D93d19d26b1c7Af1040667906d4c0a7";
    const weeks = 5;
    const premitAmmount = 1;
    let create = await ewolCampaignInstance.launchCampaign(
      name,
      target,
      investmentPerEwoler,
      token,
      weeks,
      premitAmmount
    );
    create.wait();
    setTx(create.hash);
  }

  // async function addNegative(_ticker) {
  //   try {
  //     let vote = await marketSentimentInstance.voteNegative(_ticker);
  //     vote.wait();
  //   } catch (err) {
  //     let reason = err.reason.replace("execution reverted: ", "");
  //     setError({ ticker: `${_ticker}`, message: `${reason} on ${_ticker}` });
  //   }
  // }
  // async function addPositive(_ticker) {
  //   try {
  //     let vote = await marketSentimentInstance.votePositive(_ticker);
  //     vote.wait();
  //   } catch (err) {
  //     let reason = err.reason.replace("execution reverted: ", "");
  //     setError({ ticker: `${_ticker}`, message: `${reason} on ${_ticker}` });
  //   }
  // }

  return (
    <AppContext.Provider
      value={{
        setAccount,
        account,
        tickers,
        error,
        network,
        launchCampaign,
        tx,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
