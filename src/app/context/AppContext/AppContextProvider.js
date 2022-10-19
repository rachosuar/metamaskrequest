import { useEffect, useState } from "react";
import AppContext from ".";
import { ethers } from "ethers";

const AppContextProvider = ({ children }) => {
  let ethereum = window.ethereum;

  let [account, setAccount] = useState(null);
  let [balance, setBalance] = useState(null);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    let getAdress = async () => {
      await ethereum
        .request({ method: "eth_accounts" })
        .then((res) => setAccount(...res));
    };
    getAdress();
  }, []);

  let metaClick = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  useEffect(() => {
    let getBalance = async (address) => {
      await ethereum
        .request({
          method: "eth_getBalance",
          params: [address, "latest"],
        })
        .then((res) => {
          setBalance(ethers.utils.formatEther(res).slice(0, 6));
        });
    };
    if (account) {
      getBalance(account);
    } else {
      setAccount(null);
    }
  }, [account]);
  ethereum.on("accountsChanged", (acc) => {
    setAccount(acc);
  });

  return (
    <AppContext.Provider value={{ account, setAccount, balance, metaClick }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
