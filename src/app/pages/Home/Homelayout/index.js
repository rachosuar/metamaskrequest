import { useContext } from "react";
import Card from "../../../components/Card";
import AppContext from "../../../context/AppContext";

const Homelayout = () => {
  let { account, balance } = useContext(AppContext);

  return (
    <div className="homelayout">
      <Card account={account} balance={balance} />
    </div>
  );
};

export default Homelayout;
