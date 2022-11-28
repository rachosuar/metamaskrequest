import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import "./style.css";
import { ethers } from "ethers";
import Swal from "sweetalert2";

const Bubble = ({ name }) => {
  let { addPositive, addNegative, marketSentimentInstance, error } =
    useContext(AppContext);
  let [value, setValue] = useState();
  let [totalVotes, setTotalVotes] = useState();
  let votesPositive;
  let votesNegative;

  useEffect(() => {
    if (marketSentimentInstance) {
      try {
        async function updateSentiment() {
          votesNegative = await marketSentimentInstance.getNegativeVotes(name);
          votesPositive = await marketSentimentInstance.getPositiveVotes(name);
          function getSentiment(upvotesBn, downvotesBn) {
            const sentimentBn = upvotesBn
              .mul(100)
              .div(upvotesBn.add(downvotesBn));
            const totalVotes = upvotesBn.add(downvotesBn);
            return {
              sentiments: Number(ethers.utils.formatUnits(sentimentBn, 0)),
              total: Number(ethers.utils.formatUnits(totalVotes, 0)),
            };
          }
          let { sentiments, total } = getSentiment(
            votesPositive,
            votesNegative
          );
          setValue(sentiments);
          setTotalVotes(total);
        }
        updateSentiment();
      } catch (err) {
        console.log(err.reason);
      }
    }
  }, [marketSentimentInstance, totalVotes]);
  let bubbleColor;
  if (value < 50) {
    bubbleColor = "red";
  } else if (value > 50) {
    bubbleColor = "green";
  } else {
    bubbleColor = "grey";
  }

  return (
    <div className="bubblecontainer">
      <div className="bubble">
        <span
          className="bubblepercent"
          style={
            !value
              ? {
                  fontSize: "large",
                  color: "blue",
                  transform: "translateY(40%) translateX(-10%)",
                  textAlign: "center",
                }
              : null
          }
        >
          {" "}
          {value ? `${value}%` : "No sentiments, Vote First"}{" "}
        </span>

        <div
          className="wave"
          style={
            value
              ? { top: `-${100 + value}%`, background: `${bubbleColor}` }
              : {
                  top: `-${100 + 50}%`,
                  background: "cyan",
                }
          }
        ></div>
      </div>

      <span className="ticker">{name}</span>
      <div className="votingbuttons">
        <span
          className="votingemoji"
          onClick={() => {
            addPositive(name);
          }}
        >
          {" "}
          👍{" "}
        </span>
        <span
          className="votingemoji"
          onClick={() => {
            addNegative(name);
          }}
        >
          {" "}
          👎{" "}
        </span>
      </div>
      <span className="totalVotes">
        {value ? `Total Votes : ${totalVotes}` : null}
      </span>
      <span className="error">
        {error?.ticker === name ? `${error.message}` : null}
      </span>
    </div>
  );
};

export default Bubble;
