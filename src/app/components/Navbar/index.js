import Logo from "../Logo";
import "./styles.css";
import Button from "../Button";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-side-items">
        <Logo size={80} />
      </div>
      <span className="navbar-title">Welcome to WEB 3.0</span>

      <Button />
    </div>
  );
};

export default Navbar;
