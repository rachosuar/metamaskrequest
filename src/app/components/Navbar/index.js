import Logo from "../Logo";
import "./styles.css";
import Button from "../Button";
import { useContext } from "react";
import AppContext from "../../context/AppContext";

const Navbar = () => {
  let { network } = useContext(AppContext);
  return (
    <div className="navbar-container">
      <div className="navbar-side-items">
        <Logo size={80} /> <h3 className="sentiment">Sentiment</h3>
      </div>
      <span className="navbar-title">Market Sentiment</span>
      {network !== 80001 ? "CHANGE TO POLYGON MUMBAI NETWORK" : <Button />}
    </div>
  );
};

export default Navbar;
