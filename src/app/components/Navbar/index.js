import Logo from "../Logo";
import "./styles.css";
import Button from "../Button";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-side-items">
        <Logo size={80} /> <h3 className="sentiment">Sentiment</h3>
      </div>
      <span className="navbar-title">Market Sentiment</span>

      <Button />
    </div>
  );
};

export default Navbar;
