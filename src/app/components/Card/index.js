import "./styles.css";
import Bubble from "../Bubble";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
const Card = ({ className = "card" }) => {
  let { tickers, getMarketSentiment } = useContext(AppContext);

  return (
    <div className={className}>
      <div className="cardimgs">
        {tickers
          ? tickers.map((ticker) => (
              <Bubble
                key={ticker}
                name={ticker}
                getMarketSentiment={getMarketSentiment}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default Card;
