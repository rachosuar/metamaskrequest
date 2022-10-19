import "./global-styles.css";
import Navbar from "../app/components/Navbar";
import Homelayout from "./pages/Home/Homelayout";
import AppContextProvider from "./context/AppContext/AppContextProvider";

function App() {
  return (
    <AppContextProvider>
      <div>
        <Navbar />
        <Homelayout />
      </div>
    </AppContextProvider>
  );
}

export default App;
