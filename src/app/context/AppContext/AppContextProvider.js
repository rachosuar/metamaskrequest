import { useEffect, useState } from "react";
import AppContext from ".";
import { ethers } from "ethers";

const AppContextProvider = ({ children }) => {
  console.log();
  let ethereum = window.ethereum;
  let [tickers, setTickers] = useState([]);
  let [account, setAccount] = useState(null);
  console.log(tickers);

  let voteEthPos = 20;
  let voteEthNeg = 12;
  let voteBtcPos = 6;
  let voteBtcNeg = 10;
  let voteMatPos = 10;
  let voteMatNeg = 16;

  let addPositive = (name) => {
    if (name === "ETH") {
      voteEthPos++;
    } else if (name === "BTC") {
      voteBtcPos++;
    } else {
      voteMatPos++;
    }
    console.log(tickers);
  };

  let addNegative = (name) => {
    if (name === "ETH") {
      voteEthPos--;
    } else if (name === "BTC") {
      voteBtcPos--;
    } else {
      voteMatPos--;
    }
  };

  useEffect(() => {
    if (ethereum) {
      let getAdress = async () => {
        await ethereum
          .request({ method: "eth_accounts" })
          .then((res) => setAccount(...res));
      };
      ethereum.on("connect", () => getAdress());
    }
  }, []);

  useEffect(() => {
    let ETHelemnt = {
      name: "ETH",
      votesPositive: voteEthPos,
      votesNegative: voteEthNeg,
    };
    let BTCelemnt = {
      name: "BTC",
      votesPositive: voteBtcPos,
      votesNegative: voteBtcNeg,
    };
    let MATICelemnt = {
      name: "MATIC",
      votesPositive: voteMatPos,
      votesNegative: voteMatNeg,
    };

    let newArr = [];
    newArr.push(ETHelemnt, BTCelemnt, MATICelemnt);
    setTickers([...newArr]);
  }, []);

  let metaClick = async () => {
    await ethereum
      .request({ method: "eth_requestAccounts" })
      .then((res) => accountChangeHandler(...res))
      .catch((err) => {
        if (err.code === 4001) {
          console.log("Please connect to MetaMask.");
        } else {
          console.error(err);
        }
      });
  };
  let accountChangeHandler = (newAccount) => {
    setAccount(newAccount);
  };

  // useEffect(() => {
  //   let getBalance = async (address) => {
  //     await ethereum
  //       .request({
  //         method: "eth_getBalance",
  //         params: [address, "latest"],
  //       })
  //       .then((res) => {
  //         setBalance(ethers.utils.formatEther(res));
  //       });
  //   };
  //   if (account) {
  //     getBalance(account);
  //   } else {
  //     setAccount(null);
  //   }
  // }, [account]);
  // ethereum?.on("accountsChanged", (acc) => {
  //   setAccount(...acc);
  // });

  return (
    <AppContext.Provider
      value={{
        account,
        setAccount,
        metaClick,
        tickers,
        addPositive,
        addNegative,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
