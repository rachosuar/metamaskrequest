import "./styles.css";
import Bubble from "../Bubble";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
const Card = ({ className = "card", account, balance }) => {
  let { tickers } = useContext(AppContext);

  return (
    <div className={className}>
      <div className="cardimgs">
        {tickers.map((ticker) => (
          <Bubble
            key={ticker.name}
            name={ticker.name}
            value={Math.floor(
              (ticker.votesPositive * 100) /
                (ticker.votesPositive + ticker.votesNegative)
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default Card;
