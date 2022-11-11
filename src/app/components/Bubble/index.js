import { useContext } from "react";
import AppContext from "../../context/AppContext";
import "./style.css";

const Bubble = ({ name, value }) => {
  let { addPositive, addNegative } = useContext(AppContext);
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
        <span className="bubblepercent"> {`${value}%`} </span>
        <div
          className="wave"
          style={{ top: `-${100 + value}%`, background: `${bubbleColor}` }}
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
    </div>
  );
};

export default Bubble;
