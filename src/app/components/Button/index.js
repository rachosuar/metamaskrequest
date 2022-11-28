import "./styles.css";
import metaimg from "../../../assets/images/meta.png";
import metagif from "../../../assets/images/metamask.gif";
import { useContext, useState } from "react";

import AppContext from "../../context/AppContext";

const Button = (props) => {
  const { children, loading } = props;
  const fullClassName = ["button"];
  let { connectWallet, account } = useContext(AppContext);

  const [image, setImage] = useState(metaimg);

  let changeImage = () => {
    setImage(metagif);
  };
  let backToImage = () => {
    setImage(metaimg);
  };

  return (
    <div className="img-container">
      {!account ? (
        <img
          className="meta-img"
          src={image}
          height={90}
          {...props}
          onMouseEnter={changeImage}
          onMouseLeave={backToImage}
          onClick={connectWallet}
        >
          {loading && "loading.."}
        </img>
      ) : (
        <h3 className="accounttag">{`${account.slice(0, 4)}....${account.slice(
          -5,
          -1
        )}`}</h3>
      )}
    </div>
  );
};

export default Button;
