import Logo from "../Logo";
import "./styles.css";
import Button from "../Button";
import { useContext } from "react";
import AppContext from "../../context/AppContext";

const Navbar = () => {
  let { network, launchCampaign, tx } = useContext(AppContext);
  return (
    <div className="navbar-container">
      <div className="navbar-side-items">
        <Logo size={80} />
      </div>
      <button href="https://mumbai.polygonscan.com/address/0xEE8e44aF4fD5EEB7D5E16131e231361cf089D23a">
        {" "}
        CONTRACT{" "}
      </button>
      <button onClick={() => launchCampaign()}> Launch </button>
      {tx ? (
        <a href={`https://mumbai.polygonscan.com/tx/${tx}`}> Transaction </a>
      ) : null}
      {network !== 80001 ? "CHANGE TO POLYGON MUMBAI NETWORK" : <Button />}
    </div>
  );
};

export default Navbar;
