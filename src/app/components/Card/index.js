import "./styles.css";
import ethelogo from "../../../assets/images/etherlogo.png";
import polylogo from "../../../assets/images/polygonlogo.png";

const Card = ({ className = "card", account, balance }) => {
  return (
    <div className={className}>
      {window.ethereum ? (
        <>
          {account ? (
            <>
              <span className="card-conected"> CONECTED TO {account}</span>
              <span className="card-conected"> BALANCE: {balance}</span>
            </>
          ) : (
            <span className="card-conected">CONECT YOUR WALLET</span>
          )}
        </>
      ) : (
        <span className="card-disconected"> INSTALL METAMASK EXTENTION</span>
      )}
      <div className="cardimgs">
        <img src={ethelogo} height="100px" alt="ethereum"></img>
        <img src={polylogo} height="100px" alt="ethereum"></img>
      </div>
    </div>
  );
};

export default Card;
